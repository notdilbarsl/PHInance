package main

import (
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/sayymeer/feinance-backend/router"
)

func main() {
	if err := godotenv.Load(); err != nil {
		panic("error loading .env files")
	}
	r := gin.Default()
	router.FinRoutes(r)
	r.Run()
}
