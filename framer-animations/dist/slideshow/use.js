import { useCallback, useRef, useState } from "react";
export function useSlideshow(defaultView, config) {
    var _a;
    const [{ view, back }, setState_] = useState({ view: defaultView });
    const throttle = useRef(false);
    const throttleMs = (_a = config === null || config === void 0 ? void 0 : config.throttleMs) !== null && _a !== void 0 ? _a : 200;
    const setState = useCallback((x) => {
        if (throttle.current)
            return;
        setState_(x);
        if (throttleMs > 0)
            throttle.current = true;
        setTimeout(() => throttle.current = false, throttleMs);
    }, [throttleMs]);
    return {
        slideshowProps: { pageKey: view, direction: back ? 'left' : 'right' },
        goto: x => setState(x),
        go: x => () => setState(x),
        view
    };
}
