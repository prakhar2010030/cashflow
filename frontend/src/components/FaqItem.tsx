import { ChevronDown } from "lucide-react";
import { useState } from "react";
function FaqItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="border-b border-gray-200 py-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center w-full text-left font-medium text-lg"
        >
          <span>{question}</span>
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-300 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>
        {isOpen && (
          <div className="mt-3 text-gray-600">
            <p>{answer}</p>
          </div>
        )}
      </div>
    );
  }

  export default FaqItem;