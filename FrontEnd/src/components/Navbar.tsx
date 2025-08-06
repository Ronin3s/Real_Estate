import { Building, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Navbar() {
  const location = useLocation();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/#how-it-works", isAnchor: true },
    { name: "Compare", path: "/compare" },
    { name: "Smart Deals", path: "/deals" },
    { name: "ROI", path: "/roi" },
    { name: "Classifier", path: "/classifier" },
    { name: "Chat", path: "/chatbot" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 border-b transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#0e0c1f] via-[#1c1038] to-[#110824] border-white/10"
          : "bg-white shadow-md border-gray-200 text-gray-900"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Building className="h-6 w-6 text-[#8e6fff]" />
          <span className="font-bold text-xl">PropertyPredict</span>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 hidden md:flex mx-20">
          <nav className="flex-1 mx-8">
          <ul className="grid grid-cols-7 h-16">
            {navLinks.map(({ name, path, isAnchor }) => {
              const active = isActive(path);
              return isAnchor ? (
                <a
                  key={path}
                  href={path}
                  className={`relative flex items-center justify-center h-full text-sm font-medium transition-colors ${
                    theme === "dark"
                      ? "text-white/80 hover:text-white"
                      : "text-gray-700 hover:text-black"
                  } group`}
                >
                  {name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-[3px] bg-purple-400 transition-all duration-300 group-hover:w-20 group-hover:left-[calc(50%-40px)]"></span>
                </a>
              ) : (
                <Link
                  key={path}
                  to={path}
                  className={`relative flex items-center justify-center h-full text-sm font-medium transition-all duration-200 group ${
                    active
                      ? theme === "dark"
                        ? "bg-purple-600/30 text-white"
                        : "bg-purple-100 text-black"
                      : theme === "dark"
                      ? "text-white/80 hover:text-white"
                      : "text-gray-700 hover:text-black"
                  }`}
                >
                  {name}
                  {/* Hover underline */}
                  <span className="absolute bottom-0 left-1/2 w-0 h-[3px] bg-purple-400 transition-all duration-300 group-hover:w-20 group-hover:left-[calc(50%-40px)]"></span>

                  {/* Active underline */}
                  {active && (
                    <motion.div
                      layoutId="underline"
                      className={`absolute bottom-0 left-0 right-0 h-[3px] ${
                        theme === "dark" ? "bg-purple-400" : "bg-purple-600"
                      }`}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </ul>
        </nav>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={`transition ${
              theme === "dark"
                ? "text-white hover:bg-white/10"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          <a href="#prediction-form">
            <Button className="bg-[#8e6fff] hover:bg-[#a794ff] text-white font-semibold shadow">
              Get Started
            </Button>
          </a>

          <Link
            to="/dashboard"
            className={`rounded-lg shadow px-4 py-2 border transition ${
              theme === "dark"
                ? "text-white border-[#8e6fff] hover:bg-purple-700"
                : "text-gray-800 border-purple-500 hover:bg-purple-100"
            }`}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}
