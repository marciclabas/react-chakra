import React, { Key } from "react";
export type SwipeDirection = 'left' | 'right' | 'up' | 'down';
export type Props = {
    move?(dir: SwipeDirection): void;
    page: Key;
    item: JSX.Element;
    direction?: SwipeDirection;
    skipAnimation?: boolean;
    swipeThresholdX?: number;
    swipeThresholdY?: number;
};
/** Controlled, unstyled carousel in both axes
 * - `move`: callback called when the carousel is dragged to one direction
 * - `item`: currently displayed item
 * - `page`: `key` of the item
 * - `direction`: animation direction when switching pages
 * - `skipAnimation`: whether to perform a 'skipping' animation when switching pages
 */
export declare function DirectionalCarousel({ move, direction, page, item, skipAnimation, ...props }: Props): React.JSX.Element;
export default DirectionalCarousel;
