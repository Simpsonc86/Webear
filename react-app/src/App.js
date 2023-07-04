import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Watchlists from "./components/Watchlists";
import Portfolio from "./components/Portfolio"
import Stocks from "./components/Stock"
import Balance from "./components/Balance";
import Transaction from "./components/Transaction";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/add_to_balance">
            <Balance />
          </Route>
          <Route path="/stocks">
            <Stocks />
          </Route>
          <Route path="/portfolio">
            <Portfolio />
          </Route>
          <Route path="/watchlist">
            <Watchlists/>
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/trade">
            <Transaction />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
