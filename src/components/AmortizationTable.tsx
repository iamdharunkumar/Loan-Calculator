
import { useCurrency } from "@/contexts/CurrencyContext";
import { AmortizationEntry } from "@/hooks/useEmiCalculator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AmortizationTableProps {
  emi: number;
  schedule: AmortizationEntry[];
  onReset: () => void;
}

export const AmortizationTable = ({ emi, schedule, onReset }: AmortizationTableProps) => {
  const { selectedCurrency, exchangeRates, setSelectedCurrency } = useCurrency();

  const formatCurrency = (value: number) => {
    const rate = exchangeRates[selectedCurrency] || 1;
    const converted = value * rate;
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(converted);
  };

  return (
    <div className="space-y-4 mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-xl font-bold">Monthly EMI: {selectedCurrency} {formatCurrency(emi)}</h2>
          <div className="mt-2">
            <span className="mr-2">Currency:</span>
            <Select onValueChange={setSelectedCurrency} value={selectedCurrency}>
              <SelectTrigger className="w-24">
                <SelectValue>{selectedCurrency}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.keys(exchangeRates).map(currency => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button 
          onClick={onReset}
          className={cn(
            "bg-white text-purple-600 border border-purple-600 hover:bg-purple-50",
            "dark:bg-gray-800 dark:text-purple-400 dark:border-purple-400 dark:hover:bg-gray-700"
          )}
        >
          RESET TABLE
        </Button>
      </div>

      <div className="border rounded overflow-hidden">
        <h3 className="p-4 font-bold bg-gray-100 dark:bg-gray-800">
          Amortization Schedule ({selectedCurrency})
        </h3>
        <div className="table-container">
          <table>
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th>Month</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Remaining Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((entry) => (
                <tr key={entry.month} className="border-b dark:border-gray-700">
                  <td>{entry.month}</td>
                  <td>{selectedCurrency} {formatCurrency(entry.principal)}</td>
                  <td>{selectedCurrency} {formatCurrency(entry.interest)}</td>
                  <td>{selectedCurrency} {formatCurrency(entry.remainingBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
