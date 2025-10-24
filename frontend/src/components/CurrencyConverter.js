import React, { useState, useEffect } from 'react';

const CurrencyConverter = ({ defaultFrom = 'EUR', defaultTo = 'USD' }) => {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState(defaultFrom);
  const [toCurrency, setToCurrency] = useState(defaultTo);
  const [result, setResult] = useState(null);
  const [currencies, setCurrencies] = useState({});
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (amount > 0) {
      convertCurrency();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, fromCurrency, toCurrency]);

  const fetchCurrencies = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/currencies`);
      const data = await response.json();
      setCurrencies(data.currencies);
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
  };

  const convertCurrency = async () => {
    if (!amount || amount <= 0) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/convert?amount=${amount}&from_currency=${fromCurrency}&to_currency=${toCurrency}`
      );
      const data = await response.json();
      setResult(data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error converting:', error);
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="space-y-6" data-testid="currency-converter">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
        💱 Calculadora de Divisas
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* From Currency */}
        <div className="space-y-3" data-testid="from-currency-section">
          <label className="block text-sm font-semibold text-gray-700">
            Cantidad a convertir
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-3 text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
            placeholder="100"
            min="0"
            data-testid="amount-input"
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full px-4 py-3 text-lg font-semibold border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-white cursor-pointer"
            data-testid="from-currency-select"
          >
            {Object.entries(currencies).map(([code, info]) => (
              <option key={code} value={code}>
                {info.flag} {code} - {info.name}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="hidden md:flex items-center justify-center">
          <button
            onClick={swapCurrencies}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
            title="Intercambiar monedas"
            data-testid="swap-button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
        </div>

        {/* To Currency */}
        <div className="space-y-3" data-testid="to-currency-section">
          <label className="block text-sm font-semibold text-gray-700">
            Resultado de la conversión
          </label>
          <div className="w-full px-4 py-3 text-2xl font-bold bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-xl text-indigo-900">
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <span data-testid="converted-amount">
                {result ? result.to.amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
              </span>
            )}
          </div>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-4 py-3 text-lg font-semibold border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-white cursor-pointer"
            data-testid="to-currency-select"
          >
            {Object.entries(currencies).map(([code, info]) => (
              <option key={code} value={code}>
                {info.flag} {code} - {info.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Swap Button Mobile */}
      <div className="md:hidden flex justify-center">
        <button
          onClick={swapCurrencies}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full shadow-lg font-semibold"
          data-testid="swap-button-mobile"
        >
          🔄 Intercambiar monedas
        </button>
      </div>

      {/* Exchange Rate Info */}
      {result && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 space-y-3" data-testid="exchange-rate-info">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Tasa de cambio:</span>
            <span className="text-xl font-bold text-indigo-900">
              1 {fromCurrency} = {result.rate.toFixed(4)} {toCurrency}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Tasa inversa:</span>
            <span className="text-xl font-bold text-purple-900">
              1 {toCurrency} = {(1 / result.rate).toFixed(4)} {fromCurrency}
            </span>
          </div>
          {lastUpdate && (
            <div className="text-center text-sm text-gray-500 mt-2">
              ⏰ Actualizado: {lastUpdate.toLocaleTimeString('es-ES')}
            </div>
          )}
        </div>
      )}

      {/* Quick Amounts */}
      <div className="border-t border-gray-200 pt-6">
        <p className="text-sm font-semibold text-gray-700 mb-3">Conversiones rápidas:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[10, 50, 100, 500, 1000, 5000].map((quickAmount) => (
            <button
              key={quickAmount}
              onClick={() => setAmount(quickAmount)}
              className="px-4 py-2 bg-white border-2 border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 rounded-lg font-semibold text-gray-700 hover:text-indigo-700 transition"
              data-testid={`quick-amount-${quickAmount}`}
            >
              {quickAmount.toLocaleString()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;