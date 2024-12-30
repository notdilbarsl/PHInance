package controllers

import (
	"os"

	"github.com/sayymeer/feinance-backend/db"
)

var Db db.PhiDB

var JwtSecret = []byte(os.Getenv("JWT_SECRET"))

const (
	MESSAGE = "message"
	ERROR   = "error"
)
