import React from 'react';
import { AnimatePresence, LayoutGroup, motion, useDragControls } from 'framer-motion';
const states = ['enter', 'left', 'center', 'right', 'exit'];
export const defaultPreview = {
    scale: 0.7, rotateY: '45deg', transformPerspective: 1000, widthProportion: 0.25, zIndex: 0
};
export const defaultCurr = {
    scale: 1.2, zIndex: 1
};
export function PreviewedCarousel({ prev, curr, next, move, config }) {
    var _a;
    const { scale, widthProportion, rotateY, transformPerspective, zIndex } = Object.assign(Object.assign({}, defaultPreview), config === null || config === void 0 ? void 0 : config.preview);
    const { scale: currScale, zIndex: currZ } = Object.assign(Object.assign({}, defaultCurr), config === null || config === void 0 ? void 0 : config.current);
    const swipeThreshold = (_a = config === null || config === void 0 ? void 0 : config.swipeThreshold) !== null && _a !== void 0 ? _a : 1e4;
    const variants = {
        enter: { opacity: 0, scale: 0 },
        exit: { opacity: 0, scale: 0 },
        left: { opacity: 1, scale, zIndex, x: [0, -10], transition: { x: { repeat: Infinity, duration: 1e6 } } },
        center: { opacity: 1, scale: currScale, zIndex: currZ, x: [0, 1], transition: { x: { repeat: Infinity, duration: 1e6 } } },
        right: { opacity: 1, scale, zIndex, x: [0, 10], transition: { x: { repeat: Infinity, duration: 1e6 } } },
    }; // IMPORTANT: fast swiping sometimes breaks the x-translation. The whole x: [0, 10] + repeat: Inifinity 
    //            thing forces it back to place whilst being completely unnoticeable (10px in 1e6 secs xd)
    const common = {
        style: { height: '100%' }, variants,
        layout: 'position', exit: 'exit', initial: 'enter',
    };
    const dragControls = useDragControls();
    const startDrag = e => dragControls.start(e);
    return (React.createElement(LayoutGroup, null,
        React.createElement(motion.div, { layoutRoot: true, style: { height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }, onPointerDown: startDrag },
            React.createElement(AnimatePresence, { initial: false, mode: 'popLayout' },
                React.createElement(motion.div, Object.assign({ key: prev.key }, common, { animate: 'left', style: { height: '100%', width: `${100 * widthProportion}%`, userSelect: 'none' } }),
                    React.createElement(motion.div, { key: prev.key, style: common.style, animate: { rotateY, transformPerspective } }, prev.elem)),
                React.createElement(motion.div, Object.assign({ key: curr.key }, common, { animate: 'center', style: { height: '100%', width: `${100 * (1 - 2 * widthProportion)}%` }, drag: "x", dragElastic: 1, dragConstraints: { left: 0, right: 0 }, dragControls: dragControls, onDragEnd: (_, { offset, velocity }) => {
                        const swipe = Math.abs(offset.x) * velocity.x;
                        if (swipe < -swipeThreshold) {
                            move('left');
                        }
                        else if (swipe > swipeThreshold)
                            move('right');
                    } }), curr.elem),
                React.createElement(motion.div, Object.assign({ key: next.key }, common, { animate: 'right', style: { height: '100%', width: `${100 * widthProportion}%`, userSelect: 'none' } }),
                    React.createElement(motion.div, { key: next.key, style: common.style, animate: { rotateY: `-${rotateY}`, transformPerspective } }, next.elem))))));
}
export default PreviewedCarousel;
