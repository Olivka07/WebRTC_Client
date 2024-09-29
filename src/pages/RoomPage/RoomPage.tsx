import { useUnit } from 'effector-react';
import React from 'react';
import { LOCAL_VIDEO, useWebRTC } from 'shared/hooks/useWebRTC/useWebRTC';
import { routes } from 'shared/router';

export const RoomPage = () => {
    const { id: roomID } = useUnit(routes.room.$params);
    const { clients, provideMediaRef } = useWebRTC(roomID);

    console.log(clients);
    return (
        <div>
            {clients.map((clientID) => (
                <div key={clientID}>
                    <video
                        ref={(instance) => {
                            provideMediaRef(clientID, instance);
                        }}
                        autoPlay
                        playsInline
                        muted={clientID === LOCAL_VIDEO}
                    />
                </div>
            ))}
        </div>
    );
};
