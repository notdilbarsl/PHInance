package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sayymeer/feinance-backend/models"
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
		Select("type, price * quantity AS amount, ticker_id AS ticker, quantity").
		Where("user_id = ?", user.ID).
		Find(&transactions).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{ERROR: "error getting tranactions"})
		return
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
