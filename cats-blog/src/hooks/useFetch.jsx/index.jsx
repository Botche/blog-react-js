import { useEffect, useState } from "react";

import messages from "utils/messages";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const abortController = new AbortController();

    useEffect(() => {
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
    }, [abortController, url]);

    return {
        data,
        isLoading,
        error,
    };
}

export default useFetch;
