package models

import "gorm.io/gorm"

type Ticker struct {
	gorm.Model
	Name   string `json:"name"`
	Symbol string `json:"symbol" gorm:"unique;not null"`
}

/*

Methods

getPrice()

*/
