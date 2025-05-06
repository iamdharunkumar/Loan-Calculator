
import { Header } from "@/components/Header";
import { LoanForm } from "@/components/LoanForm";
import { AmortizationTable } from "@/components/AmortizationTable";
import { useEmiCalculator } from "@/hooks/useEmiCalculator";

const Index = () => {
  const {
    emiResult,
    calculateEmi,
    resetTable
  } = useEmiCalculator();

  const handleCalculate = () => {
    calculateEmi();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <Header />
      <main className="flex-1 p-4 sm:p-6">
        <div className="mb-6 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-center">Loan Calculator Dashboard</h1>
          <p className="text-muted-foreground text-center">
            Calculate your loan EMI and view detailed amortization schedule
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <LoanForm onCalculate={handleCalculate} />
          {emiResult && (
            <AmortizationTable 
              emi={emiResult.emi} 
              schedule={emiResult.amortizationSchedule} 
              onReset={resetTable}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
