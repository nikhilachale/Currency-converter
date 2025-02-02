import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';

const Form: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState<string>('usd');
  const [toCurrency, setToCurrency] = useState<string>('inr');
  const [result, setResult] = useState<number | null>(null);

  // Fetch exchange rate when currencies change
  const { rates, currencyList, loading, error } = useFetch(fromCurrency, toCurrency);

  const options = currencyList;

  useEffect(() => {
    if (loading) {
      console.log('Loading...');
    }
    if (error) {
      console.error('Error fetching currency rate');
    }
  }, [loading, error, toCurrency, fromCurrency,amount]);

  // Handle conversion logic
 
  useEffect(() => {
    if (amount > 0) {
      handleConvert();
    }
  }, [amount, fromCurrency, toCurrency, rates]);
  
  const handleConvert = () => {
    // Ensure the amount is a valid number
    if (isNaN(amount) || amount <= 0) {
      setResult(null); // Reset result if invalid amount
      console.error('Please enter a valid amount greater than zero.');
      return;
    }

    if (rates && toCurrency in rates) {
      const conversionRate = rates[toCurrency];
      if (conversionRate) {
        setResult(amount * conversionRate); // Perform the conversion
      } else {
        setResult(null);
        console.error('Error: Invalid currency or rate not available');
      }
    } else {
      setResult(null);
      console.error('Error: Currency rate not found.');
    }
  };

  // Ensure valid number input for amount
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    // If the value is a valid number, update the amount; otherwise, reset it
    if (!isNaN(value) && value >= 0) {
      setAmount(value);
    } else {
      setAmount(0); // Reset to 0 if input is invalid
    }
  };

  return (
    <div className="flex justify-center items-center bg-white">
      <div className="bg-white w-full h-72 max-w-4xl rounded-lg shadow-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          {/* Input Field */}
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter Amount"
            className="w-full sm:w-1/3 mb-4 sm:mb-0 border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* From Currency Dropdown */}
          <select
            name="fromCurrency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full sm:w-1/3 mb-4 sm:mb-0 border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {options.map((currency: string) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </select>

          {/* To Currency Dropdown */}
          <select
            name="toCurrency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full sm:w-1/3 mb-4 sm:mb-0 border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {options.map((currency: string) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Convert Button */}
        <div className="flex justify-between items-center w-full mt-4">
          {/* Button on the Right */}
          <button
            onClick={handleConvert}
            className="bg-blue-900 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Convert
          </button>
          {/* Display Result on the Left */}
          {result !== null && (
            <div className="text-lg font-semibold text-gray-700">
              <p>
                {amount} {fromCurrency.toUpperCase()} ={' '}
                {result.toFixed(2)} {toCurrency.toUpperCase()}
              </p>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default Form;