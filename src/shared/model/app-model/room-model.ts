import { redirect } from 'atomic-router';
import { createEvent } from 'effector';
import { routes } from 'shared/router';

const createdNewRoom = createEvent<string>();
const joinedRoom = createEvent<string>();

redirect({
    clock: createdNewRoom,
    params: (idRoom) => ({ id: idRoom }),
    route: routes.room
});

redirect({
    clock: joinedRoom,
    params: (idRoom) => ({ id: idRoom }),
    route: routes.room
});

export const roomModel = {
    onCreateNewRoom: createdNewRoom,
    onJoinRoom: joinedRoom
};
