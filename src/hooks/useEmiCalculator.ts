
import { useState } from 'react';

interface EmiResult {
  emi: number;
  amortizationSchedule: AmortizationEntry[];
}

export interface AmortizationEntry {
  month: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export const useEmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<string>('100000');
  const [interestRate, setInterestRate] = useState<string>('2');
  const [loanTerm, setLoanTerm] = useState<string>('5');
  const [emiResult, setEmiResult] = useState<EmiResult | null>(null);

  const calculateEmi = () => {
    const principal = parseFloat(loanAmount);
    const ratePerMonth = parseFloat(interestRate) / 12 / 100;
    const totalMonths = parseFloat(loanTerm) * 12;

    // EMI formula: [P x R x (1+R)^N] / [(1+R)^N - 1]
    const emi = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, totalMonths)) / 
               (Math.pow(1 + ratePerMonth, totalMonths) - 1);

    // Generate amortization schedule
    const schedule: AmortizationEntry[] = [];
    let remainingBalance = principal;

    for (let month = 1; month <= totalMonths; month++) {
      const interestForMonth = remainingBalance * ratePerMonth;
      const principalForMonth = emi - interestForMonth;
      remainingBalance -= principalForMonth;

      schedule.push({
        month,
        principal: principalForMonth,
        interest: interestForMonth,
        remainingBalance: remainingBalance > 0 ? remainingBalance : 0
      });
    }

    setEmiResult({
      emi,
      amortizationSchedule: schedule
    });
  };

  const resetTable = () => {
    setEmiResult(null);
  };

  return {
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    loanTerm,
    setLoanTerm,
    emiResult,
    calculateEmi,
    resetTable
  };
};
