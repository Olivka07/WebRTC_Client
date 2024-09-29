import React from 'react';
import { routes } from 'shared/router';
import { NavLink } from 'shared/ui';
import css from './Navbar.module.scss';

export const Navbar = () => {
    return (
        <nav className={css.navbar__container}>
            <NavLink path={routes.main}>Каталог</NavLink>
            <NavLink path={routes.room}>Комната</NavLink>
        </nav>
    );
};
