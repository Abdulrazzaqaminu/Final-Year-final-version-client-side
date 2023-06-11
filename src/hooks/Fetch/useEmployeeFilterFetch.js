import { useEffect, useState } from "react"
import axios from "axios";

const useEmployeeFilterFetch = (url) => {
    const [empfilter, setEmpFilter] = useState([]);
    const [empLoading , setEmpLoading] = useState(false);
    const [empError , setEmpError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setEmpLoading(true);
            try {
                await axios.get(url)
                .then((response) => {
                    setEmpError(null)
                    setEmpFilter(response.data);
                })
                .catch((error) => {
                    setEmpError(error.response.data.Message)
                    setTimeout(() => {
                        setEmpError(null)
                    }, 5000)
                })
            } catch (error) {
                setEmpError(error);
            }
            setEmpLoading(false);
        }
        fetchData();
    }, [url]);
    
    const reFetchEmpFilter = async () => {
        setEmpLoading(true);
        try {
            const response = await axios.get(url);
            setEmpFilter(response.data);
        } catch (error) {
            setEmpError(error);
        }
        setEmpLoading(false);
    }

    return {empfilter, empLoading, empError, reFetchEmpFilter}
}

export default useEmployeeFilterFetch;