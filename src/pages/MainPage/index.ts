import { lazy } from 'react';
import { Loadable } from 'shared/ui';

export const MainPage = Loadable(lazy(() => import('./MainPage')));
