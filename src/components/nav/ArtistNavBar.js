import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Nav, NavItem, NavLink } from 'reactstrap'

export const ArtistNav = () => {
    const navigate = useNavigate()
    const [isActive, setIsActive] = useState(false)

    const handleClick = event => {
        event.currentTarget.classList.toggle('active')
    }

    return (
        <>
            <Nav className='tabs'>
                <li className="logo">detour</li>
                <NavItem className="navitem">
                    <NavLink className="nav-link" active onClick={handleClick} href="/" style={{ textDecoration: 'none' }}>
                        map
                    </NavLink>
                </NavItem>
                <NavItem className="navitem">
                    <NavLink className="navbar__link" nav href="/dates" style={{ textDecoration: 'none' }}>
                        dates
                    </NavLink>
                </NavItem>
                <NavItem className="navitem">
                    <NavLink className="navbar__link" nav href="/createrequest" style={{ textDecoration: 'none' }}>
                        requests
                    </NavLink>
                </NavItem>
                <NavItem className="navitem">
                    <NavLink className="navbar__link" nav href="/profile" style={{ textDecoration: 'none' }}>
                        profile
                    </NavLink>
                </NavItem>
                <NavItem className="navitem">
                    <NavLink className="navbar__link nav-side right auth-login" nav href="" onClick={() => {
                        localStorage.removeItem("detour_user")
                        navigate("/", { replace: true })
                    }}>logout</NavLink>
                </NavItem>
            </Nav>
            <div className="bar"></div>
        </>
    )
}