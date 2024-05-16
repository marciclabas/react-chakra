import React, { Key } from 'react';
import { MotionProps } from "framer-motion";
export type Props = MotionProps & {
    show: boolean;
    opacity?: number;
    modalKey?: Key;
};
/** Prop-controlled presence-based modal
 * - Gets unmounted when `show` is false
 * - To know when it finishes mounting, we recommend using `useNotifiedState`:
 *
 *    ```jsx
 *    import { Modal, useNotifiedState } from 'framer-animations'
 *
 *    const [show, setShow] = useNotifiedState(false)
 *
 *    async function runComplexAnimationInsideModal() {
 *      await setShow(true);
 *      // now `<Modal>` is mounted
 *      ...
 *    }
 *    ...
 *    <Modal show={show}>...
 *    ```
 */
export declare function Modal({ show, modalKey, children, opacity, style, ...motionProps }: Props): React.JSX.Element;
