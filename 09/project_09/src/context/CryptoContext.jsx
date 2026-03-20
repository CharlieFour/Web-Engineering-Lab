import React, { createContext, useContext, useReducer, useEffect } from 'react';

const COIN_PRICES = {
  BTC: 50000,
  ETH: 3000,
  SOL: 100,
};

const initialState = {
  balance: 10000,
  portfolio: { BTC: 0, ETH: 0, SOL: 0 },
  transactions: [],
  coinPrices: COIN_PRICES,
};

function cryptoReducer(state, action) {
  switch (action.type) {
    case 'BUY': {
      const { coin, amount, totalCost } = action.payload;
      if (totalCost > state.balance) return state;
      const newBalance = state.balance - totalCost;
      const newPortfolio = {
        ...state.portfolio,
        [coin]: state.portfolio[coin] + amount,
      };
      const newTransaction = {
        id: Date.now(),
        type: 'buy',
        coin,
        amount,
        price: state.coinPrices[coin],
        total: totalCost,
        timestamp: new Date().toISOString(),
      };
      return {
        ...state,
        balance: newBalance,
        portfolio: newPortfolio,
        transactions: [newTransaction, ...state.transactions],
      };
    }
    case 'SELL': {
      const { coin, amount, totalGain } = action.payload;
      if (amount > state.portfolio[coin]) return state;
      const newBalance = state.balance + totalGain;
      const newPortfolio = {
        ...state.portfolio,
        [coin]: state.portfolio[coin] - amount,
      };
      const newTransaction = {
        id: Date.now(),
        type: 'sell',
        coin,
        amount,
        price: state.coinPrices[coin],
        total: totalGain,
        timestamp: new Date().toISOString(),
      };
      return {
        ...state,
        balance: newBalance,
        portfolio: newPortfolio,
        transactions: [newTransaction, ...state.transactions],
      };
    }
    default:
      return state;
  }
}

const CryptoContext = createContext();

export function CryptoProvider({ children }) {
  const [state, dispatch] = useReducer(cryptoReducer, initialState, () => {
    const stored = localStorage.getItem('cryptoData');
    if (stored) {
      return JSON.parse(stored);
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem('cryptoData', JSON.stringify(state));
  }, [state]);

  const buyCoin = (coin, amount) => {
    const price = state.coinPrices[coin];
    const totalCost = amount * price;
    if (totalCost <= state.balance && amount > 0) {
      dispatch({ type: 'BUY', payload: { coin, amount, totalCost } });
      return true;
    }
    return false;
  };

  const sellCoin = (coin, amount) => {
    const price = state.coinPrices[coin];
    const totalGain = amount * price;
    if (amount <= state.portfolio[coin] && amount > 0) {
      dispatch({ type: 'SELL', payload: { coin, amount, totalGain } });
      return true;
    }
    return false;
  };

  return (
    <CryptoContext.Provider value={{ state, buyCoin, sellCoin }}>
      {children}
    </CryptoContext.Provider>
  );
}

export function useCrypto() {
  return useContext(CryptoContext);
}