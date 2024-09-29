import React, { FC, PropsWithChildren } from 'react';
import { Header } from 'widgets/ui';

export const ClientLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <main>{children}</main>
        </>
    );
};
