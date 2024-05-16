var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
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
export function Modal(_a) {
    var { show, modalKey, children, opacity, style } = _a, motionProps = __rest(_a, ["show", "modalKey", "children", "opacity", "style"]);
    return (React.createElement(AnimatePresence, { initial: false }, show && (React.createElement(motion.div, Object.assign({ key: modalKey, initial: { opacity: 0 }, animate: { opacity: opacity !== null && opacity !== void 0 ? opacity : 0.7 }, exit: { opacity: 0 }, transition: { duration: 1 }, style: Object.assign({ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center' }, style), children: children }, motionProps)))));
}
