import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigates } from "../../hooks/useNavigates";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import Feature from "../../components/Feature";
import Faq from "../../components/Faq";
import DownloadSection from "../../components/Download";
import Benefits from "../../components/Benefits";
export default function CashFlowLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { navigateTo } = useNavigates();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-gray-800 font-bold text-2xl">CashFlow</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600">
                Features
              </a>
              <a href="#benefits" className="text-gray-600 hover:text-blue-600">
                Benefits
              </a>
              <a href="#download" className="text-gray-600 hover:text-blue-600">
                Download
              </a>
              <button
                onClick={() => navigateTo("/signup")}
                className="bg-gray-800 cursor-pointer text-white px-4 py-2 rounded-lg font-medium"
              >
                Sign Up
              </button>
            </div>

            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-500"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white p-4 shadow-lg">
            <div className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-600 py-2 px-2"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="text-gray-600 hover:text-blue-600 py-2 px-2"
              >
                Benefits
              </a>
              <a
                href="#download"
                className="text-gray-600 hover:text-blue-600 py-2 px-2"
              >
                Download
              </a>
              <button onClick={() => navigateTo("/signup")} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg text-left font-medium">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Feature />

      {/* Benefits Section */}
      <Benefits />

      {/* App Download Section */}
      <DownloadSection />

      {/* FAQ Section */}
      <Faq />

      <Footer />
    </div>
  );
}
