/// <reference types="react" resolution-mode="require"/>
export type Hook = {
    loader: JSX.Element;
    animate: {
        (c: 'load'): void;
        (c: 'stop' | 'succeed' | 'fail'): Promise<void>;
    };
};
export type Config = {
    color?: string;
    successIcon?: JSX.Element;
    failIcon?: JSX.Element;
    strokeWidth?: string | number;
    /** Value in [0, 1]. 'Active' proportion of the circumference at the start */
    startArcProportion?: number;
    /** Value in [0, 1]. 'Active' proportion of the circumference during loading */
    loadingArcProportion?: number;
    /** Time [seconds] of a full lap of the spinner. Default: `1` */
    period?: number;
    /** Time [seconds] of arc proportion animation. Default: `period/2` */
    arcDuration?: number;
};
export declare function useLoader(config?: Config): Hook;
