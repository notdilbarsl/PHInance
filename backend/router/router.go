package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sayymeer/feinance-backend/controllers"
)

func FinRoutes(r *gin.Engine) {
	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, "Hello World")
	})

	// assigning here to save some memory

	user := r.Group("/user")
	{
		user.POST("/signup", controllers.UserSignUp)
		user.POST("/login", controllers.UserLogin)
		user.Use(controllers.AuthenticateUser())
		user.GET("/profile", controllers.ProfileHandler)
		user.POST("/transaction", controllers.TransactionHandler)
		user.GET("/portfolio", controllers.PortfolioHandler)
		user.GET("/balance", controllers.BalanceHandler)
		user.GET("/behaviour", controllers.BehaviourHandler)
		user.GET("/dashboard", controllers.DashboardHandler)
		// user.POST("/addwatchlist")
	}
}
