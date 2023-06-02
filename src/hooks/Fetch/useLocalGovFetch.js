import { useEffect, useState } from "react"
import axios from "axios";

const useLocalGovFetch = (url) => {
    const [localGov, setLocalGov] = useState([]);
    const [loading , setLoading] = useState([false]);
    const [error , setError] = useState([false]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await axios.get(url)
                .then((response) => {
                    setError(null)
                    setLocalGov(response.data);
                })
                .catch((error) => {
                    setError(error.response.data.Message)
                    setTimeout(() => {
                        setError(null)
                    }, 5000)
                    setLocalGov(error.response.data.result);
                })
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchData();
    }, [url]);
    
    const reFetchLocalGov = async () => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setLocalGov(response.data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }

    return {localGov, loading, error, reFetchLocalGov}
}

export default useLocalGovFetch;