import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function useFetch(url,query) {
  const [isloading, setisloading] = useState(false);
  const [Data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setisloading(true);
        const {data}= await axios.get(`${url}?${query}`)
        setData(data)

      } catch (err) {
        setData([])
        toast.error(err.message)
      } finally {
        setisloading(false);
      }
    }
    fetchData()
  }, [url,query]);
  return {isloading,Data}
}
