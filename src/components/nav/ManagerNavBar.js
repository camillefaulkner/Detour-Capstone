import { Link, useNavigate } from "react-router-dom"
import { Nav, NavItem, NavLink } from "reactstrap"

export const ManagerNav = () => {
    const navigate = useNavigate()


    return (
        <Nav tabs className='tabs'>
            <li className="logo">detour</li>
            <NavItem className="navitemfirst">
                <NavLink className="navbar__link" href="/" style={{ textDecoration: 'none' }}>
                    map
                </NavLink>
            </NavItem>
            <NavItem className="navitem">
                <NavLink className="navbar__link" href="/dates" style={{ textDecoration: 'none' }}>
                    dates
                </NavLink>
            </NavItem>
            <NavItem className="navitem">
                <NavLink className="navbar__link" href="/guests" style={{ textDecoration: 'none' }}>
                    submit guest spot
                </NavLink>
            </NavItem>
            <NavItem className="navitem">
                <NavLink className="navbar__link" href="/requests" style={{ textDecoration: 'none' }}>
                    requests
                </NavLink>
            </NavItem>
            <NavItem className="navitem">
                <NavLink className="navbar__link" href="/crew" style={{ textDecoration: 'none' }}>
                    crew
                </NavLink>
            </NavItem>
            <NavItem className="navitem">
                <NavLink className="navbar__link" href="/essentialdocs" style={{ textDecoration: 'none' }}>
                    essential docs
                </NavLink>
            </NavItem>
            <NavItem className="navitem">
                <NavLink className="navbar__link" href="/profile" style={{ textDecoration: 'none' }}>
                    profile
                </NavLink>
            </NavItem>
            <NavItem className="navitemlast">
                <NavLink className="navbar__link" href="" onClick={() => {
                    localStorage.removeItem("detour_user")
                    navigate("/", { replace: true })
                }}>logout</NavLink>
            </NavItem>
        </Nav>
    )
}