import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const HistoricalChart = ({ from = 'EUR', to = 'USD' }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    fetchHistoricalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, days]);

  const fetchHistoricalData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/historical/${from}/${to}?days=${days}`
      );
      const result = await response.json();
      setData(result.historical);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="historical-chart">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Historial {from} → {to}
          </h3>
          <p className="text-gray-600 text-sm">Evolución de la tasa de cambio</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setDays(7)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              days === 7
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            data-testid="period-7-days"
          >
            7 días
          </button>
          <button
            onClick={() => setDays(30)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              days === 30
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            data-testid="period-30-days"
          >
            30 días
          </button>
          <button
            onClick={() => setDays(90)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              days === 90
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            data-testid="period-90-days"
          >
            90 días
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '2px solid #6366f1',
              borderRadius: '8px',
              padding: '10px'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="rate" 
            stroke="#6366f1" 
            strokeWidth={3}
            dot={{ fill: '#6366f1', r: 4 }}
            activeDot={{ r: 6 }}
            name={`Tasa ${from}/${to}`}
          />
        </LineChart>
      </ResponsiveContainer>

      {data.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Máximo</p>
            <p className="text-xl font-bold text-green-700">
              {Math.max(...data.map(d => d.rate)).toFixed(4)}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Mínimo</p>
            <p className="text-xl font-bold text-red-700">
              {Math.min(...data.map(d => d.rate)).toFixed(4)}
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Promedio</p>
            <p className="text-xl font-bold text-blue-700">
              {(data.reduce((sum, d) => sum + d.rate, 0) / data.length).toFixed(4)}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Actual</p>
            <p className="text-xl font-bold text-purple-700">
              {data[data.length - 1].rate.toFixed(4)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricalChart;