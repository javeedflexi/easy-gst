import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState(18);
  const [includeGst, setIncludeGst] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Show results with animation when amount is entered
  useEffect(() => {
    if (amount) {
      setShowResults(false);
      const timer = setTimeout(() => setShowResults(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShowResults(false);
    }
  }, [amount, gstRate, includeGst]);

  const calculateGst = () => {
    const parsedAmount = parseFloat(amount) || 0;

    if (includeGst) {
      // If amount includes GST, calculate base amount and GST
      const baseAmount = (parsedAmount * 100) / (100 + parseFloat(gstRate));
      const gstAmount = parsedAmount - baseAmount;
      return {
        baseAmount: baseAmount.toFixed(2),
        gstAmount: gstAmount.toFixed(2),
        totalAmount: parsedAmount.toFixed(2)
      };
    } else {
      // If amount excludes GST, calculate GST and total
      const gstAmount = (parsedAmount * parseFloat(gstRate)) / 100;
      const totalAmount = parsedAmount + gstAmount;
      return {
        baseAmount: parsedAmount.toFixed(2),
        gstAmount: gstAmount.toFixed(2),
        totalAmount: totalAmount.toFixed(2)
      };
    }
  };

  const results = amount ? calculateGst() : null;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 text-gray-200">
      {/* Card container with subtle blur effect */}
      <div className="max-w-md w-full relative">
        {/* Background decorative elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-green-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-emerald-500 rounded-full filter blur-3xl opacity-10"></div>

        {/* Card with backdrop blur */}
        <div className="backdrop-blur-sm z-10 relative shadow-2xl rounded-xl overflow-hidden">
          {/* Header with animated gradient */}
          <div className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 animate-gradient-x p-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">Flexi-GST Calculator</h1>
            <p className="text-green-100 mt-2 text-sm">Fast, accurate tax calculations</p>
          </div>

          {/* Main content card */}
          <div className="bg-gray-800 p-6 border-t border-gray-700">
            <div className="space-y-6">
              {/* Amount Input */}
              <div>
                <label className="block text-green-300 text-sm font-medium mb-2">
                  Amount
                </label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-green-400 transition-colors">₹</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-gray-700 pl-7 block w-full rounded-lg border border-gray-600 py-2 px-3 text-white transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-gray-500"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              {/* GST Rate Selector */}
              <div>
                <label className="block text-green-300 text-sm font-medium mb-2">
                  GST Rate (%)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 12, 18, 28].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setGstRate(rate)}
                      className={`rounded-lg py-2 px-4 font-medium transition-all ${parseInt(gstRate) === rate
                        ? 'bg-green-600 text-white shadow-glow-green translate-y-[-1px]'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                        }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>

              {/* GST Inclusion Toggle */}
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeGst}
                    onChange={(e) => setIncludeGst(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-300">Amount includes GST</span>
                </label>
              </div>
            </div>

            {/* Results Section with animation */}
            {results && (
              <div className={`mt-8 overflow-hidden transition-all duration-500 ease-out ${showResults ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'}`}>
                <div className="bg-gray-700 rounded-t-xl overflow-hidden">
                  <div className="grid grid-cols-2 divide-x divide-gray-600">
                    <div className="p-4">
                      <p className="text-xs text-gray-400 uppercase">Base Amount</p>
                      <p className="text-xl font-semibold text-white">₹{results.baseAmount}</p>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-400 uppercase">GST ({gstRate}%)</p>
                      <p className="text-xl font-semibold text-white">₹{results.gstAmount}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-600 p-4 rounded-b-xl">
                  <p className="text-xs text-green-200 uppercase">Total Amount</p>
                  <p className="text-2xl font-bold text-white">₹{results.totalAmount}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-sm text-gray-500 text-center">
        <p>© {new Date().getFullYear()} • Powered By <a href="https://flexifunnels.com" target="_blank">FlexiFunnels.</a> • Build Websites, Funnels & Courses Without Coding... Using AI</p>
      </div>
    </div>
  );
}

export default App;
