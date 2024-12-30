package controllers

import (
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func GenerateJWT(userId uint) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userId,
		"exp":     time.Now().Add(time.Hour * 72).Unix(), // 72 Hours expiration
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(JwtSecret)
}

func AuthenticateUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Parsing token in format Authorization: Bearer <token>
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{ERROR: "Missing Authorization Token"})
			c.Abort()
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{ERROR: "Invalid token format"})
			c.Abort()
			return
		}
		token, err := jwt.Parse(parts[1], func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, jwt.ErrSignatureInvalid
			}
			return JwtSecret, nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{ERROR: "Invalid or expired token"})
			c.Abort()
			return
		}
		if claims, ok := token.Claims.(jwt.MapClaims); ok {
			c.Set("user_id", claims["user_id"])
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{ERROR: "Invalid token claims"})
			c.Abort()
			return
		}
		c.Next()
	}
}
