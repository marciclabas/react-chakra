import React, { useCallback, useState } from "react";
import { Carousel } from "./Carousel.js";
import { mod } from "@haskellian/mod";
/**
 * Self-managed draggable carousel. Returns the actual component `carousel`, plus the `selected` item and callbacks to programatically move
 */
export function useCarousel(items, config) {
    var _a;
    const wrap = (_a = config === null || config === void 0 ? void 0 : config.wrap) !== null && _a !== void 0 ? _a : true;
    const numItems = items.mode === 'eager'
        ? items.items.length
        : items.numItems;
    const item = items.mode === 'eager'
        ? (idx) => items.items[idx]
        : items.item;
    const [state, setState] = useState({ page: 0 });
    const { page, dir, skipAnimation } = state;
    const move = useCallback((dir) => {
        const delta = dir === 'left' ? 1 : -1;
        setState(curr => {
            const page = wrap
                ? curr.page + delta
                : Math.max(0, Math.min(curr.page + delta, numItems - 1));
            return {
                page, dir, skipAnimation: false
            };
        });
    }, [setState, wrap, numItems]);
    const goto = useCallback((newPage) => {
        const dir = newPage > page ? 'left' : 'right';
        const skipAnimation = Math.abs(newPage - page) > 1;
        setState({ page: newPage, dir, skipAnimation });
    }, [page, setState]);
    const selected = mod(page, numItems);
    const carousel = (React.createElement(Carousel, Object.assign({ page: page, direction: dir, skipAnimation: skipAnimation, move: move, item: item(selected) }, config)));
    return { carousel, selected, move, goto };
}
export default useCarousel;
