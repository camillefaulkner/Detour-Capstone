import { ArtistViews } from "./ArtistViews"
import { ManagerViews } from "./ManagerViews"


export const ApplicationViews = () => {

    const localUser = localStorage.getItem("detour_user")
    const userObject = JSON.parse(localUser)

    if (userObject.manager) {
        return <ManagerViews />
    } else {
        return <ArtistViews />
    }
}