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
import Footer from "./components/Footer";

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
            <Footer/>
          </Route>
          <Route path="/login" >
            <Login />
            <Footer/>
          </Route>
          <Route path="/add_to_balance">
            <Navigation isLoaded={isLoaded} />
            <Balance />
            <Footer/>
          </Route>
          <Route exact path="/stocks/:stockId">
            <Navigation isLoaded={isLoaded} />
            <StockDetails />
            <Footer/>
          </Route>
          <Route path="/stocks">
            <Navigation isLoaded={isLoaded} />
            <Stocks />
            <Footer/>
          </Route>
          <Route path="/portfolio">
            <Navigation isLoaded={isLoaded} />
            <Portfolio />
            <Footer/>
          </Route>
          <Route path="/watchlist">
            <Navigation isLoaded={isLoaded} />
            <Watchlists />
            <Footer/>
          </Route>
          <Route path="/signup">
            <Signup />
            <Footer/>
          </Route>
          <Route path="/trade">
            <Navigation isLoaded={isLoaded} />
            <Transaction />
            <Footer/>
          </Route>
          <Route path="/dashboard">
            <Dashboard isLoaded={isLoaded} />
            <Footer/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
