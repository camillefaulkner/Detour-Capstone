import { Link } from "react-router-dom"
import { CrewProfile } from "./ShowCrewProfile"

export const Crew = ({ id, name }) => {

    return <section className="user">
        <div><Link to={`/profile/${id}`}>
            {name}</Link>
        </div>

    </section>
}