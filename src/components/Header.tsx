
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { name: "HOME", path: "/" },
    { name: "EXCHANGE RATES (LIVE)", path: "/exchange-rates" },
    { name: "ABOUT", path: "/about" },
    { name: "ERROR PAGE", path: "/error-demo" }
  ];

  return (
    <header className={cn(
      "bg-loan-blue text-white py-4 px-6 flex flex-col md:flex-row justify-between items-center relative",
    )}>
      <div className="flex w-full md:w-auto justify-between items-center">
        <Link to="/" className="font-bold text-lg">
          Loan Calculator
        </Link>
        {isMobile && (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            ☰
          </button>
        )}
      </div>

      <nav className={cn(
        "flex md:flex-row flex-col w-full md:w-auto",
        isMobile ? isMenuOpen ? "block" : "hidden" : "flex"
      )}>
        <ul className="flex md:flex-row flex-col md:space-x-6 space-y-2 md:space-y-0 mt-4 md:mt-0">
          {links.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path}
                className="text-white hover:text-blue-200 transition-colors duration-200"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="ml-0 md:ml-6 mt-4 md:mt-0 flex items-center gap-2">
          <span className="text-sm">{isDark ? "Dark" : "Light"}</span>
          <Switch 
            checked={isDark}
            onCheckedChange={toggleTheme}
            className="data-[state=checked]:bg-blue-400"
            aria-label="Toggle theme"
          />
        </div>
      </nav>
    </header>
  );
};
