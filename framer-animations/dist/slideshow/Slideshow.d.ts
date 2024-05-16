import React, { Key, ReactNode } from "react";
import { Transition, MotionStyle } from "framer-motion";
export declare const directions: readonly ["up", "down", "left", "right"];
export type Direction = typeof directions[number];
type Props = {
    children: ReactNode;
    pageKey: Key;
    direction?: Direction;
    /** `framer-motion` transition ([docs](https://www.framer.com/motion/transition/)). Default: `{ duration: 0.2 }` */
    transition?: Transition;
    style?: MotionStyle;
};
export declare function Slideshow({ children, pageKey, direction, transition, style }: Props): React.JSX.Element;
export default Slideshow;
