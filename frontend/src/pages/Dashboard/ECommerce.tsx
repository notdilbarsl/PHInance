import React, { useEffect, useState } from 'react';
import TableOne from '../../components/Tables/TableOne';
import TableTwo from '../../components/Tables/TableTwo';
import { API_BASE_URL } from '../../config';

interface StockData {
  name: string;
  ticker: string;
  curr_price: number;
  is_watchlisted: boolean;
  code: string;
}

const ECommerce: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [watchlistStocks, setWatchlistStocks] = useState<StockData[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = "/auth/signin";
      return;
    }

    const fetchprice = async (ticker: string): Promise<number> => {
      try {
        const response = await fetch(`https://yfinance-bcyb.onrender.com/price/${ticker}`);
        const price = await response.json();
        return typeof price === "number" ? parseFloat(price.toFixed(2)) : 0;
      } catch (error) {
        return 145.8;
      }
    };

    const fetchAllStocks = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/user/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const stockData: StockData[] = await res.json();
        const enriched = await Promise.all(
          stockData.map(async (stock) => ({
            ...stock,
            curr_price: await fetchprice(stock.ticker)
          }))
        );

        setStocks(enriched);
        setWatchlistStocks(enriched.filter(s => s.is_watchlisted));
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };

    fetchAllStocks();
  }, []);

  const addToWatchlist = async (ticker: string) => {
    const token = localStorage.getItem("authToken");
    const target = stocks.find(stock => stock.ticker === ticker);
    if (!target || target.is_watchlisted) return; // prevent duplicates

    try {
      const response = await fetch(`${API_BASE_URL}/user/watchlist/${ticker}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ symbol: ticker }),
      });

      if (!response.ok) throw new Error("Add to watchlist failed");

      const updated = stocks.map(stock =>
        stock.ticker === ticker ? { ...stock, is_watchlisted: true } : stock
      );
      setStocks(updated);
      setWatchlistStocks(prev => [...prev, { ...target, is_watchlisted: true }]);
    } catch (error) {
      console.error('Add failed:', error);
    }
  };

  const removeFromWatchlist = async (ticker: string) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(`${API_BASE_URL}/user/watchlist/${ticker}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Remove failed");

      setStocks(prev => prev.map(stock =>
        stock.ticker === ticker ? { ...stock, is_watchlisted: false } : stock
      ));
      setWatchlistStocks(prev => prev.filter(stock => stock.ticker !== ticker));
    } catch (err) {
      console.error('Remove error:', err);
    }
  };

  return (
    <div className="flex gap-20 ml-20 w-full">
      <div className="w-1/2">
        <h2 className="text-xl font-bold mb-4">All Stocks</h2>
        <TableOne stocks={stocks} onAddToWatchlist={addToWatchlist} />
      </div>
      <div className="w-1/2">
        <h2 className="text-xl font-bold mb-4">Your Watchlist</h2>
        <TableTwo watchlistStocks={watchlistStocks} onRemoveFromWatchlist={removeFromWatchlist} />
      </div>
    </div>

  );
};

export default ECommerce;
