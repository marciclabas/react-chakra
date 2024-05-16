/// <reference types="react" resolution-mode="require"/>
import { MotionProps } from 'framer-motion';
import { Props as IconProps } from '../util/icons/SwipeIcon.js';
type IconConfig = {
    swipeIcon?: JSX.Element;
};
export type Config = (IconConfig | IconProps) & {
    durationSecs?: number;
    divProps?: Omit<MotionProps, 'animate' | 'initial'>;
};
export declare function useSwipeAnimation(config?: Config): {
    run(): Promise<void>;
    animation: JSX.Element;
};
export default useSwipeAnimation;
