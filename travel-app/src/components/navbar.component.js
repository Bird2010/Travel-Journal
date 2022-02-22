import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Your Name Travel Journal</Link>
                <div className = "collapse navbar-collapse">
                    <ul className='navbar-nav mr-auto'>
                        <li className="navbar-item">
                            <Link to="/" className='nav-link'>Locations</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/add" className="nav-link">New Location</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Create User</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to="/map" className='nav-link'>Map</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}