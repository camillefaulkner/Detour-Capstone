import { Link, useNavigate } from "react-router-dom"

export const ArtistNav = () => {
    const navigate = useNavigate()


    return (
        <ul className="navbar">
        <li className="navbar__item">
            <Link className="navbar__link" to="/dates">
                Dates
            </Link>
        </li>
        <li className="navbar__item">
            <Link className="navbar__link" to="/">
                Home
            </Link>
        </li>
        <li className="navbar__item">
            <Link className="navbar__link" to="/profile">
                Profile
            </Link>
        </li>
        <li className="navbar__item navbar__logout">
        <Link className="navbar__link" to="" onClick={() => {
                localStorage.removeItem("detour_user")
                navigate("/", { replace: true })
            }}>Logout</Link>
        </li>
    </ul>
    )
}