package db

import (
	"fmt"
	"os"

	"github.com/sayymeer/feinance-backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type PhiDB struct {
	*gorm.DB
}

func InitDB() *PhiDB {
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASS")
	dbName := os.Getenv("DB_NAME")

	loginString := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Kolkata",
		host,
		user,
		password,
		dbName,
		port,
	)
	db, err := gorm.Open(
		postgres.Open(loginString),
		&gorm.Config{TranslateError: true},
	) // Enabling translate error, converting database-specific errors to generalized errors
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	db.AutoMigrate(&models.User{})
	fmt.Println("Connected to database")
	return &PhiDB{db}
}
