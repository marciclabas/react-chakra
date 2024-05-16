import { Key } from "react";
export type State<View> = {
    view: View;
    back?: boolean;
};
export type Hook<View> = {
    slideshowProps: {
        pageKey: Key;
        direction: 'left' | 'right';
    };
    goto(to: State<View>): void;
    go(to: State<View>): () => void;
    view: View;
};
export type Config = {
    /** Min. time delta (in milliseconds) before any state update. Defaults to 200; set to 0 to disable */
    throttleMs?: number;
};
export declare function useSlideshow<View extends Key>(defaultView: View, config?: Config): Hook<View>;
