package controllers

import (
	"os"

	"github.com/sayymeer/feinance-backend/db"
	"gorm.io/gorm"
)

var phiDb *gorm.DB

func init() {
	phiDb = db.InitDB()
}

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

const (
	MESSAGE = "message"
	ERROR   = "error"
)
