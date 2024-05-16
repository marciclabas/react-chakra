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
import React, { useCallback, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';
export function Highlighted(_a) {
    var { children } = _a, props = __rest(_a, ["children"]);
    return React.createElement(motion.div, Object.assign({}, props), children);
}
function startTarget(config) {
    var _a, _b, _c, _d, _e, _f;
    if ((config === null || config === void 0 ? void 0 : config._mode) === 'explicit' && config.start)
        return config.start;
    const cfg = config;
    const b0 = (_a = cfg === null || cfg === void 0 ? void 0 : cfg.brightness0) !== null && _a !== void 0 ? _a : 100;
    const b1 = (_b = cfg === null || cfg === void 0 ? void 0 : cfg.brightness1) !== null && _b !== void 0 ? _b : 120;
    const d0 = (_c = cfg === null || cfg === void 0 ? void 0 : cfg.dropShadow0) !== null && _c !== void 0 ? _c : '0 0 8px rgba(255,255,255,0.5)';
    const d1 = (_d = cfg === null || cfg === void 0 ? void 0 : cfg.dropShadow1) !== null && _d !== void 0 ? _d : '0 0 25px rgba(255,255,255,1)';
    const filter0 = `brightness(${b0}%) drop-shadow(${d0})`;
    const filter1 = `brightness(${b1}%) drop-shadow(${d1})`;
    const scale0 = (_e = cfg === null || cfg === void 0 ? void 0 : cfg.scale0) !== null && _e !== void 0 ? _e : 1;
    const scale1 = (_f = cfg === null || cfg === void 0 ? void 0 : cfg.scale1) !== null && _f !== void 0 ? _f : 1;
    return {
        filter: [filter0, filter1, filter0],
        scale: [scale0, scale1, scale0],
    };
}
export function useHighlight(config) {
    const controls = useAnimation();
    const start = useMemo(() => startTarget(config), [config]);
    const animate = useCallback((action) => {
        controls.stop();
        controls.start(action);
    }, [controls]);
    const variants = {
        start: Object.assign(Object.assign({}, start), { transition: Object.assign({ duration: 0.5, repeat: Infinity, ease: "easeInOut" }, config === null || config === void 0 ? void 0 : config.transition) }),
        stop: {
            filter: "brightness(100%) drop-shadow(0 0 0 #0000)",
        },
    };
    return {
        highlightedProps: { animate: controls, variants },
        animate,
    };
}
