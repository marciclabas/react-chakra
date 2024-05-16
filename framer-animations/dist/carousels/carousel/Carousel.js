import React from "react";
import { motion, AnimatePresence } from "framer-motion";
const variants = {
    enter: ({ dir, skipAnimation }) => {
        return skipAnimation ? {
            x: dir === 'left' ? '100%' : '-100%',
            zIndex: 0,
            scale: 0.5,
        } : {
            x: dir === 'left' ? '100%' : '-100%',
            zIndex: 0
        };
    },
    center: ({ skipAnimation }) => {
        return skipAnimation ? {
            x: 0,
            scale: 1,
            zIndex: 1,
            transition: {
                scale: { duration: 0.1, delay: 0.7 },
                x: { duration: 0.3, delay: 0.4, ease: [0, 0.9, 0.1, 0.9] }
            }
        } : {
            x: 0,
            scale: 1,
            zIndex: 1
        };
    },
    exit: ({ dir, skipAnimation }) => {
        return skipAnimation ? {
            x: dir === 'left' ? '-100%' : '100%',
            zIndex: 0,
            scale: 0.5,
            transition: {
                scale: { duration: 0.1 },
                x: { delay: 0.1, duration: 0.3, ease: [0.9, 0.1, 0.9, 0] }
            }
        } : {
            x: dir === 'left' ? '-100%' : '100%',
            zIndex: 0,
        };
    }
};
/** Controlled, unstyled Carousel
 * - `move`: callback called when the carousel is dragged to one side
 * - `item`: currently displayed item
 * - `page`: `key` of the item
 * - `direction`: animation direction when switching pages
 * - `skipAnimation`: whether to perform a 'skipping' animation when switching pages
 */
export function Carousel({ move, direction, page, item, skipAnimation, swipeThreshold }) {
    return ((React.createElement("div", { style: { height: '100%', width: '100%', overflow: 'hidden', position: 'relative' } },
        React.createElement(AnimatePresence, { initial: false, custom: { dir: direction, skipAnimation } },
            React.createElement(motion.div, { key: page, custom: { dir: direction, skipAnimation }, variants: variants, initial: "enter", animate: "center", exit: 'exit', dragDirectionLock: true, style: { height: '100%', width: '100%', position: 'absolute' }, drag: "x", dragElastic: 1, dragConstraints: { left: 0, right: 0 }, transition: {
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                }, onDragEnd: (_, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (swipe < -(swipeThreshold !== null && swipeThreshold !== void 0 ? swipeThreshold : 1e4)) {
                        move === null || move === void 0 ? void 0 : move('left');
                    }
                    else if (swipe > (swipeThreshold !== null && swipeThreshold !== void 0 ? swipeThreshold : 1e4))
                        move === null || move === void 0 ? void 0 : move('right');
                } }, item)))));
}
export default Carousel;
