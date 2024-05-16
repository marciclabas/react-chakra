var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useCallback } from 'react';
import { useAnimation, motion } from "framer-motion";
const variantKeys = ['start', 'loading', 'succeed', 'fail', 'out'];
const defaultSuccess = (React.createElement("svg", { width: "100", height: "100", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M9 12.5L11.5 15L15 9", stroke: "#282", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })));
const defaultFail = (React.createElement("svg", { width: "64", height: "64", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M18 6L6 18", stroke: "#822", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M6 6L18 18", stroke: "#822", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" })));
const defaultCfg = {
    color: 'white', successIcon: defaultSuccess, failIcon: defaultFail,
    strokeWidth: 2, startArcProportion: 1, loadingArcProportion: 0.1,
    period: 1, arcDuration: 0.5
};
// Inspired by https://jitter.video/file/?id=dAMdMIMhmM01LvguoXUkc
export function useLoader(config) {
    var _a;
    const { color, successIcon, failIcon, loadingArcProportion, startArcProportion, strokeWidth, period } = Object.assign(Object.assign({}, defaultCfg), config);
    const arcDuration = (_a = config === null || config === void 0 ? void 0 : config.arcDuration) !== null && _a !== void 0 ? _a : period / 2;
    const controls = useAnimation();
    const successControls = useAnimation();
    const failControls = useAnimation();
    const variants = {
        start: {
            scale: 1,
            pathLength: startArcProportion,
            pathOffset: 1 - startArcProportion,
            opacity: 0,
            fill: 'none',
            strokeWidth,
        },
        loading: {
            opacity: 1,
            pathLength: loadingArcProportion,
            pathOffset: [0, 1 - loadingArcProportion],
            rotate: [0, 360],
            transition: {
                duration: arcDuration,
                rotate: { duration: period, repeat: Infinity, ease: 'linear' }
            }
        },
        succeed: {
            scale: 1,
            opacity: 1,
            pathLength: 1,
            pathOffset: 0,
            strokeWidth: [strokeWidth, 40],
            fill: ['none', color],
            transition: {
                strokeWidth: { type: 'spring', stiffness: 150, damping: 8, mass: 0.5 },
                pathLength: { duration: 0 },
                pathOffset: { duration: 0 },
            }
        },
        fail: {
            scale: 1,
            opacity: 1,
            pathLength: 1,
            pathOffset: 0,
            strokeWidth: [strokeWidth, 40],
            fill: ['none', color],
            transition: {
                strokeWidth: { type: 'spring', stiffness: 150, damping: 8, mass: 0.5 },
                pathLength: { duration: 0 },
                pathOffset: { duration: 0 },
            }
        },
        out: {
            scale: [1, 0],
            transition: {
                duration: 0.2
            }
        }
    };
    const start = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        controls.stop();
        yield controls.start('start');
    }), [controls]);
    const load = useCallback(() => {
        controls.stop();
        controls.start('loading');
    }, [controls]);
    const finish = useCallback((result) => __awaiter(this, void 0, void 0, function* () {
        const iconControls = result === 'succeed'
            ? successControls : failControls;
        controls.stop();
        yield Promise.all([
            controls.start(result),
            iconControls.start({ opacity: 1, scale: 1 })
        ]);
        yield Promise.all([
            controls.start('out'),
            iconControls.start({ opacity: 0, scale: 0 }, { duration: 0.2 })
        ]);
        controls.set('start');
    }), [controls, failControls, successControls]);
    const animate = useCallback((action) => action === 'stop' ? start() :
        action === 'load' ? load() :
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            finish(action), [finish, load, start]);
    const iconStyle = {
        height: '100%', width: '100%', position: 'absolute', top: 0, left: 0,
        display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '3rem'
    };
    const loader = (React.createElement("div", { style: {
            height: '100%', width: '100%', position: 'relative', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
        } },
        React.createElement("svg", { viewBox: "0 0 100 100" },
            React.createElement(motion.circle, { variants: variants, initial: 'start', animate: controls, cx: '50', cy: '50', r: '20', stroke: color })),
        React.createElement(motion.div, { style: iconStyle, initial: { opacity: 0, scale: 0 }, animate: successControls }, successIcon),
        React.createElement(motion.div, { style: iconStyle, initial: { opacity: 0, scale: 0 }, animate: failControls }, failIcon)));
    return { animate, loader };
}
