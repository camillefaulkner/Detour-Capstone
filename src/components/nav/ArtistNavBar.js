import { Link, useNavigate } from "react-router-dom"

export const ArtistNav = () => {
    const navigate = useNavigate()


    return (
        <ul className="navbar">
        <li className="logo">detour</li>
        <li className="navbar__item">
            <Link className="navbar__link" to="/dates">
                dates
            </Link>
        </li>
        <li className="navbar__item">
            <Link className="navbar__link" to="/">
                home
            </Link>
        </li>
        <li className="navbar__item">
            <Link className="navbar__link" to="/profile">
                profile
            </Link>
        </li>
        <li className="navbar__item navbar__logout">
        <Link className="navbar__link" to="" onClick={() => {
                localStorage.removeItem("detour_user")
                navigate("/", { replace: true })
            }}>logout</Link>
        </li>
    </ul>
    )
}