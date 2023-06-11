import { useEffect, useState } from "react"
import axios from "axios";

const useDeptAllFetch = (url) => {
    const [deptAll, setDeptAll] = useState([]);
    const [loading , setLoading] = useState([false]);
    const [error , setError] = useState([false]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await axios.get(url)
                .then((response) => {
                    setError(null)
                    setDeptAll(response.data);
                })
                .catch((error) => {
                    setError(error.response.data.Message)
                    setTimeout(() => {
                        setError(null)
                    }, 5000)
                    setDeptAll(error.response.data.result);
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
            setDeptAll(response.data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }

    return {deptAll, loading, error, reFetch}
}

export default useDeptAllFetch;