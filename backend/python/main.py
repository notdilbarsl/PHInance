import uvicorn
from fastapi import FastAPI, HTTPException
import yfinance as yf

app = FastAPI()

@app.get("/{ticker}")
async def get_stock_info(ticker: str):
    try:
        stock = yf.Ticker(f"{ticker}.NS")
        info = stock.info
        if not info:
            raise HTTPException(status_code=404, detail="Ticker not found")
        return info
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0")
