import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import React from 'react';
import TradingBehaviorChart from '../components/Charts/Behavioural';
import ProfitLossChart from '../components/Charts/Behavioural_2';
import TradeCategoryChart from '../components/Charts/Behavioural_3';
import ChartOne from '../components/Charts/ChartOne';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Behavioral = () => {
<<<<<<< HEAD
  React.useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      window.location.href = "/auth/signin";
    }
  }, []);
=======
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
        <Breadcrumb pageName="Behavioural Analytics" />
  
        
        
        <div className="flex flex-col gap-10">
          <ChartOne />
        </div>
        <div className="flex flex-col gap-10">
          <TradingBehaviorChart />
        </div>
>>>>>>> a8c4253 (updated all pages with jwt token logic)


  return (
    <>
      <Breadcrumb pageName="Behavioural Analytics" />



      <div className="flex flex-col gap-10">
        <ChartOne />
      </div>
      <div className="flex flex-col gap-10">
        <TradingBehaviorChart />
      </div>

      <div className="flex flex-col gap-10">
        <ProfitLossChart />
      </div>
      <div className="flex flex-col gap-10">
        <TradeCategoryChart />
      </div>


    </>
  );
};

export default Behavioral;
