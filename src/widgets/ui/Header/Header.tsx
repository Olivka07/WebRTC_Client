import React, { FC, PropsWithChildren } from 'react';
import css from './Header.module.scss';

export const Header: FC<PropsWithChildren> = ({ children }) => {
    return <header className={css.header}>{children}</header>;
};
