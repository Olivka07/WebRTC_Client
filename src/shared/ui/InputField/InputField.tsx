import React, { FC, InputHTMLAttributes } from 'react';
import { cn } from 'shared/helpers/cn';
import css from './InputField.module.scss';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}
export const InputField: FC<InputFieldProps> = (props) => {
    const { label, className, ...otherProps } = props;
    return (
        <label>
            {label}:
            <input
                {...otherProps}
                className={cn(css.input__field, className)}
            />
        </label>
    );
};
