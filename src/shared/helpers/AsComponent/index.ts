// import React, { JSX, PropsWithChildren, ReactNode, ReactElement } from 'react'

// type GetProps<As extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[As];

// type CreatingComponentTypeProps<
//     AS extends keyof JSX.IntrinsicElements,
//     AsProps extends PropsWithChildren<GetProps<AS>>,
//     Props extends Omit<AsProps, 'className' | 'children'>
// > = (as: AS, className: string, children: ReactNode, props:Props) => (props: Props) => JSX.Element;

// function createComponent<
//     AS extends keyof JSX.IntrinsicElements,
//     AsProps extends PropsWithChildren<GetProps<AS>>,
//     Props extends Omit<AsProps, 'className' | 'children'>
// >(as: React.ElementType extends AS, className: string, children: ReactNode, props: Props) {
//     return (
//         <as></as>
//     )
// }
