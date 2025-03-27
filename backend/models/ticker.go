package models

type Ticker struct {
	Name   string `json:"name"`
	Symbol string `json:"symbol" gorm:"primaryKey"`
}

func GetNiftyFifty() []Ticker {
	niftyFifty := []Ticker{
		{"RELIANCE", "Reliance Industries Limited"},
		{"HDFCBANK", "HDFC Bank Limited"},
		{"TCS", "Tata Consultancy Services Limited"},
		{"BHARTIARTL", "Bharti Airtel Limited"},
		{"ICICIBANK", "ICICI Bank Limited"},
		{"SBIN", "State Bank of India"},
		{"INFY", "Infosys Limited"},
		{"BAJFINANCE", "Bajaj Finance Limited"},
		{"HINDUNILVR", "Hindustan Unilever Limited"},
		{"ITC", "ITC Limited"},
		{"KOTAKBANK", "Kotak Mahindra Bank Limited"},
		{"LT", "Larsen & Toubro Limited"},
		{"HCLTECH", "HCL Technologies Limited"},
		{"MARUTI", "Maruti Suzuki India Limited"},
		{"SUNPHARMA", "Sun Pharmaceutical Industries Ltd."},
		{"ASIANPAINT", "Asian Paints Limited"},
		{"AXISBANK", "Axis Bank Limited"},
		{"TITAN", "Titan Company Limited"},
		{"ULTRACEMCO", "UltraTech Cement Limited"},
		{"WIPRO", "Wipro Limited"},
		{"NESTLEIND", "Nestlé India Limited"},
		{"M&M", "Mahindra & Mahindra Limited"},
		{"TATAMOTORS", "Tata Motors Limited"},
		{"HDFCLIFE", "HDFC Life Insurance Company Limited"},
		{"DRREDDY", "Dr. Reddy's Laboratories Limited"},
		{"ADANIGREEN", "Adani Green Energy Limited"},
		{"POWERGRID", "Power Grid Corporation of India Ltd."},
		{"NTPC", "NTPC Limited"},
		{"JSWSTEEL", "JSW Steel Limited"},
		{"TECHM", "Tech Mahindra Limited"},
		{"ADANIPORTS", "Adani Ports and Special Economic Zone"},
		{"BAJAJFINSV", "Bajaj Finserv Limited"},
		{"INDUSINDBK", "IndusInd Bank Limited"},
		{"HINDALCO", "Hindalco Industries Limited"},
		{"GRASIM", "Grasim Industries Limited"},
		{"CIPLA", "Cipla Limited"},
		{"TATASTEEL", "Tata Steel Limited"},
		{"SBILIFE", "SBI Life Insurance Company Limited"},
		{"EICHERMOT", "Eicher Motors Limited"},
		{"DIVISLAB", "Divi's Laboratories Limited"},
		{"COALINDIA", "Coal India Limited"},
		{"BRITANNIA", "Britannia Industries Limited"},
		{"HEROMOTOCO", "Hero MotoCorp Limited"},
		{"APOLLOHOSP", "Apollo Hospitals Enterprise Limited"},
		{"ONGC", "Oil & Natural Gas Corporation Ltd."},
		{"ADANIENT", "Adani Enterprises Limited"},
		{"HDFCAMC", "HDFC Asset Management Company Ltd."},
		{"DABUR", "Dabur India Limited"},
		{"PIDILITIND", "Pidilite Industries Limited"},
		{"SHREECEM", "Shree Cement Limited"},
	}
	return niftyFifty
}

/*

Methods

getPrice()

*/
