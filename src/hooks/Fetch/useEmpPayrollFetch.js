import { useEffect, useState } from "react"
import axios from "axios";

const useEmpPayrollFetch = (url) => {
    const [payroll, setPayroll] = useState([]);
    const [loading , setLoading] = useState([false]);
    const [error , setError] = useState([false]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await axios.get(url)
                .then((response) => {
                    setError(null)
                    setPayroll(response.data);
                })
                .catch((error) => {
                    setError(error.response.data.Message)
                    setTimeout(() => {
                        setError(null)
                    }, 5000)
                    setPayroll(error.response.data.result);
                })
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchData();
    }, [url]);
    
    const reFetchPayroll = async () => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setPayroll(response.data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }

    return {payroll, loading, error, reFetchPayroll}
}

export default useEmpPayrollFetch;