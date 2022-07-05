import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(url);
        const json = await response.json();
        // console.log('json::',json)
        setData(json);
        setLoading(false);
      } catch (error) {
        // console.log("Error querrying data ")
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { loading, error, data };
};

export const usePost = (url, body) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postData = async () => {
      setLoading(true);
      if (Object.entries(body).length !== 0) {
        try {
          const { data } = await axios.put(url, body, {
            headers: {
              Authorization: process.env.AUTH,
            },
          });
          console.log("the data ", data);
          const json = JSON.stringify(data);
          setData(json);
          setLoading(false);
          console.log("this is the success msg ", json);
        } catch (error) {
          setError(error.response);
          setLoading(false);
        }
      }
    };
    postData();
  }, [url, body]);

  return { loading, error, data };
};
