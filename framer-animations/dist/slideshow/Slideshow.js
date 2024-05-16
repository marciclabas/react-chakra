import React from "react";
import { AnimatePresence, motion } from "framer-motion";
export const directions = ['up', 'down', 'left', 'right'];
const variant = (direction, back) => direction === 'down' ? { y: back ? '-100%' : '100%', x: 0 } :
    direction === 'up' ? { y: back ? '100%' : '-100%', x: 0 } :
        direction === 'right' ? { x: back ? '-100%' : '100%', y: 0 } :
            { x: back ? '100%' : '-100%', y: 0 };
const variants = {
    exit: (dir) => (Object.assign(Object.assign({}, variant(dir, true)), { opacity: 0 })),
    center: {
        x: 0, y: 0, opacity: 1
    },
    enter: (dir) => (Object.assign(Object.assign({}, variant(dir)), { opacity: 0 }))
};
export function Slideshow({ children, pageKey, direction, transition, style }) {
    const dir = direction !== null && direction !== void 0 ? direction : 'right';
    return (React.createElement(AnimatePresence, { initial: false, custom: dir },
        React.createElement(motion.div, { key: pageKey, custom: dir, variants: variants, initial: 'enter', animate: 'center', exit: 'exit', transition: transition !== null && transition !== void 0 ? transition : { duration: 0.2 }, style: Object.assign({ width: '100%', height: '100%', position: 'absolute' }, style) }, children)));
}
export default Slideshow;
