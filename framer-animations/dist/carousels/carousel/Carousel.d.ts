import React, { Key } from "react";
import { SwipeDirection } from "../types.js";
export type Props = {
    move?(dir: SwipeDirection): void;
    page: Key;
    item: JSX.Element;
    direction?: SwipeDirection;
    axis?: 'x' | 'y';
    skipAnimation?: boolean;
    swipeThreshold?: number;
};
/** Controlled, unstyled Carousel
 * - `move`: callback called when the carousel is dragged to one side
 * - `item`: currently displayed item
 * - `page`: `key` of the item
 * - `direction`: animation direction when switching pages
 * - `skipAnimation`: whether to perform a 'skipping' animation when switching pages
 */
export declare function Carousel({ move, direction, page, item, skipAnimation, swipeThreshold, ...props }: Props): React.JSX.Element;
export default Carousel;
