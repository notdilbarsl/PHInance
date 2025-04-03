package controllers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sayymeer/feinance-backend/models"
	"gorm.io/gorm"
)

type response struct {
	Name          string  `json:"name"`
	Ticker        string  `json:"ticker"`
	IsWatchlisted bool    `json:"is_watchlisted"`
	CurrentPrice  float32 `json:"curr_price"`
	Code          string  `json:"code"`
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
			Code:          ticker.Code,
		})
	}

	c.JSON(http.StatusOK, res)
}

func WatchlistHandler(c *gin.Context) {
	userID, _ := c.Get("user_id")
	ticker := c.Param("ticker")

	var watchlistEntry models.Watchlist

	// Check if the ticker is already in the user's watchlist
	err := phiDb.Where("user_id = ? AND ticker = ?", userID, ticker).First(&watchlistEntry).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		// If not found, add it to the watchlist
		newEntry := models.Watchlist{
			UserID: userID.(uint), // Ensure correct type
			Ticker: ticker,
		}

		if err := phiDb.Create(&newEntry).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add to watchlist"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Ticker added to watchlist"})
		return
	} else if err != nil {
		// Handle any other database errors
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	// If ticker already exists, delete it from the watchlist
	if err := phiDb.Delete(&watchlistEntry).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove from watchlist"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Ticker removed from watchlist"})
}
