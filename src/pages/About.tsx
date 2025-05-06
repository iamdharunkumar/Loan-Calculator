
import { Header } from "@/components/Header";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About This App</h1>
        
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p>
              This Loan Calculator App is a modern, single-page web application built using React and Tailwind CSS. 
              It allows users to calculate loan EMIs (Equated Monthly Installments), view a detailed amortization 
              schedule, and see real-time currency conversions of their EMI using exchange rates.
            </p>
          </section>
          
          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">Features</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Loan EMI calculation using standard financial formulas</li>
              <li>Dynamic amortization schedule table with monthly breakdown</li>
              <li>Real-time currency conversion of EMI using exchange rates</li>
              <li>Paginated exchange rate table</li>
              <li>Dark/Light mode toggle for a customizable experience</li>
              <li>Collapsible header navigation on mobile screens</li>
              <li>Fully responsive UI built with Tailwind CSS</li>
            </ul>
          </section>
          
          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">Technologies Used</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>React (Hooks, Routing, Context API)</li>
              <li>Tailwind CSS for styling and responsive components</li>
              <li>Axios for API calls</li>
              <li>Exchange Rate API for currency conversion</li>
            </ul>
          </section>
          
          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">EMI Formula Used</h2>
            <p>
              The EMI (Equated Monthly Installment) is calculated using the standard formula:
            </p>
            <code className="block bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
            </code>
            <ul className="list-disc pl-5 space-y-1">
              <li>P = Principal loan amount</li>
              <li>R = Monthly interest rate (annual rate / 12 / 100)</li>
              <li>N = Loan duration in months</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default About;
