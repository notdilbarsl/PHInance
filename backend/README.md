# PHInance Backend

This project is written in Go using Gin framework and GORM. It uses PostgreSQL for databse.

## Prerequisites

Ensure you have the following installed on your system:

- [Go](https://go.dev/dl/)
- [PostgreSQL](https://www.postgresql.org/download/)

## Installation

### 1. Clone the repo

```bash
git clone https://github.com/notdilbarsl/PHInance.git
cd PHInance/backend
```

### 2. Setup Environment Variables

Create a Database in Postgre.
Create a `.env` file with following structure.

```.env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASS=your_password
DB_NAME=your_database
JWT_SECRET=key_for_signing_tokens

```

### 3. Install Dependencies

```bash
go mod tidy

## To run use below command
go run main.go
```
