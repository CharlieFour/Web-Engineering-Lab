import { useCrypto } from '../context/CryptoContext';
import { ArrowUpCircle, ArrowDownCircle, Clock } from 'lucide-react';

export default function TransactionList() {
  const { state } = useCrypto();

  if (state.transactions.length === 0) {
    return (
      <div className="glass-card p-6 text-center">
        <Clock className="w-12 h-12 text-gray-500 mx-auto mb-3" />
        <p className="text-gray-400">No transactions yet.</p>
        <p className="text-sm text-gray-500 mt-1">Start trading to see history.</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold mb-4">Transaction History</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {state.transactions.map(tx => (
          <div
            key={tx.id}
            className={`flex items-center justify-between p-3 rounded-lg transition-all hover:bg-white/5 ${
              tx.type === 'buy' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
            }`}
          >
            <div className="flex items-center space-x-3">
              {tx.type === 'buy' ? (
                <ArrowUpCircle className="w-5 h-5 text-green-400" />
              ) : (
                <ArrowDownCircle className="w-5 h-5 text-red-400" />
              )}
              <div>
                <p className="font-medium capitalize">{tx.type}</p>
                <p className="text-xs text-gray-400">
                  {new Date(tx.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono">
                {tx.amount} {tx.coin} @ ${tx.price.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">Total: ${tx.total.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}