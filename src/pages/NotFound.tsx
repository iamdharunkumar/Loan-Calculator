
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="text-6xl font-black text-primary/80">404</div>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <Button asChild size="lg" className="font-medium">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
