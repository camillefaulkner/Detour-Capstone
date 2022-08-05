import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Nav, NavItem, NavLink } from 'reactstrap'

export const ArtistNav = () => {
    const navigate = useNavigate()

    const logo = require('./images/detourLogo.png')

    return (
        <>
            <Nav className='tabs'>
                <img className="logo" src={logo} />
                <NavItem className="navitem">
                    <NavLink className="nav-link" href="/" style={{ textDecoration: 'none' }}>
                        map
                    </NavLink>
                </NavItem>
                <NavItem className="navitem">
                    <NavLink className="navbar__link" href="/dates" style={{ textDecoration: 'none' }}>
                        dates
                    </NavLink>
                </NavItem>
                <NavItem className="navitem">
                    <NavLink className="navbar__link" href="/createrequest" style={{ textDecoration: 'none' }}>
                        requests
                    </NavLink>
                </NavItem>
                <NavItem className="navitem">
                    <NavLink className="navbar__link" href="/profile" style={{ textDecoration: 'none' }}>
                        profile
                    </NavLink>
                </NavItem>
                <NavItem className="navitemlast">
                    <NavLink className="navbar__link nav-side right auth-login" href="#" onClick={() => {
                        localStorage.removeItem("dt_token")
                        navigate("/login", { replace: true })
                    }}>logout</NavLink>
                </NavItem>
            </Nav>
            <div className="bar"></div>
        </>
    )
}