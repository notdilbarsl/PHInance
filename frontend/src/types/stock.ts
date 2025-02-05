/*export type STOCK = {
    name: string;         // Stock name (e.g., Zomato, SBI, Tata Steel)
    quantity: number;     // Number of shares
    avgPrice: number;     // Average buy price per share
    marketPrice: number;  // Current market price per share
    dayChange: number;    // Change in price for the day
    dayChangePct: string; // Percentage change in price for the day
    returns: number;      // Profit or loss amount
    returnsPct: string;   // Percentage of profit/loss
    currentValue: number; // Total current value of holdings
    previousValue: number;// Total value before today's change
    graphUrl: string;     // URL or path to stock trend graph
  };
  */
  
  // Define Stock Data Type
export type StockHistory = {
  date: string;
  qty: number;
  rate: number;
  amount: number;
};

export type STOCK= {
  name: string;
  quantity: number;
  avgPrice: number;
  marketPrice: number;
  returns: number;
  returnsPct: string;
  currentValue: number;
  graphUrl: string;
  history: StockHistory[];
};