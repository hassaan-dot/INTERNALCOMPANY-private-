import { useState } from 'react';
import axios from '@/services/axios';

export const useSetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const setPassword = async (token: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/set-password', {
                token,
                password,
            });
            return response.data;
        } catch (err: any) {
            const message = err?.response?.data?.message || 'Something went wrong';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    return {
        setPassword,
        loading,
        error,
    };
};
