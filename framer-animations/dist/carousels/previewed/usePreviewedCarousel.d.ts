/// <reference types="react" resolution-mode="require"/>
import { Config as CarouselConfig } from "./PreviewedCarousel.js";
import { SwipeDirection } from "../types.js";
export type ItemProps = {
    idx: number;
    selected?: boolean;
};
export type Hook = {
    carousel: JSX.Element;
    selected: number;
    move(swipeDir: SwipeDirection): void;
};
export type Config = CarouselConfig & {
    startIdx?: number;
};
export declare function usePreviewedCarousel(item: (props: ItemProps) => JSX.Element, numItems: number, config?: Config): Hook;
