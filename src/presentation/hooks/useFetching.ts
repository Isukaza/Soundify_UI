import { useState } from 'react';

export const useFetching = <T extends (...args: any[]) => Promise<any>>(callback: T) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetching = async (...args: Parameters<T>): Promise<void> => {
        try {
            setIsLoading(true);
            await callback(...args);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return [fetching, isLoading, error] as const;
};