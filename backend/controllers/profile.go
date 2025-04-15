package controllers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sayymeer/feinance-backend/models"
	"gorm.io/gorm"
)

func ProfileHandler(c *gin.Context) {
	user_id, ok := c.Get("user_id")
	if !ok {
		c.JSON(http.StatusForbidden, gin.H{ERROR: "Not Authorised"})
		return
	}
	var user models.User
	if tx := phiDb.First(&user, "id=?", user_id); tx.Error != nil {
		c.JSON(http.StatusBadGateway, gin.H{ERROR: "Error"})
		return
	}
	var stocks []models.PortfolioStock
	err := phiDb.Find(&stocks, "user_id = ?", user.ID).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{ERROR: "error getting portfolio"})
		return
	}

	var transactions []models.TransactionResponse
	err = phiDb.Table("transactions").
		Select("type, price * quantity AS amount, ticker_id AS ticker, quantity, created_at AS date").
		Where("user_id = ?", user.ID).
		Find(&transactions).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "error getting transactions"})
		return
	}

	// Format Date to `YYYY-MM-DD HH:MM:SS`
	for i := range transactions {
		parsedTime, _ := time.Parse(time.RFC3339, transactions[i].Date)
		transactions[i].Date = parsedTime.Format("2006-01-02")
	}
	var profileRes models.ProfileRespone
	profileRes.Id = int(user.ID)
	profileRes.Name = user.Name
	profileRes.Email = user.Email
	profileRes.Balance = user.Balance
	profileRes.Phone = user.Phone
	profileRes.Transactions = transactions
	profileRes.Stocks = stocks

	c.JSON(http.StatusOK, profileRes)
	return
}

type BalanceReq struct {
	Add float64 `json:"add"`
}

func AddBalanceHandler(c *gin.Context) {
	userIDInterface, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in context"})
		return
	}

	var req BalanceReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	var user models.User
	if err := phiDb.First(&user, userIDInterface).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user"})
		}
		return
	}

	user.Balance += float32(req.Add)

	if err := phiDb.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update balance"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Balance updated successfully",
		"balance": user.Balance,
	})
}
