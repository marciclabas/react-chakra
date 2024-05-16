import React from 'react';
export type SlidingItemProps = {
    idx: number;
    currIdx: number;
};
export type SlidingCarouselConfig = {
    numBefore?: number;
    numAfter?: number;
};
export type SlidingCarouselProps = SlidingCarouselConfig & {
    min?: number;
    maxExclusive?: number;
    currIdx: number;
    Item(p: SlidingItemProps): JSX.Element;
};
/** Displays items in a sliding window around `currIdx`. Orientation? Wrap it in a flexbox! */
export declare function SlidingCarousel({ currIdx, Item, ...props }: SlidingCarouselProps): React.JSX.Element | null;
