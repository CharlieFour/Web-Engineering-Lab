import CoinCard from '../components/CoinCard';
import { useCrypto } from '../context/CryptoContext';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const { state } = useCrypto();
  const coins = Object.entries(state.coinPrices).map(([symbol, price]) => ({
    symbol,
    price,
  }));

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Welcome to Demo Crypto Exchange
        </h1>
        <p className="text-gray-400 mt-2">Trade cryptocurrencies with ease and style</p>
      </div>

      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h2 className="text-2xl font-semibold">Available Coins</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coins.map(coin => (
            <CoinCard key={coin.symbol} symbol={coin.symbol} price={coin.price} />
          ))}
        </div>
      </div>
    </div>
  );
}