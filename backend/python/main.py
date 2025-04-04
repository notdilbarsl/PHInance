from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf

app = FastAPI()

# Enable CORS for all origins (*)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow any domain
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

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
@app.get("/price/{ticker}")
async def get_stock_info(ticker: str):
    try:
        stock = yf.Ticker(f"{ticker}.NS")
        return stock.fast_info['lastPrice']
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
