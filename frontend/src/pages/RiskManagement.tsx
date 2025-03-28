import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableFour from '../components/Tables/TableFour';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const RiskManagement = () => {
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
        <Breadcrumb pageName="Risk Management" />
  
        <div className="flex flex-col gap-10">
          <TableFour />
        </div>
      </>
    );
  };
  
  export default RiskManagement;