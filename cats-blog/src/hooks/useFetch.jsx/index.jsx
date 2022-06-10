import { useEffect, useState } from "react";

import messages from "utils/messages";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
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
                setError(error.message);
            });
    }, [url]);

    return {
        data,
        isLoading,
        error,
    };
}

export default useFetch;
