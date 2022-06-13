import { ArtistNav } from "./ArtistNavBar"
import { ManagerNav } from "./ManagerNavBar"
import "./Nav.css"


export const NavBar = () => {

    const localUser = localStorage.getItem("detour_user")
    const userObject = JSON.parse(localUser)

    if (userObject.manager) {
        return <ManagerNav />
    } else {
        return <ArtistNav />
    }
}