import { useState, useEffect } from "react";
import axios from "axios";

// Define the shape of the response data for currency rates
interface CurrencyRates {
    [currency: string]: number; // Key-value pairs for currency rates (e.g., USD: 1.25)
}

interface ApiResponse {
    date: string; // Separate date field
    [currency: string]: CurrencyRates | string; // Currency rates or date field
}

export default function useFetch(from: string,to :string) {
    const [rates, setRates] = useState<CurrencyRates | null>(null); // Store the rates for the selected currency
    const [currencyList, setCurrencyList] = useState<string[]>([]); // List of available currencies
    const [loading, setLoading] = useState<boolean>(true); // State for loading
    const [error, setError] = useState<string | null>(null); // State for any error

    useEffect(() => {
        const fetchRates = async () => {
            setLoading(true); // Start loading
            setError(null); // Reset any previous errors
            try {
                // Fetch the currency data from the API for the selected `from` currency
                const response = await axios.get<ApiResponse>(
                    `https://2024-04-06.currency-api.pages.dev/v1/currencies/${from}.json`
                );

                console.log(response.data); // Log the response data

                // Safely extract the rates for the selected `from` currency (excluding `date`)
                const rateData = response.data[from] as CurrencyRates;
                console.log(rateData); // Log the rates for the selected currency
                setRates(rateData);
                // console.log(Object.keys(rateData)); // Log the rates for the selected currency

                // Extract the currency list dynamically from the response data (excluding `date`)
                const currencies = Object.keys(rateData)
                console.log(currencies); // Log the currency list
                setCurrencyList(currencies);
            } catch (error) {
                console.error("Error fetching currency rates:", error);
                setError("Error fetching currency rate");
                setRates(null); // Reset rates to null in case of error
                setCurrencyList([]); // Reset currency list in case of error
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchRates(); // Call the function to fetch the data
    }, [from,to]); // Re-run effect when `from` currency changes

    return { rates, currencyList, loading, error }; // Return both rates and currencyList, along with loading and errors
}