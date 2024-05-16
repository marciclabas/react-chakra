import React, { useCallback, useState } from "react";
import PreviewedCarousel from "./PreviewedCarousel.js";
import { mod } from "@haskellian/mod";
export function usePreviewedCarousel(item, numItems, config) {
    var _a;
    const [page, setPage] = useState((_a = config === null || config === void 0 ? void 0 : config.startIdx) !== null && _a !== void 0 ? _a : 1);
    const idx = mod(page, numItems);
    const next = (i, m = numItems) => mod(i + 1, m);
    const prev = (i, m = numItems) => mod(i - 1, m);
    const m = numItems < 2 ? 4 * numItems // minimum multiple of numItems >3
        : numItems < 3 ? 2 * numItems // (so that three items are always shown, even if repeated)
            : numItems;
    const move = useCallback((dir) => {
        setPage(i => dir === 'left' ? i + 1 : i - 1);
    }, []);
    const carousel = (React.createElement(PreviewedCarousel, { prev: { elem: item({ idx: prev(idx) }), key: mod(page - 1, m) }, curr: { elem: item({ idx, selected: true }), key: mod(page, m) }, next: { elem: item({ idx: next(idx) }), key: mod(page + 1, m) }, move: move, config: config }));
    return { move, selected: idx, carousel };
}
