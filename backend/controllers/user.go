package controllers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sayymeer/feinance-backend/models"
	"github.com/sayymeer/feinance-backend/utils"
	"gorm.io/gorm"
)

func UserSignUp(c *gin.Context) {
	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{ERROR: err.Error()})
		return
	}

	if len(user.Email) == 0 || len(user.Password) == 0 {
		c.JSON(http.StatusOK, gin.H{ERROR: "Email and password must not be null"})
		return
	}
	user.Balance = 25000
	if err := phiDb.Create(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrDuplicatedKey) {
			c.JSON(http.StatusOK, gin.H{MESSAGE: "email id already exists"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{ERROR: "Failed to create user"})
		return
	}
	c.JSON(http.StatusOK, gin.H{MESSAGE: "User created successfully!"})
}

func UserLogin(c *gin.Context) {
	var user, userRes models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{ERROR: err.Error()})
		return
	}

	result := phiDb.First(&userRes, "email = ?", user.Email)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusOK, gin.H{MESSAGE: "Email not found"})
		return
	}
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{ERROR: result.Error.Error()})
		return
	}

	// If password is wrong
	if !utils.CheckPassword(user.Password, userRes.Password) {
		c.JSON(http.StatusOK, gin.H{MESSAGE: "Wrong Password"})
		return
	}
	if token, err := GenerateJWT(userRes.ID); err == nil {
		c.JSON(http.StatusOK, gin.H{MESSAGE: "authenticated", "token": token, "name": userRes.Name})
		return
	}

	c.JSON(http.StatusInternalServerError, gin.H{ERROR: "Error at our side"})
}

func BalanceHandler(c *gin.Context) {
	user_id, _ := c.Get("user_id")
	var user models.User
	phiDb.First(&user, "id = ?", user_id)
	c.JSON(http.StatusOK, user.Balance)
}

func DeleteHandler(c *gin.Context) {
	userId, _ := c.Get("user_id")
	phiDb.Delete(&models.User{}, "user_id = ?", userId)
	c.JSON(http.StatusOK, gin.H{"message": "Ok"})
}
