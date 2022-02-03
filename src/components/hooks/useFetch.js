import { useState } from "react";

const useFetch = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);

    const fetch = async(...data) => {
        try {
            setIsLoading(true);
            await callback(...data);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }

    return [fetch, isLoading, error];
}

export default useFetch;