import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllDates } from "../ApiManager"

export const Date = ({ id, date, venue, city, state, setter }) => {
    const [showDates, setShowDates] = useState({})

    const localUser = localStorage.getItem("detour_user")
    const userObject = JSON.parse(localUser)

    useEffect(
        () => {
            getAllDates()
                .then((dateArray) => {
                    setShowDates(dateArray)
                })
        },
        []
    )

    if (userObject.manager) {
        return <section className="date">

            <div>
                <Link to={`/dates/${id}/edit`}>{date}</Link>
            </div>

            <div className="dayLocation"><h3>{venue}</h3> <br></br> {city} {state}</div>
            <button classname="deleteButton" onClick={() => {
                fetch(`http://localhost:8088/showDates/${id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        getAllDates()
                            .then((dateArray) => {
                                setter(dateArray)
                            })
                    })

            }}>Delete</button>
        </section>
    } else {

        return <section className="date">

            <div>
                <Link to={`/dates/${id}`}>{date}</Link>
            </div>

            <div className="dayLocation"><h3>{venue}</h3> <br></br> {city} {state}</div>
        </section>
    }
}