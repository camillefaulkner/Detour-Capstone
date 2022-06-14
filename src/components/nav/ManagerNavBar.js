import { Link, useNavigate } from "react-router-dom"

export const ManagerNav = () => {
    const navigate = useNavigate()


    return (
        <ul className="navbar">
            <li className="logo">detour</li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/dates" style={{ textDecoration: 'none' }}>
                    dates
                </Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/guests" style={{ textDecoration: 'none' }}>
                    submit guest spot
                </Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/crew" style={{ textDecoration: 'none' }}>
                    crew
                </Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/" style={{ textDecoration: 'none' }}>
                    home
                </Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/profile" style={{ textDecoration: 'none' }}>
                    profile
                </Link>
            </li>
            <li className="navbar__logout">
            <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("detour_user")
                    navigate("/", { replace: true })
                }}>logout</Link>
            </li>
        </ul>
    )
}