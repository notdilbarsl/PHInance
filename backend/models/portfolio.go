package models

import "gorm.io/gorm"

type PortfolioStock struct {
	gorm.Model
	UserID   uint    `json:"portfolio_id" gorm:"index"`
	TickerID string  `json:"ticker_id"    gorm:"not null"`
	AvgPrice float32 `json:"avg_price"`
	Quantity int     `json:"quantity"`
}
