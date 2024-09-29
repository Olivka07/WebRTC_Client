import { useCallback, useEffect, useRef, useState } from 'react';

function isFunction<T>(func: unknown): func is (p: T) => T {
    return typeof func === 'function';
}

export function useStateWithCallback<T>(initialState: T) {
    const [state, setState] = useState<T>(initialState);
    const cbRef = useRef(null);

    const updateState = useCallback(
        (
            newState: T | ((p: T) => T),
            cb: (param: T) => unknown = undefined
        ) => {
            cbRef.current = cb;

            setState((prev) =>
                isFunction(newState) ? newState(prev) : newState
            );
        },
        []
    );

    useEffect(() => {
        if (cbRef.current) {
            cbRef.current(state);
            cbRef.current = null;
        }
    }, [state]);

    return [state, updateState] as const;
}
