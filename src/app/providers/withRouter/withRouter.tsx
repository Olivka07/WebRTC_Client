import { RouterProvider } from 'atomic-router-react';
import { ReactNode } from 'react';
import { router } from 'shared/router';

export const withRouter = (component: () => ReactNode) => () => (
    <RouterProvider router={router}>{component()}</RouterProvider>
);
