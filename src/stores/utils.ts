import {StateCreator} from 'zustand';

export type SliceCreator<T> = StateCreator<any, [['zustand/immer', never]], [], T>;

export function createSliceSetters<T extends Record<string, any>>(
    set: (fn: (state: any) => void) => void,
    sliceKey: keyof any,
    state: T
) {
    const setters = {} as Record<string, Function>;

    for (const key in state) {
        if (state.hasOwnProperty(key)) {
            const value = state[key as keyof T];
            if (typeof value === 'function') continue;

            const setterName = `set${key.charAt(0).toUpperCase()}${key.slice(1)}`;

            setters[setterName] = (newValue: any) => {
                set((state) => {
                    (state[sliceKey] as Record<string, any>)[key] = newValue;
                });
            };
        }
    }

    return setters;
}