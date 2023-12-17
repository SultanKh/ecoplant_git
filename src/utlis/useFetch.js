import { useEffect, useState } from "react";

export const URL = 'http://localhost:3000'


export default function useFetch(URL, endpoint, page, limit) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let fetchCancel = false;
        setError(null);
        setLoading(true);
        const fetchData = async () => {
            try {
                if (!fetchCancel) {
                    const res = await fetch(`${URL}${endpoint}?page=${page}&limit=${limit}`);
                    const responseJson = await res.json();
                    setData(responseJson);
                }
            } catch (err) {
                setError(err.message || 'Something went wrong!');
            }
            setLoading(false);
        };

        fetchData();

        return () => {
            fetchCancel = true;
        };
    }, [endpoint, page, limit]);

    return { data, error, loading };
}