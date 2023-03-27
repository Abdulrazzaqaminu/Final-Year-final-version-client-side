import { useEffect, useState } from "react"
import axios from "axios";

const useDeptFetch = (url) => {
    const [dept, setDept] = useState([]);
    const [loading , setLoading] = useState([false]);
    const [error , setError] = useState([false]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await axios.get(url)
                .then((response) => {
                    setError(null)
                    setDept(response.data);
                })
                .catch((error) => {
                    setError(error.response.data.Message)
                    setTimeout(() => {
                        setError(null)
                    }, 5000)
                    setDept(error.response.data.result);
                })
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchData();
    }, [url]);
    
    const reFetchDept = async () => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setDept(response.data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }

    return {dept, loading, error, reFetchDept}
}

export default useDeptFetch;