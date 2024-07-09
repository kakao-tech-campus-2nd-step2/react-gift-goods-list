
import axios from "axios";
import { useEffect,useState } from "react";

const useGetData = <T>(url: string): T | null => {
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        axios.get(url)
            .then((response) => { setData(response.data); });
    }, [url]);

    return data;
}

export default useGetData; 