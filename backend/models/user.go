package models

import (
	"time"

	"github.com/sayymeer/feinance-backend/utils"
	"gorm.io/gorm"
)

// TODO: To add validation tags
type User struct {
	gorm.Model
	Password     string        `json:"password"`
	Email        string        `json:"email"       gorm:"unique;not null"`
	Name         string        `json:"name"`
	Balance      float32       `json:"balance"`
	IsVerified   bool          `json:"is_verified"`
	Phone        string        `json:"phone_no"`
	Dob          time.Time     `json:"dob"         gorm:"type:date"`
	Transactions []Transaction `                   gorm:"foreignKey:UserID"`
}

func (u *User) BeforeSave(tx *gorm.DB) (err error) {
	hashedPassword, err := utils.HashPassword(u.Password)
	if err != nil {
		return err
	}
	u.Password = hashedPassword
	return nil
}
