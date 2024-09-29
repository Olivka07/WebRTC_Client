import React, { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import { cn } from 'shared/helpers/cn';
import css from './Button.module.scss';

type ButtonType = 'warn' | 'primary' | 'normal';

const UnmappedButtonCss: Record<ButtonType, string> = {
    primary: css.button_primary,
    warn: css.button_warn,
    normal: css.button_normal
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: ButtonType;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
    const { theme = 'normal', className, children, ...otherProps } = props;
    return (
        <button
            className={cn(css.button, UnmappedButtonCss[theme], className)}
            {...otherProps}
        >
            {children}
        </button>
    );
};
