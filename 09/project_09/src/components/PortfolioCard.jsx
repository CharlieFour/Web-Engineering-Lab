import { useCrypto } from '../context/CryptoContext';
import { TrendingUp, Bitcoin, Coins, Diamond } from 'lucide-react';

const coinIcons = {
  BTC: Bitcoin,
  ETH: Coins,
  SOL: Diamond,
};

export default function PortfolioCard() {
  const { state } = useCrypto();
  const totalValue = Object.entries(state.portfolio).reduce((total, [coin, quantity]) => {
    return total + quantity * state.coinPrices[coin];
  }, 0);

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold">Your Portfolio</h3>
        <div className="flex items-center space-x-1 text-green-400">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">+12.3%</span>
        </div>
      </div>
      <p className="text-3xl font-bold font-mono mb-6">${totalValue.toFixed(2)}</p>
      <div className="space-y-3">
        {Object.entries(state.portfolio).map(([coin, quantity]) => {
          const Icon = coinIcons[coin] || Bitcoin;
          const value = quantity * state.coinPrices[coin];
          const percentage = totalValue > 0 ? (value / totalValue) * 100 : 0;
          return (
            <div key={coin} className="relative">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center space-x-2">
                  <Icon className="w-5 h-5 text-purple-400" />
                  <span className="font-medium">{coin}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono">${value.toFixed(2)}</span>
                  <span className="text-xs text-gray-400 ml-2">({percentage.toFixed(1)}%)</span>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{quantity} coins</span>
                <span>${state.coinPrices[coin].toLocaleString()}/coin</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}