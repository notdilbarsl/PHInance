package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sayymeer/feinance-backend/router"
)

func main() {
	// For Production
	// gin.SetMode(gin.ReleaseMode)

	r := gin.Default()
	router.FinRoutes(r)
	r.Run()
}
