import { Link} from "react-router-dom"
import { CrewProfile } from "./ShowCrewProfile"
import "./Crew.css"
import { Accordion, AccordionHeader, NavLink, Row } from "reactstrap"

export const Crew = ({ id, name }) => {

    return <section className="user">
        <div><Link className="usertext" to={`/profile/${id}`}>
            {name}</Link>
        </div>
       
    </section>
}