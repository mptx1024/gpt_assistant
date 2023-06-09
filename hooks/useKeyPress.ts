import { useEffect, useState } from 'react';

// export function useKeyPress(callback: () => void, keyCodes: string[], deps: DependencyList) {
//     const handler = ({ code }: KeyboardEvent): void => {
//         if (keyCodes.includes(code)) {
//             callback();
//         }
//     };
//     useEffect(() => {
//         window.addEventListener('keydown', handler);
//         return () => window.removeEventListener('keydown', handler);
//     }, [...deps]);
// }

export const useKeyPress = (targetKey: string) => {
    const [keyPressed, setKeyPressed] = useState(false);
    const downHandler = ({ key }: KeyboardEvent) => {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    };
    const upHandler = ({ key }: KeyboardEvent) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []);

    return keyPressed;
};
