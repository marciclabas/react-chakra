import React, { Key } from 'react';
import { SwipeDirection } from '../types.js';
export type Item = {
    key: Key;
    elem: JSX.Element;
};
export type PreviewConfig = {
    scale?: number;
    widthProportion?: number;
    rotateY?: string;
    transformPerspective?: number;
    zIndex?: number;
};
export declare const defaultPreview: Required<PreviewConfig>;
export type CurrentConfig = {
    zIndex?: number;
    scale?: number;
};
export declare const defaultCurr: Required<CurrentConfig>;
export type Config = {
    preview?: PreviewConfig;
    current?: CurrentConfig;
    swipeThreshold?: number;
};
export type Props = {
    prev: Item;
    curr: Item;
    next: Item;
    move(direction: SwipeDirection): void;
    config?: Config;
};
export declare function PreviewedCarousel({ prev, curr, next, move, config }: Props): React.JSX.Element;
export default PreviewedCarousel;
