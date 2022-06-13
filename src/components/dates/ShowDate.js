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
        return <>
            <Link className="date" to={`/dates/${id}/edit`}>{date}
                <div className="dayLocation"><h3>{venue}</h3> <br></br> {city} {state}</div>
                
                <button className="deleteButton" onClick={(evt) => {
                    evt.preventDefault()
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
            </Link>
        </>
    } else {

        return <>
            <Link className="date" to={`/dates/${id}`}>{date}
                <div className="dayLocation"><h3>{venue}</h3> <br></br> {city} {state}</div>
            </Link>
        </>
    }
}