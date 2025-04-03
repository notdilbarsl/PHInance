package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sayymeer/feinance-backend/models"
)

func DataHandler(c *gin.Context) {
	ticker := c.Param("ticker")
	days := c.Param("days")

	var tick models.Ticker
	if err := phiDb.Find(&tick, "symbol = ?", ticker).Error; err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "Database error"})
		return
	}

	url := "https://www.screener.in/api/company/" + tick.Code + "/chart/?q=Price-Volume&days=" + days

	// Fetch the URL
	resp, err := http.Get(url)
	if err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "Failed to fetch data"})
		return
	}
	defer resp.Body.Close()

	// Copy the response body directly to the client
	c.DataFromReader(
		resp.StatusCode,
		resp.ContentLength,
		resp.Header.Get("Content-Type"),
		resp.Body,
		nil,
	)
}
