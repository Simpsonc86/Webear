import Watchlists from "../Watchlists";
import Portfolio from "../Portfolio";
import DashboardStockSearch from "./DashboardStockSearch";
import "./Dashboard.css"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import ProfileButton from "../Navigation/ProfileButton";
import Transaction from "../Transaction"


export const DashboardNavBar= () =>{
    return(
        <div className="dashboard-nav">
                    <NavLink className="dashboard-home-link" to="/">
                        <img className="dash-logo" src="/webear-w.png" alt="webear-white-logo" />
                    </NavLink>
                    <NavLink className="watchlist-navlink" to="/watchlist">
                        <img className="dash-logo" src="/webear-w.png" alt="webear-dash-logo" />
                    </NavLink>
                    <NavLink className="portfolio-navlink" to="/portfolio">
                        <img className="dash-logo" src="/webear-w.png" alt="webear-dash-logo2" />
                    </NavLink>
                </div>
    )
}
export default function Dashboard() {


    return (
        <>
            <div className="dashboard-profile-search">
                <ProfileButton />
                <DashboardStockSearch />
            </div>
            <div className="dashboard-container-div">
                <DashboardNavBar/>
                <div className="watchlist-container-div">
                    <div className="dashboard-watchlist" >
                        <h3>Watchlists</h3>
                        <Watchlists />
                    </div>
                    <div className="dashboard-transactions">
                        <h3>Transactions</h3>
                        <Transaction />
                    </div>
                </div>
                <div className="charts-and-portfolio-div">
                    <h2 className="charts-container-div">Charts comming soon!</h2>
                    <div className="dashboard-portfolio">
                        <h3>Portfolio</h3>
                        <Portfolio />
                    </div>

                </div>

            </div>
        </>
    )
}