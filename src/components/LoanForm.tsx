
import { useEmiCalculator } from "@/hooks/useEmiCalculator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoanFormProps {
  onCalculate: () => void;
}

export const LoanForm = ({ onCalculate }: LoanFormProps) => {
  const {
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    loanTerm,
    setLoanTerm,
    calculateEmi
  } = useEmiCalculator();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateEmi();
    onCalculate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="loanAmount" className="block text-sm mb-1">
            Loan Amount
          </Label>
          <Input
            id="loanAmount"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            min="1"
            required
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="interestRate" className="block text-sm mb-1">
            Interest Rate (%)
          </Label>
          <Input
            id="interestRate"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            min="0.01"
            step="0.01"
            required
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="loanTerm" className="block text-sm mb-1">
            Term (Years)
          </Label>
          <Input
            id="loanTerm"
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            min="1"
            required
            className="w-full"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button 
          type="submit"
          className="bg-loan-blue hover:bg-blue-700 text-white uppercase"
        >
          Calculate
        </Button>
      </div>
    </form>
  );
};
