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
import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
const variants = (axis) => ({
    enter: ({ dir, skipAnimation }) => {
        return skipAnimation ? {
            [axis]: dir === 'left' ? '100%' : '-100%',
            zIndex: 0,
            scale: 0.5,
        } : {
            [axis]: dir === 'left' ? '100%' : '-100%',
            zIndex: 0
        };
    },
    center: ({ skipAnimation }) => {
        return skipAnimation ? {
            [axis]: 0,
            scale: 1,
            zIndex: 1,
            transition: {
                scale: { duration: 0.1, delay: 0.7 },
                [axis]: { duration: 0.3, delay: 0.4, ease: [0, 0.9, 0.1, 0.9] }
            }
        } : {
            [axis]: 0,
            scale: 1,
            zIndex: 1
        };
    },
    exit: ({ dir, skipAnimation }) => {
        return skipAnimation ? {
            [axis]: dir === 'left' ? '-100%' : '100%',
            zIndex: 0,
            scale: 0.5,
            transition: {
                scale: { duration: 0.1 },
                [axis]: { delay: 0.1, duration: 0.3, ease: [0.9, 0.1, 0.9, 0] }
            }
        } : {
            [axis]: dir === 'left' ? '-100%' : '100%',
            zIndex: 0,
        };
    }
});
/** Controlled, unstyled Carousel
 * - `move`: callback called when the carousel is dragged to one side
 * - `item`: currently displayed item
 * - `page`: `key` of the item
 * - `direction`: animation direction when switching pages
 * - `skipAnimation`: whether to perform a 'skipping' animation when switching pages
 */
export function Carousel(_a) {
    var _b;
    var { move, direction, page, item, skipAnimation, swipeThreshold } = _a, props = __rest(_a, ["move", "direction", "page", "item", "skipAnimation", "swipeThreshold"]);
    const axis = (_b = props.axis) !== null && _b !== void 0 ? _b : 'x';
    const vars = useMemo(() => variants(axis), [axis]);
    return ((React.createElement("div", { style: { height: '100%', width: '100%', overflow: 'hidden', position: 'relative' } },
        React.createElement(AnimatePresence, { initial: false, custom: { dir: direction, skipAnimation } },
            React.createElement(motion.div, { key: page, custom: { dir: direction, skipAnimation }, variants: vars, initial: "enter", animate: "center", exit: 'exit', dragDirectionLock: true, style: { height: '100%', width: '100%', position: 'absolute' }, drag: axis, dragElastic: 1, dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 }, transition: {
                    [axis]: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                }, onDragEnd: (_, { offset, velocity }) => {
                    const swipe = Math.abs(offset[axis]) * velocity[axis];
                    if (swipe < -(swipeThreshold !== null && swipeThreshold !== void 0 ? swipeThreshold : 1e4)) {
                        move === null || move === void 0 ? void 0 : move('left');
                    }
                    else if (swipe > (swipeThreshold !== null && swipeThreshold !== void 0 ? swipeThreshold : 1e4))
                        move === null || move === void 0 ? void 0 : move('right');
                } }, item)))));
}
export default Carousel;
