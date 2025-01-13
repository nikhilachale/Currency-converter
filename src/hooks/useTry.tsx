import { useState, useEffect } from "react";
import axios from "axios";

// Define the interface for the API response
interface ApiResponse {
  date: string; // Separate date field
  [currency: string]: string | object; // Currency rates or date field
}

export default function useTry() {
  const [currencyList, setCurrencyList] = useState<string[]>([]); // Store available currencies
  const [loading, setLoading] = useState<boolean>(true); // To track loading state
  const [error, setError] = useState<string | null>(null); // To track errors

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when starting the fetch
      try {
        // Corrected the URL
        const response = await axios.get(
          "https://2025-01-06.currency-api.pages.dev/v1/currencies.json"
        );

        // Assuming the response contains a list of currencies
        if (response.data && response.data.date) {
            console.log(response.data)
          // Extract currency list (excluding the 'date' field)
          const currencies = Object.keys(response.data).filter(
            (currency) => currency !== "date"
          );
          setCurrencyList(currencies); // Set the list of available currencies
        }

        setError(null); // Reset error if fetch is successful
      } catch (error) {
        setError("Error fetching currency data");
        console.error("Error fetching currency rate:", error);
      } finally {

        
        setLoading(false);
         // Set loading to false after the fetch finishes
      }
    };

    fetchData();
  }, []); // Run effect once when the component mounts

  return { currencyList, loading, error }; // Return only the currency list, loading, and error state
}