import React, { ReactNode } from 'react';
import { AnimationProps, Transition, MotionProps, Target } from 'framer-motion';
type TargetWithKeyframes<T = Target> = {
    [K in keyof T]: T[K] | T[K][] | [null, ...T[K][]];
};
export type Props = {
    animate: AnimationProps['animate'];
    variants?: AnimationProps['variants'];
    children?: ReactNode;
    divProps?: Omit<MotionProps, 'animate'>;
};
export declare function Highlighted({ children, ...props }: Props): React.JSX.Element;
export type Hook = {
    highlightedProps: Props;
    animate(action: 'start' | 'stop'): void;
};
type ExplicitConfig = {
    _mode: 'explicit';
    start?: TargetWithKeyframes;
    end?: TargetWithKeyframes;
};
type SimpleConfig = {
    _mode?: 'simple';
    /** Defaults to 100 (%) */
    brightness0?: number;
    /** Defaults to 120 (%) */
    brightness1?: number;
    /** Defaults to `'0 0 8px rgba(255,255,255,0.5)'` */
    dropShadow0?: string;
    /** Defaults to `'0 0 25px rgba(255,255,255,1)'` */
    dropShadow1?: string;
    /** Defaults to 1 */
    scale0?: number;
    /** Defaults to 1 */
    scale1?: number;
};
export type Config = {
    transition?: Transition;
} & (ExplicitConfig | SimpleConfig);
export declare function useHighlight(config?: Config): Hook;
export {};
