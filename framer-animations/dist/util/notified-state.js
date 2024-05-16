var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { managedPromise } from '@haskellian/async/promises/single/managed.js';
import { useCallback, useEffect, useRef, useState } from 'react';
/** Exactly the same as `useState`, except `setState` returns a promise that resolves after the state is actually updated */
export function useNotifiedState(initialState) {
    const [state, setState] = useState(initialState);
    const updatedState = useRef(managedPromise());
    useEffect(() => { updatedState.current.resolve(); }, [state]);
    const notifiedSetState = useCallback((action) => __awaiter(this, void 0, void 0, function* () {
        updatedState.current = managedPromise();
        setState(state => {
            const next = typeof action === 'function' ? action(state) : action;
            if (state === next)
                updatedState.current.resolve();
            return next;
        });
        yield updatedState.current;
    }), []);
    return [state, notifiedSetState];
}
