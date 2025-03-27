package controllers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sayymeer/feinance-backend/models"
)

type transactRequest struct {
	CurrPrice float32 `json:"curr_price" binding:"required,gt=0"`
	Quantity  int     `json:"quantity"   binding:"required,gt=0"`
	Symbol    string  `json:"ticker"     binding:"required"`
	Type      string  `json:"type"       binding:"required,oneof=BUY SELL"` // Only allow "BUY" or "SELL"
}

// TODO: validate transactions
func TransactionHandler(c *gin.Context) {
	var req transactRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{ERROR: "Invalid request: " + err.Error()})
		return
	}

	user_id, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{ERROR: "Unauthorized: User ID missing"})
		return
	}

	var user models.User
	if tx := phiDb.First(&user, "id = ?", user_id); tx.Error != nil {
		c.JSON(http.StatusBadGateway, gin.H{ERROR: "Error"})
		return
	}
	if user.Balance < (float32(req.Quantity) * req.CurrPrice) {
		c.JSON(http.StatusOK, gin.H{ERROR: "Not enough Balance"})
		return
	}
	transaction := models.Transaction{
		UserID:   user.ID,
		TickerID: req.Symbol,
		Type:     req.Type,
		Quantity: req.Quantity,
		Price:    req.CurrPrice,
	}

	user.Balance -= req.CurrPrice * float32(req.Quantity)

	// TODO: Atomicity
	if tx := phiDb.Updates(&user); tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{ERROR: "DB Error"})
		return
	}
	if err := updatePortfolio(user.ID, &transaction); err != nil {
		c.JSON(http.StatusOK, gin.H{ERROR: err.Error()})
		return
	}
	if tx := phiDb.Create(&transaction); tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{ERROR: "DB eror"})
		return
	}

	c.JSON(http.StatusOK, gin.H{MESSAGE: "Transaction successful"})
}

func updatePortfolio(userID uint, transaction *models.Transaction) error {
	var stock models.PortfolioStock
	err := phiDb.Where("user_id = ? AND ticker_id = ?", userID, transaction.TickerID).
		First(&stock).
		Error
	if err != nil {
		if transaction.Type == "BUY" {
			stock = models.PortfolioStock{
				UserID:   userID,
				TickerID: transaction.TickerID,
				AvgPrice: transaction.Price,
				Quantity: transaction.Quantity,
			}
			return phiDb.Create(&stock).Error
		} else {
			return errors.New("cannot sell stock not in portfolio")
		}
	}

	if transaction.Type == "BUY" {
		totalCost := (stock.AvgPrice * float32(stock.Quantity)) + (transaction.Price * float32(transaction.Quantity))
		newQuantity := stock.Quantity + transaction.Quantity
		stock.AvgPrice = totalCost / float32(newQuantity)
		stock.Quantity = newQuantity
	} else if transaction.Type == "SELL" {
		if stock.Quantity < transaction.Quantity {
			return errors.New("not enough quantity to sell")
		}
		stock.Quantity -= transaction.Quantity
		if stock.Quantity == 0 {
			return phiDb.Delete(&stock).Error
		}
	}
	return phiDb.Save(&stock).Error
}
