import { ArtistNav } from "./ArtistNavBar"
import { ManagerNav } from "./ManagerNavBar"
import "./Nav.css"


export const NavBar = () => {

    const localUser = localStorage.getItem("dt_manager")
    const userObject = JSON.parse(localUser)

    if (userObject) {
        return <ManagerNav />
    } else {
        return <ArtistNav />
    }
}