import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';

export default function CoinCard({ symbol, price }) {
  // Mock 24h change for visual appeal
  const change = symbol === 'BTC' ? 2.5 : symbol === 'ETH' ? -1.2 : 5.3;
  const isPositive = change >= 0;

  return (
    <div className="glass-card p-5 transition-all duration-300 hover:scale-105 hover:border-purple-500/50 group">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">{symbol}</h3>
          <p className="text-2xl font-mono mt-2">${price.toLocaleString()}</p>
        </div>
        <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          <span className="text-sm font-medium">{Math.abs(change)}%</span>
        </div>
      </div>
      <div className="mt-4 flex items-center text-xs text-gray-400">
        <TrendingUp className="w-3 h-3 mr-1" />
        <span>24h change</span>
      </div>
    </div>
  );
}