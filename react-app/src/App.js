import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Signup from "./views/signup";
import Login from "./views/login";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Watchlists from "./components/Watchlists";
import Portfolio from "./components/Portfolio"
import Stocks from "./components/Stock"
import Balance from "./components/Balance";
import LandingPage from "./components/LandingPage";
import Transaction from "./components/Transaction";
import StockDetails from "./components/StockDetails";
import Dashboard from "./components/Dashboard";
import StockChart from "./components/StockChart"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>

      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Navigation isLoaded={isLoaded} />
            <LandingPage />
          </Route>
          <Route path="/login" >
            <Login />
          </Route>
          <Route path="/add_to_balance">
            <Navigation isLoaded={isLoaded} />
            <Balance />
          </Route>
          <Route exact path="/stocks/:stockId">
            <Navigation isLoaded={isLoaded} />
            <StockDetails />
          </Route>
          <Route path="/stocks">
            <Navigation isLoaded={isLoaded} />
            <Stocks />
          </Route>
          <Route path="/portfolio">
            <Navigation isLoaded={isLoaded} />
            <Portfolio />
          </Route>
          <Route path="/watchlist">
            <Navigation isLoaded={isLoaded} />
            <Watchlists />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/trade">
            <Navigation isLoaded={isLoaded} />
            <Transaction />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
