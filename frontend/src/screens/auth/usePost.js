import { useEffect, useState } from "react";
import axios from 'axios'

export const useFetch=(url)=> {
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
        const fetchData = async()=>{
            setLoading(true);

            try {
                const response = await fetch(url);
                const json = await response.json();
                setData(json);
                setLoading(false);

            } catch (error) {
                setError(error);
                setLoading(false)
            }
        }
        fetchData();
    }, [url]);

    return {
        loading, error, data
    }
}


export const usePost=(url, body)=>{
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{

        const postData = async()=>{
            setLoading(true);

            if(Object.entries(body).length !== 0){
                try {
                    const { data } = await axios.post(url, body)
                    // const json = JSON.stringify(data);
                    setData( JSON.stringify(data));
                    setLoading(false);

                } catch (error) {
                    setError(error.response);
                    setLoading(false);
                    // console.log(error.response)
                }
            }

        }
        postData();
    }, [ body])

    return {
        loading, error, data
    }
}

export const useAuthPost= async(url, body, auth)=>{
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{

        const postData = async()=>{
            setLoading(true);

            if(Object.entries(body).length !== 0){
                try {
                    const { data } = await axios.post(url, body, {
                        headers: {
                            Authorization: `Bearer ${auth}`
                        }
                    })

                    // console.log("THE DATA ", data);
                    const json = JSON.stringify(data);
                    setData(json);
                    setLoading(false);

                } catch (error) {
                    // console.log(error.response);
                    setError(error.response);
                    setLoading(false);
                }
            }
        }
        postData();
    }, [body])

    return {
        loading, error, data
    }
}