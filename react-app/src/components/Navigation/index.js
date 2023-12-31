import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import StockSearchFilter from '../StockSearchFilter';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);


	return (
		<div className='outer-nav-div'>
			<div className='main-nav-div'>
				<div className='left-side-nav-links'>
					<NavLink className="home-link" exact to="/">
						<img className="webear-logo" src="/webearLogo.png" alt="webear-logo" />
						<h1>Webear</h1>
					</NavLink>
					<NavLink className="nav-links" exact to="/stocks">Stocks</NavLink>
					{sessionUser && <NavLink className="nav-links" exact to="/dashboard">Trade</NavLink>}
				</div>
				<div className='right-side-nav-links'>
					<StockSearchFilter className="search-list-stock"/>
					{isLoaded && (
						<div className='signup-login'>
							<ProfileButton user={sessionUser} />
						</div>
					)}
				</div>

			</div>

		</div>
	);
}

export default Navigation;
