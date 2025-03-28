package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sayymeer/feinance-backend/models"
	"github.com/sayymeer/feinance-backend/utils"
)

type response struct {
	Name          string  `json:"name"`
	Ticker        string  `json:"ticker"`
	IsWatchlisted bool    `json:"is_watchlisted"`
	CurrentPrice  float32 `json:"curr_price"`
}

func DashboardHandler(c *gin.Context) {
	var res []response
	user_id, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusForbidden, gin.H{"error": "User not authorized"})
		return
	}

	// Fetch watchlist for the user
	var watchlist []models.Watchlist
	if err := phiDb.Find(&watchlist, "user_id = ?", user_id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch watchlist"})
		return
	}

	// Fetch all tickers
	var tickers []models.Ticker
	if err := phiDb.Find(&tickers).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch tickers"})
		return
	}

	// Populate response
	tickerMap := make(map[string]bool)
	for _, watchl := range watchlist {
		tickerMap[watchl.Ticker] = true
	}

	for _, ticker := range tickers {
		res = append(res, response{
			Name:          ticker.Name,
			Ticker:        ticker.Symbol,
			IsWatchlisted: tickerMap[ticker.Symbol], // Check if in watchlist
			CurrentPrice:  utils.CurrentPrice(ticker.Code),
		})
	}

	c.JSON(http.StatusOK, res)
}
