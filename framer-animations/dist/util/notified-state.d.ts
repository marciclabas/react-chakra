import { SetStateAction } from 'react';
/** Exactly the same as `useState`, except `setState` returns a promise that resolves after the state is actually updated */
export declare function useNotifiedState<T>(initialState: T | (() => T)): [T, (a: SetStateAction<T>) => Promise<void>];
