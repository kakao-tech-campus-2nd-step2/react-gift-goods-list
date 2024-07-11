
import axios from "axios";
import { useEffect,useState } from "react";

type Returns<T> = {
        data: T | null;
        isLoading: boolean;
        httpStatusCode: number;
    } | null

const useData = <T>(url: string): Returns<T> => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [httpStatusCode, setHttpStatusCode] = useState<number>(200);

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                setData(response.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(true);
                setHttpStatusCode(err.response.status);
            });
    }, [url]);

    return { data, isLoading, httpStatusCode };
}

export default useData; 