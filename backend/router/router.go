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
		user.GET("/data/:ticker/:days", controllers.DataHandler)
		user.POST("/signup", controllers.UserSignUp)
		user.POST("/login", controllers.UserLogin)
		user.Use(controllers.AuthenticateUser())
		user.GET("/profile", controllers.ProfileHandler)
		user.POST("/transaction", controllers.TransactionHandler)
		user.GET("/portfolio", controllers.PortfolioHandler)
		user.GET("/balance", controllers.BalanceHandler)
		user.GET("/behaviour", controllers.BehaviourHandler)
		user.GET("/dashboard", controllers.DashboardHandler)
		user.GET("/watchlist/:ticker", controllers.WatchlistHandler)
		user.POST("/addbalance", controllers.AddBalanceHandler)
		user.DELETE("/delete", controllers.DeleteHandler)
		user.POST("/changepassword", controllers.ChangePassword)
	}
}
