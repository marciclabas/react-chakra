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
import React, { useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import SwipeIcon from '../util/icons/SwipeIcon.js';
const isExplicit = (config) => (config === null || config === void 0 ? void 0 : config.swipeIcon) !== undefined;
export function useSwipeAnimation(config) {
    var _a, _b;
    const durationSecs = (_a = config === null || config === void 0 ? void 0 : config.durationSecs) !== null && _a !== void 0 ? _a : 1;
    const controls = useAnimation();
    const a = 10;
    const run = useCallback(() => {
        controls.stop();
        return controls.start({
            rotate: [null, a, -a, 0],
            x: [null, '50%', '-50%', '0%'],
            opacity: [0, 1, 1, 1, 0]
        }, {
            duration: durationSecs
        });
    }, [controls, durationSecs]);
    const swipeIcon = isExplicit(config)
        ? config.swipeIcon
        : React.createElement(SwipeIcon, { svg: Object.assign({ width: '4rem', height: '4rem' }, config === null || config === void 0 ? void 0 : config.svg), path: Object.assign({ fill: 'white' }, config === null || config === void 0 ? void 0 : config.path) });
    const _c = (_b = config === null || config === void 0 ? void 0 : config.divProps) !== null && _b !== void 0 ? _b : {}, { style } = _c, divProps = __rest(_c, ["style"]);
    const animation = (React.createElement(motion.div, Object.assign({ animate: controls, initial: { opacity: 0 }, style: Object.assign({ width: 'max-content' }, style) }, divProps), swipeIcon));
    return { animation, run };
}
export default useSwipeAnimation;
