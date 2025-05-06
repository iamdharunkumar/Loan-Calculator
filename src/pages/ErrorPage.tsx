
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h1 className="text-5xl font-bold text-red-500 mb-4">Error!</h1>
          <h2 className="text-2xl font-semibold mb-6">Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The operation could not be completed. Please try again later or contact support if the problem persists.
          </p>
          <div className="space-y-4">
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;
