package models

import "gorm.io/gorm"

type Watchlist struct {
	gorm.Model
	UserID uint
	Ticker string
}
