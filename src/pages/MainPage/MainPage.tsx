import React, { useEffect, useState } from 'react';
import { useEvent } from 'shared/hooks/useEvent/useEvent';
import { Button, InputField } from 'shared/ui';
import { Typography } from 'shared/ui/Typography/Typography';
import { socket } from 'shared/socket';
import { actions } from 'shared/socket/actions';
import { v4 } from 'uuid';
import { useUnit } from 'effector-react';
import { roomModel } from 'shared/model/app-model/room-model';

const MainPage = () => {
    const { onCreateNewRoom, onJoinRoom } = useUnit(roomModel);
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        socket.on(actions.SHARE_ROOMS, ({ rooms }) => {
            console.log('Share Rooms');
            setRooms(rooms);
        });
    }, []);

    return (
        <div>
            Main
            <div></div>
            <ul>
                {rooms.map((roomID) => (
                    <li key={roomID}>
                        <p>{roomID}</p>
                        <Button onClick={() => onJoinRoom(roomID)}>JOIN</Button>
                    </li>
                ))}
            </ul>
            <div>
                <Button onClick={() => onCreateNewRoom(v4())}>
                    Create new Room
                </Button>
            </div>
        </div>
    );
};

export default MainPage;
