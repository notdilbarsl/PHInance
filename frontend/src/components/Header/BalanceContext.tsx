import { createContext, useContext, useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config';

interface BalanceContextType {
  balance: number;
  updateBalance: () => void;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const BalanceProvider = ({ children }: { children: React.ReactNode }) => {
  const [balance, setBalance] = useState<number>(0);

  const fetchBalance = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/user/balance`, {
        method: 'GET',
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setBalance(data);
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <BalanceContext.Provider value={{ balance, updateBalance: fetchBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }
  return context;
};