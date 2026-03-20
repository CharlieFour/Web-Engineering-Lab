import { useState } from 'react';
import { useCrypto } from '../context/CryptoContext';
import { ArrowRightCircle, AlertCircle, CheckCircle } from 'lucide-react';

export default function TradeForm() {
  const { state, buyCoin, sellCoin } = useCrypto();
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [tradeType, setTradeType] = useState('buy');
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleTrade = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setMessage({ text: 'Please enter a valid positive amount.', type: 'error' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      return;
    }

    const price = state.coinPrices[selectedCoin];
    if (tradeType === 'buy') {
      const totalCost = numAmount * price;
      if (totalCost > state.balance) {
        setMessage({ text: `Insufficient balance. Need $${totalCost.toFixed(2)}`, type: 'error' });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        return;
      }
      const success = buyCoin(selectedCoin, numAmount);
      if (success) {
        setMessage({ text: `Bought ${numAmount} ${selectedCoin} for $${totalCost.toFixed(2)}`, type: 'success' });
        setAmount('');
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      } else {
        setMessage({ text: 'Buy failed.', type: 'error' });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      }
    } else {
      const owned = state.portfolio[selectedCoin];
      if (numAmount > owned) {
        setMessage({ text: `You only have ${owned} ${selectedCoin} to sell.`, type: 'error' });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        return;
      }
      const success = sellCoin(selectedCoin, numAmount);
      if (success) {
        setMessage({ text: `Sold ${numAmount} ${selectedCoin} for $${(numAmount * price).toFixed(2)}`, type: 'success' });
        setAmount('');
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      } else {
        setMessage({ text: 'Sell failed.', type: 'error' });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      }
    }
  };

  const totalCost = amount && !isNaN(parseFloat(amount)) ? parseFloat(amount) * state.coinPrices[selectedCoin] : 0;

  return (
    <div className="glass-card p-6">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Execute Trade
      </h2>
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-300">
          <span>Available Balance</span>
          <span className="font-mono font-bold text-white">${state.balance.toFixed(2)}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(state.balance / 10000) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Select Coin</label>
          <div className="flex space-x-2">
            {Object.keys(state.coinPrices).map(coin => (
              <button
                key={coin}
                onClick={() => setSelectedCoin(coin)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedCoin === coin
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {coin}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="0.00"
            min="0"
            step="any"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Trade Type</label>
          <div className="flex space-x-4">
            <button
              onClick={() => setTradeType('buy')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                tradeType === 'buy'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setTradeType('sell')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                tradeType === 'sell'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Sell
            </button>
          </div>
        </div>

        {amount && parseFloat(amount) > 0 && (
          <div className="glass p-4 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>Price per coin</span>
              <span className="font-mono">${state.coinPrices[selectedCoin].toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Total {tradeType === 'buy' ? 'Cost' : 'Gain'}</span>
              <span className="text-purple-400">${totalCost.toFixed(2)}</span>
            </div>
          </div>
        )}

        <button
          onClick={handleTrade}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold transition-all hover:opacity-90 hover:scale-[1.02] flex items-center justify-center space-x-2"
        >
          <span>{tradeType === 'buy' ? 'Buy Now' : 'Sell Now'}</span>
          <ArrowRightCircle className="w-5 h-5" />
        </button>

        {message.text && (
          <div
            className={`flex items-center space-x-2 p-3 rounded-lg animate-fade-in ${
              message.type === 'error'
                ? 'bg-red-500/20 border border-red-500/50 text-red-200'
                : 'bg-green-500/20 border border-green-500/50 text-green-200'
            }`}
          >
            {message.type === 'error' ? (
              <AlertCircle className="w-5 h-5" />
            ) : (
              <CheckCircle className="w-5 h-5" />
            )}
            <span>{message.text}</span>
          </div>
        )}
      </div>
    </div>
  );
}