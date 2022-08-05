import { ArtistViews } from "./ArtistViews"
import { ManagerViews } from "./ManagerViews"


export const ApplicationViews = () => {

    const localUser = localStorage.getItem("dt_manager")

    if (localUser === "true") {
        return <ManagerViews />
    } else {
        return <ArtistViews />
    }
}