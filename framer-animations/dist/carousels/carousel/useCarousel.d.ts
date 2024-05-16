/// <reference types="react" resolution-mode="require"/>
import { SwipeDirection } from "../types.js";
export type Items = {
    mode: 'eager';
    items: JSX.Element[];
} | {
    mode?: 'lazy';
    numItems: number;
    item(idx: number): JSX.Element;
};
export type Hook = {
    carousel: JSX.Element;
    selected: number;
    move(swipeDir: SwipeDirection): void;
    goto(page: number): void;
};
export type Config = {
    swipeThreshold?: number;
    /** Whether to allow navigation between the first and last items (defaults to `true`) */
    wrap?: boolean;
};
/**
 * Self-managed draggable carousel. Returns the actual component `carousel`, plus the `selected` item and callbacks to programatically move
 */
export declare function useCarousel(items: Items, config?: Config): Hook;
export default useCarousel;
