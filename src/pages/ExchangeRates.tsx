
import { Header } from "@/components/Header";
import { ExchangeRatesTable } from "@/components/ExchangeRatesTable";
import { Card, CardDescription } from "@/components/ui/card";
import { useCurrency } from "@/contexts/CurrencyContext";

const ExchangeRates = () => {
  const { error } = useCurrency();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <Header />
      <main className="flex-1 p-4 sm:p-6 max-w-5xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Exchange Rates</h1>
          <p className="text-muted-foreground">
            View live exchange rates from around the world
          </p>
        </div>
        
        {error && (
          <Card className="mb-6 border-yellow-500/50 bg-yellow-50 dark:bg-yellow-900/20 shadow-sm">
            <CardDescription className="p-4 text-yellow-800 dark:text-yellow-200">
              {error}
            </CardDescription>
          </Card>
        )}
        
        <ExchangeRatesTable />
      </main>
    </div>
  );
};

export default ExchangeRates;
