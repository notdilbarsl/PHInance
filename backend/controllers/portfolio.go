package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sayymeer/feinance-backend/models"
)

func PortfolioHandler(c *gin.Context) {
	user_id, ok := c.Get("user_id")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{ERROR: "unauthorized"})
		return
	}
	var stocks []models.PortfolioStock
	if tx := phiDb.Find(&stocks, "user_id = ?", user_id); tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{ERROR: "Server Error"})
		return
	}
	var transactions []models.Transaction
	if tx := phiDb.Find(&transactions, "user_id = ?", user_id); tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{ERROR: "Server Error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"transactions": transactions, "stocks": stocks})
	return
}
