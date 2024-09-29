import { RouteInstance, RouteParams } from 'atomic-router';
import { Link } from 'atomic-router-react';
import React, { FC, PropsWithChildren } from 'react';

import css from './NavLink.module.scss';

interface NavLinkProps {
    path: string | RouteInstance<RouteParams>;
}
export const NavLink: FC<PropsWithChildren<NavLinkProps>> = ({
    path,
    children
}) => {
    return (
        <Link className={css.NavLink} to={path}>
            {children}
        </Link>
    );
};
