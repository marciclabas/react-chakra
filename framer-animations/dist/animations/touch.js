var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
import { useAnimation, motion } from 'framer-motion';
import { Modal } from '../modal/index.js';
import { PointerIcon } from '../util/icons/PointerIcon.js';
import { useNotifiedState } from '../util/notified-state.js';
import { delay } from '@haskellian/async/promises/single/time.js';
export function useTouchAnimation(config) {
    var _a, _b, _c;
    const cfg = (config !== null && config !== void 0 ? config : {});
    const handIcon = (_a = cfg.handIcon) !== null && _a !== void 0 ? _a : React.createElement(PointerIcon, { svg: Object.assign({ width: '4rem', height: '4rem' }, cfg.svg), path: Object.assign({ fill: 'white' }, cfg.path) });
    const [modal, setModal] = useNotifiedState(false);
    const iconControls = useAnimation();
    const run = useCallback((action) => __awaiter(this, void 0, void 0, function* () {
        switch (action) {
            case 'show':
                return yield setModal(true); // make sure the modal is mounted before continuing
            case 'hide':
                setModal(false); // we already assume the modal will be unmounted, so who cares
                return;
            case 'press':
            case 'lift': {
                const scale = action === 'press' ? 0.7 : 1;
                iconControls.stop();
                return yield iconControls.start({ scale });
            }
        }
    }), [iconControls, setModal]);
    const animate = useCallback((...actions) => __awaiter(this, void 0, void 0, function* () {
        for (const a of actions) {
            yield run(a);
            yield delay(0);
        }
    }), [run]);
    const _d = (_b = config === null || config === void 0 ? void 0 : config.modalProps) !== null && _b !== void 0 ? _b : {}, { transition } = _d, modalProps = __rest(_d, ["transition"]);
    const _e = (_c = config === null || config === void 0 ? void 0 : config.iconProps) !== null && _c !== void 0 ? _c : {}, { style } = _e, iconProps = __rest(_e, ["style"]);
    const initial = typeof iconProps.initial === 'object' ? iconProps.initial : undefined;
    const animation = (React.createElement(Modal, Object.assign({ show: modal, transition: Object.assign({ duration: 0.2 }, transition) }, modalProps),
        React.createElement(motion.div, { animate: iconControls, initial: Object.assign({ scale: 1 }, initial), style: Object.assign({ y: '70%', x: '40%' }, style) }, handIcon)));
    return { animation, animate };
}
