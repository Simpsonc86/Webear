import Watchlists from "../Watchlists";
import Portfolio from "../Portfolio";
import DashboardStockSearch from "./DashboardStockSearch";
import "./Dashboard.css"
import { NavLink } from "react-router-dom";
import ProfileButton from "../Navigation/ProfileButton";
import Transaction from "../Transaction"
import { useSelector } from "react-redux";
import PortfolioChart from "../PortfolioChart";


export const DashboardNavBar = () => {
    return (
        <div className="dashboard-nav">
            <NavLink className="dashboard-home-link" to="/">
                <img className="dash-logo" src="/webear-w.png" alt="webear-white-logo" />
            </NavLink>
            <NavLink className="watchlist-navlink" to="/watchlist">
                <svg className="watchlist-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                </svg>
            </NavLink>
            <NavLink className="portfolio-navlink" to="/portfolio">
                <svg className="portfolio-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z" />
                </svg>
            </NavLink>
        </div>
    )
}
export default function Dashboard() {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
            <div className="dashboard-profile-search-div">
                <div>
                    <ProfileButton user={sessionUser} />
                </div>
                <div>
                    <DashboardStockSearch />
                </div>
            </div>
            <div className="dashboard-container-div">
                <DashboardNavBar />
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
                    <div className="charts-container-div"><PortfolioChart /></div>
                    <div className="dashboard-portfolio">
                        <h3>Portfolio</h3>
                        <Portfolio />
                    </div>

                </div>

            </div>
        </>
    )
}
