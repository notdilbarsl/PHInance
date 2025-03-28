package controllers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sayymeer/feinance-backend/models"
	"github.com/sayymeer/feinance-backend/utils"
)

// BehaviourHandler calculates last 7 days' investments and sector allocations
func BehaviourHandler(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		c.JSON(http.StatusForbidden, gin.H{"error": "Not Authorized"})
		return
	}

	// Fetch user
	var user models.User
	if err := phiDb.First(&user, "id = ?", userID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User not found"})
		return
	}

	// Initialize response data
	investments := make(map[string]float32)
	holdings := make(map[string]float32)
	sectorAllocation := make(map[string]float32)

	// Get last 7 days' investment
	for i := 0; i < 7; i++ {
		date := time.Now().AddDate(0, 0, -i).Format("2006-01-02")
		var dailyInvestment float32

		err := phiDb.Table("transactions").
			Select("COALESCE(SUM(price * quantity), 0)").
			Where("user_id = ? AND type = 'BUY' AND DATE(created_at) = ?", user.ID, date).
			Scan(&dailyInvestment).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching investments"})
			return
		}
		investments[date] = dailyInvestment
	}

	// Get current holdings
	var stocks []models.PortfolioStock
	if err := phiDb.Find(&stocks, "user_id = ?", user.ID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching holdings"})
		return
	}

	var totalHoldingValue float32
	tickerPrices := make(map[string]float32) // Cache prices to avoid redundant API calls

	for _, stock := range stocks {
		var price float32
		if val, exists := tickerPrices[stock.TickerID]; exists {
			price = val
		} else {
			ticker := models.Ticker{Symbol: stock.TickerID}
			price = utils.CurrentPrice(ticker.Code)
			tickerPrices[stock.TickerID] = price
		}

		value := price * float32(stock.Quantity)
		holdings[stock.TickerID] = value
		totalHoldingValue += value

		// Fetch sector for allocation
		var ticker models.Ticker
		if err := phiDb.First(&ticker, "symbol = ?", stock.TickerID).Error; err == nil {
			sectorAllocation[ticker.Industry] += value
		}
	}

	// Calculate sector percentages
	for sector, value := range sectorAllocation {
		sectorAllocation[sector] = (value / totalHoldingValue) * 100
	}

	// Construct response
	response := gin.H{
		"investments": investments,      // Last 7 days investments
		"holdings":    holdings,         // Current stock holdings
		"sectors":     sectorAllocation, // Sector-wise percentage
	}

	c.JSON(http.StatusOK, response)
}
