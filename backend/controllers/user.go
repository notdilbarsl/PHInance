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
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if len(user.Email) == 0 || len(user.Password) == 0 {
		c.JSON(http.StatusOK, gin.H{"error": "Email and password must not be null"})
		return
	}

	if err := Db.Create(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrDuplicatedKey) {
			c.JSON(http.StatusOK, gin.H{"message": "email id already exists"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User created successfully!"})
}

func UserLogin(c *gin.Context) {
	var user, userRes models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result := Db.First(&userRes, "email = ?", user.Email)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusOK, gin.H{"message": "Email not found"})
		return
	}
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	// If password is wrong
	if !utils.CheckPassword(user.Password, userRes.Password) {
		c.JSON(http.StatusOK, gin.H{"message": "Wrong Password"})
		return
	}

	// TODO: implementing JWT, for now only returning authenticated on successfully login
	c.JSON(http.StatusOK, gin.H{"message": "authenticated"})
}
