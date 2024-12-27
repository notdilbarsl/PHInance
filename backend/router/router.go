package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func FinRoutes(r *gin.Engine) {
	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, "Hello World")
	})
}
