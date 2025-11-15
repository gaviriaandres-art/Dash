
import { useState, useEffect, useCallback } from 'react';

// Un hook genérico para cargar los datos
export function useSalesData<T,>(fetcher: () => Promise<T[]>) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetcher();
            setData(result);
        } catch (e: any) {
            setError(e.message || "Ocurrió un error al cargar los datos.");
        } finally {
            setLoading(false);
        }
    }, [fetcher]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetcher]); // El fetcher debe estar memoizado con useCallback en el componente que lo llama

    return { data, loading, error, refresh: fetchData };
}
