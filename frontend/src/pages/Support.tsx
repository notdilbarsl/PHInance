import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const Support = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    // Redirect if token is missing
    if (!token) {
      navigate('/auth/signin');
      return;
    }

    try {
      // Decode token to check expiration
      const decoded = jwtDecode<{ exp: number }>(token);
      const isExpired = decoded.exp * 1000 < Date.now();
      
      // Redirect if token is expired
      if (isExpired) {
        localStorage.removeItem('authToken');
        navigate('/auth/signin');
      }
    } catch (error) {
      // Handle invalid token
      localStorage.removeItem('authToken');
      navigate('/auth/signin');
    }
  }, [navigate]);
  return (
    <>
      <div className="faq-page-container flex flex-col gap-10">

        {/* Contact Us Section */}
        <section className="mt-0">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <div className="mt-4">
            <h3 className="font-semibold">Have a question?</h3>
            <p>Email: <a href="mailto:support@phinance.com" className="text-blue-600">support@ourplatform.com</a></p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section>
          <h2 className="text-3xl font-bold">Frequently Asked Questions (FAQs)</h2>
          <div className="mt-4">
            <h3 className="font-semibold">1. What is this platform?</h3>
            <p>This platform offers a simulated trading environment where you can trade stocks using virtual money. You’ll get access to real-time market data, technical analysis tools, AI-powered predictions, and educational resources to help you improve your trading skills.</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">2. How do I start trading?</h3>
            <p>Simply sign up for an account, and you’ll receive ₹10,000 in virtual funds. From there, you can begin trading stocks in our simulated environment just as you would in a real trading platform.</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">3. Can I trade real stocks on this platform?</h3>
            <p>No, this platform is focused on providing a simulated trading experience. While the stock data is based on real-life information, all trades are made using virtual money.</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">4. How is the stock data sourced?</h3>
            <p>Our platform pulls real-time or near-real-time stock data from reliable financial data providers. You’ll have access to comprehensive information like stock prices, market trends, and company financials.</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">5. What are technical analysis tools?</h3>
            <p>We provide a range of technical analysis features, including indicators like the Relative Strength Index (RSI), Moving Average Convergence Divergence (MACD), and On-Balance Volume (OBV) to help you analyze market trends and make informed trading decisions.</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">6. How does the AI-powered prediction feature work?</h3>
            <p>At the end of each trading day, we run machine learning models on the stocks you’ve traded, analyzing data such as news, sentiment, and technical indicators. The model then predicts the stock’s potential price movement for the next day and provides a probability score.</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">7. What happens if I lose all my virtual funds?</h3>
            <p>If you lose all your virtual money, you can still earn more by completing educational tasks like watching videos, taking quizzes, or participating in challenges designed to improve your financial knowledge and skills.</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">8. What is the portfolio management tool?</h3>
            <p>Our portfolio management feature allows you to create a portfolio of stocks and track its performance. You can monitor key metrics like ROI (Return on Investment), risk assessment, and diversification to make informed decisions.</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">9. What is the Stock Screener?</h3>
            <p>The stock screener lets you filter stocks based on specific criteria such as P/E ratio, dividend yield, and recent price movements. It helps you find stocks that align with your trading goals.</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">10. How does the risk analysis tool work?</h3>
            <p>Our platform provides risk analysis tools like Value at Risk (VaR) to help you evaluate the potential risk of your trades. You’ll also see a risk/reward ratio for each trade, allowing you to assess whether the trade is worth taking.</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">11. Can I participate in mock IPOs?</h3>
            <p>Yes! We simulate the IPO process, allowing you to participate in mock IPO investments and get a feel for how initial public offerings work in the stock market.</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">12. How does the behavioral analytics feature work?</h3>
            <p>Our platform tracks your trading behavior, such as impulsive trades or high-risk decisions. It provides personalized feedback to help you identify patterns and improve your decision-making skills.</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">13. Is the platform free to use?</h3>
            <p>Yes, our platform is completely free to use, and you get ₹10,000 in virtual funds upon registration to start trading.</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">14. How can I contact support?</h3>
            <p>If you have any questions or need assistance, you can reach our support team through the details given above.</p>
          </div>
        </section>

        
      </div>
    </>
  );
};

export default Support;
