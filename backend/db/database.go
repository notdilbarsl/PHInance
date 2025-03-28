package db

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/sayymeer/feinance-backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Loading .env file here because this init function will be executed first
func init() {
	if err := godotenv.Load(); err != nil {
		panic(err)
	}
}

func InitDB() *gorm.DB {
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASS")
	dbName := os.Getenv("DB_NAME")
	sslMode := os.Getenv("DB_SSLMODE")
	loginString := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=Asia/Kolkata",
		host,
		user,
		password,
		dbName,
		port,
		sslMode,
	)
	db, err := gorm.Open(
		postgres.Open(loginString),
		&gorm.Config{TranslateError: true},
	) // Enabling translate error, converting database-specific errors to generalized errors
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	db.AutoMigrate(
		&models.User{},
		&models.Transaction{},
		&models.Watchlist{},
		&models.Ticker{},
		&models.PortfolioStock{},
	)
	tickers := models.GetNiftyFifty()
	for _, ticker := range tickers {
		db.FirstOrCreate(&ticker, models.Ticker{Symbol: ticker.Symbol})
	}
	fmt.Println("Connected to database")
	return db
}
