import { useEffect, useState } from "react";

import messages from "utils/messages";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        fetch(url, {
            signal: abortController.signal,
        })
            .then(response => {
                if (response.ok === false) {
                    throw Error(messages.errorFetchingResourse); 
                }

                return response.json();
            })
            .then(data => {
                setError(null);
                setIsLoading(false);
                setData(data);
            })
            .catch(error => {
                setIsLoading(false);
                
                if (error.name === 'AbortError') {
                    return;
                }
                
                setError(error.message);
            });

        return () => abortController.abort();
    }, [url]);

    return {
        data,
        isLoading,
        error,
    };
}

export default useFetch;
