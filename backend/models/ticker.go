package models

type Ticker struct {
	Symbol   string `json:"symbol"   gorm:"primaryKey"`
	Name     string `json:"name"`
	Industry string `json:"industry"`
	Code     string `json:"code"`
}

func GetNiftyFifty() []Ticker {
	niftyFifty := []Ticker{
		{"RELIANCE", "Reliance Industries Limited", "Energy", "2726"},
		{"HDFCBANK", "HDFC Bank Limited", "Banking", "1298"},
		{"TCS", "Tata Consultancy Services Limited", "IT", "3365"},
		{"BHARTIARTL", "Bharti Airtel Limited", "Telecom", "467"},
		{"ICICIBANK", "ICICI Bank Limited", "Banking", "1384"},
		{"SBIN", "State Bank of India", "Banking", "3188"},
		{"INFY", "Infosys Limited", "IT", "1489"},
		{"BAJFINANCE", "Bajaj Finance Limited", "Finance", "372"},
		{"HINDUNILVR", "Hindustan Unilever Limited", "FMCG", "1350"},
		{"ITC", "ITC Limited", "FMCG", "1552"},
		{"KOTAKBANK", "Kotak Mahindra Bank Limited", "Banking", "1818"},
		{"LT", "Larsen & Toubro Limited", "Infrastructure", "1870"},
		{"HCLTECH", "HCL Technologies Limited", "IT", "1297"},
		{"MARUTI", "Maruti Suzuki India Limited", "Automobile", "2023"},
		{"SUNPHARMA", "Sun Pharmaceutical Industries Ltd.", "Pharmaceutical", "3245"},
		{"ASIANPAINT", "Asian Paints Limited", "Paints", "295"},
		{"AXISBANK", "Axis Bank Limited", "Banking", "348"},
		{"TITAN", "Titan Company Limited", "Consumer Goods", "3437"},
		{"ULTRACEMCO", "UltraTech Cement Limited", "Cement", "3525"},
		{"WIPRO", "Wipro Limited", "IT", "3763"},
		{"NESTLEIND", "Nestlé India Limited", "FMCG", "2236"},
		{"M&M", "Mahindra & Mahindra Limited", "Automobile", "1973"},
		{"TATAMOTORS", "Tata Motors Limited", "Automobile", "3370"},
		{"HDFCLIFE", "HDFC Life Insurance Company Limited", "Insurance", "1274197"},
		{"DRREDDY", "Dr. Reddy's Laboratories Limited", "Pharmaceutical", "852"},
		{"ADANIGREEN", "Adani Green Energy Limited", "Energy", "1274366"},
		{"POWERGRID", "Power Grid Corporation of India Ltd.", "Power", "2523"},
		{"NTPC", "NTPC Limited", "Power", "2303"},
		{"JSWSTEEL", "JSW Steel Limited", "Steel", "1657"},
		{"TECHM", "Tech Mahindra Limited", "IT", "100068"},
		{"ADANIPORTS", "Adani Ports and Special Economic Zone", "Infrastructure", "57"},
		{"BAJAJFINSV", "Bajaj Finserv Limited", "Finance", "373"},
		{"INDUSINDBK", "IndusInd Bank Limited", "Banking", "1480"},
		{"HINDALCO", "Hindalco Industries Limited", "Metals", "1328"},
		{"TATASTEEL", "Tata Steel Limited", "Steel", "3373"},
		{"SBILIFE", "SBI Life Insurance Company Limited", "Insurance", "1274150"},
		{"EICHERMOT", "Eicher Motors Limited", "Automobile", "888"},
		{"DIVISLAB", "Divi's Laboratories Limited", "Pharmaceutical", "837"},
		{"ONGC", "Oil & Natural Gas Corporation Ltd.", "Energy", "2320"},
	}
	return niftyFifty
}
