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
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
const variants = {
    enter: ({ dir, skipAnimation }) => {
        return skipAnimation ? {
            x: dir === 'left' ? '100%' : dir === 'right' ? '-100%' : 0,
            y: dir === 'up' ? '100%' : dir === 'down' ? '-100%' : 0,
            zIndex: 0,
            scale: 0.5,
        } : {
            x: dir === 'left' ? '100%' : dir === 'right' ? '-100%' : 0,
            y: dir === 'up' ? '100%' : dir === 'down' ? '-100%' : 0,
            zIndex: 0
        };
    },
    center: ({ skipAnimation }) => {
        return skipAnimation ? {
            x: 0,
            y: 0,
            scale: 1,
            zIndex: 1,
            transition: {
                scale: { duration: 0.1, delay: 0.7 },
                x: { duration: 0.3, delay: 0.4, ease: [0, 0.9, 0.1, 0.9] },
                y: { duration: 0.3, delay: 0.4, ease: [0, 0.9, 0.1, 0.9] },
            }
        } : {
            x: 0,
            y: 0,
            scale: 1,
            zIndex: 1
        };
    },
    exit: ({ dir, skipAnimation }) => {
        return skipAnimation ? {
            x: dir === 'left' ? '-100%' : dir === 'right' ? '100%' : 0,
            y: dir === 'up' ? '-100%' : dir === 'down' ? '100%' : 0,
            zIndex: 0,
            scale: 0.5,
            transition: {
                scale: { duration: 0.1 },
                x: { delay: 0.1, duration: 0.3, ease: [0.9, 0.1, 0.9, 0] }
            }
        } : {
            x: dir === 'left' ? '-100%' : dir === 'right' ? '100%' : 0,
            y: dir === 'up' ? '-100%' : dir === 'down' ? '100%' : 0,
            zIndex: 0,
        };
    }
};
/** Controlled, unstyled carousel in both axes
 * - `move`: callback called when the carousel is dragged to one direction
 * - `item`: currently displayed item
 * - `page`: `key` of the item
 * - `direction`: animation direction when switching pages
 * - `skipAnimation`: whether to perform a 'skipping' animation when switching pages
 */
export function DirectionalCarousel(_a) {
    var _b, _c;
    var { move, direction, page, item, skipAnimation } = _a, props = __rest(_a, ["move", "direction", "page", "item", "skipAnimation"]);
    const swipeThresholdX = (_b = props.swipeThresholdX) !== null && _b !== void 0 ? _b : 1e4;
    const swipeThresholdY = (_c = props.swipeThresholdY) !== null && _c !== void 0 ? _c : 1e4;
    return ((React.createElement("div", { style: { height: '100%', width: '100%', overflow: 'hidden', position: 'relative' } },
        React.createElement(AnimatePresence, { initial: false, custom: { dir: direction, skipAnimation } },
            React.createElement(motion.div, { key: page, custom: { dir: direction, skipAnimation }, variants: variants, initial: "enter", animate: "center", exit: 'exit', dragDirectionLock: true, style: { height: '100%', width: '100%', position: 'absolute' }, drag: true, dragElastic: 1, dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 }, transition: {
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    y: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                }, onDragEnd: (_, { offset, velocity }) => {
                    const swipeX = Math.abs(offset.x) * velocity.x;
                    const swipeY = Math.abs(offset.y) * velocity.y;
                    if (swipeY < -(swipeThresholdY))
                        move === null || move === void 0 ? void 0 : move('up');
                    else if (swipeY > (swipeThresholdY))
                        move === null || move === void 0 ? void 0 : move('down');
                    else if (swipeX < -(swipeThresholdX))
                        move === null || move === void 0 ? void 0 : move('left');
                    else if (swipeX > (swipeThresholdX))
                        move === null || move === void 0 ? void 0 : move('right');
                } }, item)))));
}
export default DirectionalCarousel;
