import React from 'react';
import { MotionProps } from 'framer-motion';
import { Props as IconProps } from '../util/icons/PointerIcon.js';
type IconConfig = {
    handIcon?: JSX.Element;
};
export type Config = (IconConfig | IconProps) & {
    modalProps?: Omit<MotionProps, 'animate'>;
    iconProps?: Omit<MotionProps, 'animate'>;
};
export type Action = 'show' | 'press' | 'lift' | 'hide';
export type Hook = {
    animation: JSX.Element;
    animate(...actions: Action[]): void;
};
export declare function useTouchAnimation(config?: Config): {
    animation: React.JSX.Element;
    animate: (...actions: Action[]) => Promise<void>;
};
export {};
