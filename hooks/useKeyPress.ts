import { useEffect } from 'react';

export function useKeyPress(callback: () => void, keyCodes: string[]) {
    // directly extract the code property from the passed KeyboardEvent object
    const handler = ({ code,  }: KeyboardEvent): void => {
        if (keyCodes.includes(code)) {

            callback();
        }
    };
    useEffect(() => {
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);
}
