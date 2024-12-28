package models

import (
	"github.com/sayymeer/feinance-backend/utils"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Password string `json:"password"`
	Email    string `json:"email"    gorm:"unique;not null"`
}

func (u *User) BeforeSave(tx *gorm.DB) (err error) {
	hashedPassword, err := utils.HashPassword(u.Password)
	if err != nil {
		return err
	}
	u.Password = hashedPassword
	return nil
}
