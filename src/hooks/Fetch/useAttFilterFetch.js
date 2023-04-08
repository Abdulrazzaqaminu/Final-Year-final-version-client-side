import { useEffect, useState } from "react"
import axios from "axios";

const useAttFilterFetch = (url) => {
    const [filter, setFilter] = useState([]);
    const [loading , setLoading] = useState([false]);
    const [filtererror , setFilterError] = useState([false]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await axios.get(url)
                .then((response) => {
                    setFilterError(null)
                    setFilter(response.data);
                })
                .catch((error) => {
                    setFilterError(error.response.data.Message)
                    // setTimeout(() => {
                    //     setFilterError(null)
                    // }, 5000)
                    setFilter(error.response.data.result);
                })
            } catch (error) {
                setFilterError(error);
            }
            setLoading(false);
        }
        fetchData();
    }, [url]);
    
    const reFetch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setFilter(response.data);
        } catch (error) {
            setFilterError(error);
        }
        setLoading(false);
    }

    return {filter, filtererror}
}

export default useAttFilterFetch;