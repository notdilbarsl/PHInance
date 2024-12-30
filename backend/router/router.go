package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sayymeer/feinance-backend/controllers"
	"github.com/sayymeer/feinance-backend/db"
)

func FinRoutes(r *gin.Engine, db db.PhiDB) {
	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, "Hello World")
	})

	// assigning here to save some memory
	controllers.Db = db

	user := r.Group("/user")
	{
		user.POST("/signup", controllers.UserSignUp)
		user.POST("/login", controllers.UserLogin)
		user.Use(controllers.AuthenticateUser())
		user.GET("/test", func(ctx *gin.Context) {
			ctx.JSON(http.StatusOK, "Restricted route")
		})
	}
}
