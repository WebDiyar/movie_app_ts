import { useEffect, useState } from "react";
import { fetchingDataFromApi } from "../utils/api";

interface FetchResponse<T> {
  data: T | null;
  loading: string | boolean | null;
  error?: string | null;
}

export const useFetch = <T>(url: string): FetchResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<string | boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading("Loading...");
    setData(null);
    setError(null);

    fetchingDataFromApi<T>(url)
      .then((result) => {
        setLoading(false);
        setData(result as T);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [url]);

  return { data, loading, error };
};
