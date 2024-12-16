import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosGet = ({ URI, initialValue = [], deps = [] }) => {
    const [data, setData] = useState(initialValue);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(URI);
                setData(response.data);
                setError(null);
            } catch (err) {
                setError(err.status);
                setData(initialValue);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, deps);

    return { data, error, isLoading };
};

export default useAxiosGet;
