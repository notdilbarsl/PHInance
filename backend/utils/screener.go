package utils

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"strconv"
)

type PriceResponse struct {
	Datasets []struct {
		Metric string     `json:"metric"`
		Label  string     `json:"label"`
		Values [][]string `json:"values"` // [["date", "price"]]
		Meta   struct {
			IsWeekly bool `json:"is_weekly"`
		} `json:"meta"`
	} `json:"datasets"`
}

// CurrentPrice fetches the latest price for the given stock code
func CurrentPrice(code string) float32 {
	url := "https://www.screener.in/api/company/" + code + "/chart/?q=Price&days=365&consolidated=true"
	resp, err := http.Get(url)
	if err != nil {
		return 0
	}
	defer resp.Body.Close()

	// Read response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return 0
	}

	// Parse JSON response
	var data PriceResponse
	if err := json.Unmarshal(body, &data); err != nil {
		return 0
	}
	f64, _ := strconv.ParseFloat(data.Datasets[0].Values[0][1], 32)
	return float32(f64)
}
