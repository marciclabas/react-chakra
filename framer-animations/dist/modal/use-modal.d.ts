/// <reference types="react" resolution-mode="require"/>
import { type MotionProps } from "framer-motion";
type Hook = {
    modal: JSX.Element;
    animate(show: boolean): Promise<void>;
    mounted: boolean;
};
type Props = MotionProps & {
    opacity?: number;
};
/** Presence-based, controlled modal (simple wrapper around `<Modal>`) , but `animate` already awaits until the state changes */
export declare function useModal(props: Props): Hook;
export {};
