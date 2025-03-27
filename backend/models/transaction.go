package models

import "gorm.io/gorm"

type Transaction struct {
	gorm.Model
	UserID   uint    `json:"user_id"   gorm:"index;not null"` // Foreign key to User
	TickerID string  `json:"ticker_id" gorm:"not null"`       // Foreign key to Ticker.Symbol
	Quantity int     `json:"quantity"`
	Price    float32 `json:"price"`
	Type     string  `json:"type"`
}
