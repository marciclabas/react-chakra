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
import { AnimatePresence, motion } from 'framer-motion';
import { range } from '@haskellian/range';
/** Displays items in a sliding window around `currIdx`. Orientation? Wrap it in a flexbox! */
export function SlidingCarousel(_a) {
    var _b, _c, _d, _e;
    var { currIdx, Item } = _a, props = __rest(_a, ["currIdx", "Item"]);
    const numBefore = (_b = props.numBefore) !== null && _b !== void 0 ? _b : 3;
    const numAfter = (_c = props.numAfter) !== null && _c !== void 0 ? _c : 3;
    const min = (_d = props.min) !== null && _d !== void 0 ? _d : 0;
    const maxExclusive = (_e = props.maxExclusive) !== null && _e !== void 0 ? _e : Infinity;
    const from = Math.max(currIdx - numBefore, min);
    const to = Math.min(currIdx + numAfter + 1, maxExclusive);
    const n = to - from;
    const maxN = numBefore + 1 + numAfter;
    if (n < 0)
        return null;
    return (React.createElement(AnimatePresence, { mode: 'popLayout', initial: false }, range(from, to).map(idx => (React.createElement(motion.div, { key: idx, layout: true, exit: { opacity: 0 }, initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 1 } }, style: { width: `${100 / maxN}%` } },
        React.createElement(Item, { idx: idx, currIdx: currIdx }))))));
}
