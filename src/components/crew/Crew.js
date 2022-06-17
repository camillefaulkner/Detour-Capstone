import { Link} from "react-router-dom"
import { CrewProfile } from "./ShowCrewProfile"
import "./Crew.css"
import { NavLink, Row } from "reactstrap"

export const Crew = ({ id, name }) => {

    return <section className="user">
        <div><NavLink href={`/profile/${id}`}>
            {name}</NavLink>
        </div>
    </section>
}