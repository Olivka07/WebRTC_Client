import { ElementType, createElement, JSX, PropsWithChildren } from 'react';
import { cn } from 'shared/helpers';
import { AsComponent, AsComponentProps } from 'shared/utils/as-component/types';

import css from './Typography.module.scss';

interface TypographyProps {
    familyFont: 'Consolas';
    weightFont: 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    colorFont: 'black' | 'red';
    fontAlign: 'left' | 'center' | 'right';
}

function createTypography<AS extends keyof JSX.IntrinsicElements>(
    as: AS,
    defaultClassName?: string
) {
    const Component = <T extends AsComponent = typeof as>(
        props: AsComponentProps<T, PropsWithChildren<Partial<TypographyProps>>>
    ) => {
        const {
            colorFont = 'black',
            familyFont,
            weightFont,
            fontAlign = 'left',
            children,
            className,
            ...restProps
        } = props;

        const classes = cn(
            defaultClassName,
            className,
            css[colorFont],
            css[familyFont],
            css[fontAlign],
            css[`weight-${weightFont}`]
        );

        const newProps = {
            ...restProps,
            className: classes
        };

        return createElement(as, newProps, children);
    };

    Component.displayName = `Typography.${as}`;

    return Component;
}

export const Typography = {
    h1: createTypography('h1', css.h1__header),
    h2: createTypography('h1', css.h2__header),

    text: createTypography('p', css.text)
};
