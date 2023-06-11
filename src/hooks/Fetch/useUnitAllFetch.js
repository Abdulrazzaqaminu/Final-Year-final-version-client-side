import { useEffect, useState } from "react"
import axios from "axios";

const useUnitAllFetch = (url) => {
    const [unitAll, setUnitAll] = useState([]);
    const [loading , setLoading] = useState([false]);
    const [error , setError] = useState([false]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await axios.get(url)
                .then((response) => {
                    setError(null)
                    setUnitAll(response.data);
                })
                .catch((error) => {
                    setError(error.response.data.Message)
                    setTimeout(() => {
                        setError(null)
                    }, 5000)
                    setUnitAll(error.response.data.result);
                })
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchData();
    }, [url]);
    
    const reFetch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setUnitAll(response.data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }

    return {unitAll, loading, error, reFetch}
}

export default useUnitAllFetch;