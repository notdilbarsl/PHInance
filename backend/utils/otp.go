package utils

import "math/rand"

func GenerateOtp() [6]byte {
	nums := []byte("1234567890")
	otp := make([]byte, 6)
	for i := range 6 {
		otp[i] = nums[rand.Intn(10)]
	}
	return [6]byte(otp)
}
