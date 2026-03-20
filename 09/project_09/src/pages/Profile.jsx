import { useCrypto } from '../context/CryptoContext';
import PortfolioCard from '../components/PortfolioCard';
import TransactionList from '../components/TransactionList';
import { Wallet } from 'lucide-react';

export default function Profile() {
  const { state } = useCrypto();

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <Wallet className="w-6 h-6 text-purple-400" />
        </div>
        <h2 className="text-2xl font-bold">Profile Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="glass-card p-6 mb-6">
            <h3 className="text-xl font-bold mb-2">Cash Balance</h3>
            <p className="text-3xl font-bold font-mono text-green-400">${state.balance.toFixed(2)}</p>
            <div className="mt-2 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse-slow" style={{ width: `${(state.balance / 10000) * 100}%` }} />
            </div>
          </div>
          <PortfolioCard />
        </div>
        <div>
          <TransactionList />
        </div>
      </div>
    </div>
  );
}