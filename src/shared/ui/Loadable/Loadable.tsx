import React, { JSXElementConstructor, Suspense } from 'react';

export function Loadable<T>(Component: JSXElementConstructor<T>) {
    return (props: T) => {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Component {...props} />
            </Suspense>
        );
    };
}
