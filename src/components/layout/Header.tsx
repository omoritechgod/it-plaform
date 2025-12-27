import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "../common/Button";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../config/constants";

interface HeaderProps {
  variant?: "public" | "admin" | "intern";
}

export const Header: React.FC<HeaderProps> = ({ variant = "public" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bg, setBg] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME);
  };

  useEffect(() => {
    const scroll = () => {
      if (window.scrollY > 10) {
        setBg(true);
      } else {
        setBg(false);
      }
    };

    window.addEventListener("scroll", scroll);

    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, [bg]);

  const getNavItems = () => {
    switch (variant) {
      case "admin":
        return [
          { label: "Dashboard", href: ROUTES.ADMIN_DASHBOARD },
          { label: "Cohorts", href: ROUTES.ADMIN_COHORTS },
          { label: "Candidates", href: ROUTES.ADMIN_CANDIDATES },
          { label: "Module", href: ROUTES.ADMIN_MODULE },
          { label: "Projects", href: ROUTES.ADMIN_PROJECTS },
          { label: "Wallets", href: ROUTES.ADMIN_WALLETS },
          { label: "Reports", href: ROUTES.ADMIN_REPORTS },
        ];
      case "intern":
        return [
          { label: "Dashboard", href: ROUTES.INTERN_DASHBOARD },
          { label: "Learning", href: ROUTES.INTERN_LEARNING },
          { label: "Projects", href: ROUTES.INTERN_PROJECTS },
          { label: "Wallet", href: ROUTES.INTERN_WALLET },
        ];
      default:
        return [
          { label: "Home", href: ROUTES.HOME },
          { label: "About", href: ROUTES.ABOUT },
          { label: "Jobs", href: ROUTES.JOBS },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <header
      className={`w-full ${
        bg ? "bg-white top-0" : "bg-transparent top-2"
      } shadow-sm fixed left-0 py-4 z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to={variant === "admin" ? ROUTES.ADMIN_DASHBOARD : ROUTES.HOME}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#0f266c] to-[#007bff] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">IP</span>
            </div>
            <span className="text-xl font-bold text-[#007bff]">
              Internship Platform
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className={`hidden md:block ${
              bg ? "bg-transparent" : "bg-white/10"
            } backdrop-blur-md px-6 py-2 rounded-3xl`}
          >
            <ul className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <li key={index} className="group relative">
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`${
                      bg
                        ? "text-gray-800"
                        : isAuthenticated
                        ? "text-gray-800"
                        : "text-white"
                    } text-[16px] hover:text-blue transition-colors duration-200 font-medium`}
                  >
                    {item.label}
                  </Link>
                  <span className="absolute w-0 h-1 left-0 -bottom-1 rounded-md bg-blue group-hover:w-full duration-300 ease-in-out transform -rotate-6"></span>
                </li>
              ))}
            </ul>
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div
                className={`flex items-center space-x-3 ${
                  bg
                    ? "text-gray-800"
                    : isAuthenticated
                    ? "text-gray-800"
                    : "text-white"
                } `}
              >
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span className="text-gray-">{user?.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : variant === "public" ? (
              <div className="flex items-center space-x-3">
                <Link to={ROUTES.LOGIN}>
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to={ROUTES.APPLY}>
                  <Button size="sm">Apply Now</Button>
                </Link>
              </div>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden w-full backdrop-blur-md shadow-2xl bg-white border-t border-gray-200 p-4"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-gray-800 hover:text-[#007bff] transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <User className="w-5 h-5 text-gray-800" />
                    <span className="text-gray-800">{user?.name}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : variant === "public" ? (
                <div className="pt-3 border-t border-gray-200 space-y-2">
                  <Link to={ROUTES.LOGIN} className="block">
                    <Button variant="outline" size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to={ROUTES.APPLY} className="block">
                    <Button size="sm" className="w-full">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};
