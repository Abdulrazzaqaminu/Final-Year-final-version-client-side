import { useEffect, useState } from "react"
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading , setLaoding] = useState([false]);
    const [error , setError] = useState([false]);

    useEffect(() => {
        const fetchData = async () => {
            setLaoding(true);
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (error) {
                setError(error);
            }
            setLaoding(false);
        }
        fetchData();
    }, [url]);
    
    const reFetch = async () => {
        setLaoding(true);
        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            setError(error);
        }
        setLaoding(false);
    }

    return {data, loading, error, reFetch}
}

export default useFetch;