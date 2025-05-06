
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from "@/hooks/use-toast";

type CurrencyContextType = {
  selectedCurrency: string;
  exchangeRates: Record<string, number>;
  setSelectedCurrency: (currency: string) => void;
  loading: boolean;
  error: string | null;
};

const CurrencyContext = createContext<CurrencyContextType>({
  selectedCurrency: 'USD',
  exchangeRates: {},
  setSelectedCurrency: () => {},
  loading: false,
  error: null,
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchExchangeRates = async (baseCurrency: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/d1dffabc78888c0fb95ff1ca/latest/${baseCurrency}`
      );
      
      if (response.data && response.data.conversion_rates) {
        setExchangeRates(response.data.conversion_rates);
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err) {
      console.error("Error fetching exchange rates:", err);
      setError("Failed to load exchange rates. Using fallback data.");
      toast({
        title: "API Error",
        description: "Using fallback exchange rate data. Some rates may not be current.",
        variant: "destructive",
      });
      
      // Fallback to mock data if the API call fails
      setExchangeRates({
        USD: 1,
        EUR: 0.85,
        GBP: 0.75,
        JPY: 110.5,
        AUD: 1.3,
        CAD: 1.25,
        CHF: 0.92,
        CNY: 6.45,
        INR: 74.5,
        SGD: 1.35,
        MXN: 20.45,
        BRL: 5.25,
        ZAR: 15.10,
        RUB: 73.50,
        TRY: 8.65,
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch exchange rates when the component mounts or when selectedCurrency changes
  useEffect(() => {
    fetchExchangeRates(selectedCurrency);
  }, [selectedCurrency]);

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };

  return (
    <CurrencyContext.Provider 
      value={{ 
        selectedCurrency, 
        exchangeRates, 
        setSelectedCurrency: handleCurrencyChange, 
        loading, 
        error 
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
