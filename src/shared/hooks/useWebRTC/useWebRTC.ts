import { useCallback, useEffect, useRef } from 'react';
import { useStateWithCallback } from '../useStateWithCallback/useStateWithCallback';
import { socket } from 'shared/socket';
import { actions } from 'shared/socket/actions';

// предоставляет набор адресов бесплатных STUN серверов
import freeice from 'freeice';

export const LOCAL_VIDEO = 'LOCAL_VIDEO';

export function useWebRTC(roomID: string) {
    const [clients, updateClients] = useStateWithCallback<string[]>([]);
    const peerConnections = useRef<Record<string, RTCPeerConnection>>({});
    const localMediaStream = useRef<MediaStream>(null);
    const peerMediaElements = useRef<Record<string, HTMLVideoElement>>({
        [LOCAL_VIDEO]: null
    });

    const addNewClient = useCallback(
        (newClient: string, cb: () => unknown) => {
            if (!clients.includes(newClient)) {
                updateClients((prev: string[]) => [...prev, newClient], cb);
            }
        },
        [clients, updateClients]
    );

    useEffect(() => {
        async function handleNewPeer({
            peerID,
            createOffer
        }: {
            peerID: string;
            createOffer: boolean;
        }) {
            if (peerID in peerConnections.current) {
                return console.warn(`Already connected to peer ${peerID}`);
            }
            peerConnections.current[peerID] = new RTCPeerConnection({
                iceServers: freeice()
            });

            // триггерится после установки setLocalDescription
            peerConnections.current[peerID].onicecandidate = (event) => {
                if (event.candidate) {
                    console.log(event.candidate, 'ice candidate');
                    socket.emit(actions.RELAY_ICE, {
                        peerID,
                        iceCandidate: event.candidate
                    });
                }
            };

            // TODO check audio & video
            // слушаем событие добавления нового трека (видео или аудио)
            peerConnections.current[peerID].ontrack = ({
                streams: [remoteStream]
            }) => {
                addNewClient(peerID, () => {
                    peerMediaElements.current[peerID].srcObject = remoteStream;
                });
            };

            // триггерим для каждого из доступных локальных медиа данных (треков)
            // событие добавления трека в экземпляр RTCPeerConnection
            localMediaStream.current.getTracks().forEach((track) => {
                peerConnections.current[peerID].addTrack(
                    track,
                    localMediaStream.current
                );
            });

            if (createOffer) {
                const offer =
                    await peerConnections.current[peerID].createOffer();
                await peerConnections.current[peerID].setLocalDescription(
                    offer
                );
                socket.emit(actions.RELAY_SDP, {
                    peerID,
                    sessionDescription: offer
                });
            }
        }

        socket.on(actions.ADD_PEER, handleNewPeer);
    }, []);

    useEffect(() => {
        async function setRemoteMedia({
            peerID,
            sessionDescription: remoteDescription
        }: {
            peerID: string;
            sessionDescription: RTCSessionDescriptionInit;
        }) {
            await peerConnections.current[peerID].setRemoteDescription(
                new RTCSessionDescription(remoteDescription)
            );

            if (remoteDescription.type === 'offer') {
                const answer =
                    await peerConnections.current[peerID].createAnswer();

                await peerConnections.current[peerID].setLocalDescription(
                    answer
                );

                socket.emit(actions.RELAY_SDP, {
                    peerID,
                    sessionDescription: answer
                });
            }
        }
        socket.on(actions.SESSION_DESCRIPTION, setRemoteMedia);
    }, []);

    useEffect(() => {
        socket.on(
            actions.ICE_CANDIDATE,
            ({
                peerID,
                iceCandidate
            }: {
                peerID: string;
                iceCandidate: RTCIceCandidate;
            }) => {
                peerConnections.current[peerID].addIceCandidate(
                    new RTCIceCandidate(iceCandidate)
                );
            }
        );
    }, []);

    useEffect(() => {
        socket.on(actions.REMOVE_PEER, ({ peerID }) => {
            if (peerConnections.current[peerID]) {
                peerConnections.current[peerID].close();
            }

            delete peerConnections.current[peerID];
            delete peerMediaElements.current[peerID];

            updateClients((list) => list.filter((client) => client !== peerID));
        });
    }, []);

    useEffect(() => {
        async function startCapture() {
            localMediaStream.current =
                await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true
                });
            addNewClient(LOCAL_VIDEO, () => {
                const localVideoElement =
                    peerMediaElements.current[LOCAL_VIDEO];

                if (localVideoElement) {
                    localVideoElement.volume = 0;
                    localVideoElement.srcObject = localMediaStream.current;
                }
            });
        }

        // вызов функции для получения разрешения на использование определенных медиа данных
        startCapture()
            .then(() => socket.emit(actions.JOIN, { room: roomID }))
            .catch(() => console.error('Error getting user media'));

        return () => {
            localMediaStream.current
                .getTracks()
                .forEach((track) => track.stop());
            socket.emit(actions.LEAVE);
        };
    }, [roomID]);

    const provideMediaRef = useCallback(
        (clientID: string, node: HTMLVideoElement) => {
            peerMediaElements.current[clientID] = node;
        },
        []
    );

    return { clients, provideMediaRef };
}
