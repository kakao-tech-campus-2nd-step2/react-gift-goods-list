
import axios from "axios";
import { useEffect,useState } from "react";

const useGetData = <T>(url: string): { data: T | null, isLoading: boolean } | null => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                setData(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(true);
            });
    }, [url]);

    return { data, isLoading };
}

export default useGetData; 