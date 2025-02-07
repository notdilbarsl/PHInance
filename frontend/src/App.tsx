import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import RiskManagement from './pages/RiskManagement'
import Support from './pages/Support';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import BuyOrder from './pages/BuyOrder';
import DefaultLayout from './layout/DefaultLayout';
import Portfolio from './pages/Portfolio';
import AIPoweredPrediction from './pages/AIPoweredPrediction';
import Behavioural from './pages/Behavioural';
import StockScreener from './pages/StockScreener';
import SellOrder from './pages/SellOrder';
import BuyAndSellStocks from './pages/BuyAndSellStocks';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <ECommerce />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <Tables />
            </>
          }
        />
        <Route
          path="/portfolio"
          element={
            <>
              <Portfolio />
            </>
          }
        />
        <Route
          path="/buyorder"
          element={
            <>
              <BuyOrder />
            </>
          }
        />
        <Route
          path="/sellorder"
          element={
            <>
              <SellOrder />
            </>
          }
        />
        <Route
          path="/buysellstocks"
          element={
            <>
              <BuyAndSellStocks />
            </>
          }
        />
        <Route
          path="/Behavioural"
          element={
            <>
              <Behavioural />
            </>
          }
        />
        <Route
          path="/riskmanagement"
          element={
            <>
              <RiskManagement />
            </>
          }
        />
        <Route
          path="/stockscreener"
          element={
            <>
              <StockScreener />
            </>
          }
        />
        <Route
          path="/support"
          element={
            <>
              <Support />
            </>
          }
        />
        <Route
          path="/ai-powered-prediction"
          element={
            <>
              <AIPoweredPrediction />
            </>
          }
        />

        <Route
          path="/settings"
          element={
            <>
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <SignUp />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
