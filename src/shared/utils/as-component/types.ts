import { ComponentPropsWithoutRef, ElementType, JSX } from 'react';

export type AsComponent = ElementType;

type AsProp<AS extends ElementType> = { as?: AS };

export type AsComponentProps<
    AS extends ElementType,
    Props extends Record<string, any> = {},
    PropWithAs = Props & AsProp<AS>
> = PropWithAs & Omit<ComponentPropsWithoutRef<AS>, keyof PropWithAs>;
