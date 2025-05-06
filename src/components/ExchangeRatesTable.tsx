
import { useState } from "react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ITEMS_PER_PAGE = 10;

export const ExchangeRatesTable = () => {
  const { exchangeRates, selectedCurrency, setSelectedCurrency, loading } = useCurrency();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRates = Object.entries(exchangeRates)
    .filter(([currency]) => 
      currency.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalPages = Math.ceil(filteredRates.length / ITEMS_PER_PAGE);
  const paginatedRates = filteredRates.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Card className="shadow-lg border-opacity-50">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <CardTitle className="text-2xl font-bold">Live Exchange Rates</CardTitle>
            <p className="text-gray-600 dark:text-gray-400 flex items-center mt-2">
              <span>Base Currency:</span>
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger className="w-28 ml-2 h-9">
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
            </p>
          </div>
          
          <div>
            <div className="relative">
              <Input
                id="search"
                type="text"
                placeholder="Search currency..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-60 pr-10"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="rounded-md overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Currency</TableHead>
                    <TableHead className="font-semibold">Exchange Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRates.map(([currency, rate]) => (
                    <TableRow key={currency} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">{currency}</TableCell>
                      <TableCell>{typeof rate === 'number' ? rate.toFixed(4) : rate}</TableCell>
                    </TableRow>
                  ))}
                  {paginatedRates.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center py-10">
                        No currencies found matching your search
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
            Showing {filteredRates.length > 0 ? `${(page - 1) * ITEMS_PER_PAGE + 1} to ${Math.min(page * ITEMS_PER_PAGE, filteredRates.length)} of ${filteredRates.length}` : '0'} currencies
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
              variant="outline"
              size="sm"
              className="px-3 py-1 h-9"
            >
              Previous
            </Button>
            <Button
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages || totalPages === 0}
              variant="outline"
              size="sm"
              className="px-3 py-1 h-9"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
