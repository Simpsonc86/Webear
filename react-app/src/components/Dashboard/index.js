import Watchlists from "../Watchlists";
import Portfolio from "../Portfolio";
import DashboardStockSearch from "./DashboardStockSearch";
import "./Dashboard.css"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import ProfileButton from "../Navigation/ProfileButton";


export default function Dashboard() {


    return (
        <>
            <ProfileButton />
            <div className="dashboard-container-div">
                <div className="dashboard-nav">
                    <NavLink className="dashboard-home-link" to="/dashboard">
                        <img className="dash-logo" src="/webear-w.png" alt="webear-white-logo" />
                    </NavLink>
                    <NavLink className="watchlist-navlink" to="/dashboard">
                        <img className="dash-logo" src="/webear-w.png" alt="webear-dash-logo" />
                    </NavLink>
                    <NavLink className="portfolio-navlink" to="/dashboard">
                        <img className="dash-logo" src="/webear-w.png" alt="webear-dash-logo2" />
                    </NavLink>
                </div>
                {/* <DashboardNavigation /> */}
                <Watchlists className="dashboard-watchlist" />
                <Portfolio />
            </div>
        </>
    )
}