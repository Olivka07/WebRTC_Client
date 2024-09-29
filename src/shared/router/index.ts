import {
    UnmappedRouteObject,
    createHistoryRouter,
    createRoute
} from 'atomic-router';
import { createBrowserHistory } from 'history';

export const routes = {
    main: createRoute(),
    room: createRoute<{ id: string }>()
};

const mappedRoutes: UnmappedRouteObject<any>[] = [
    {
        path: '/',
        route: routes.main
    },
    {
        path: '/room/:id',
        route: routes.room
    }
];

export const router = createHistoryRouter({
    routes: mappedRoutes
});

const history = createBrowserHistory();

router.setHistory(history);
