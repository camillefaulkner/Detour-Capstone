import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllDates } from "../ApiManager"

export const ShowDate = ({ id, date, venue, city, state, setter, retrieveDates }) => {
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

    let dateArray = date.split("-")
    let dateDisplay = new Date(dateArray[0], dateArray[1] - 1, dateArray[2])

    let findMonth = (month) => {
        if (month === 1) {
            return "January"
        } else if (month === 2) {
            return "February"
        } else if (month === 3) {
            return "March"
        } else if (month === 4) {
            return "April"
        } else if (month === 5) {
            return "May"
        } else if (month === 6) {
            return "June"
        } else if (month === 7) {
            return "July"
        } else if (month === 8) {
            return "August"
        } else if (month === 9) {
            return "September"
        } else if (month === 10) {
            return "October"
        } else if (month === 11) {
            return "November"
        } else if (month === 12) {
            return "December"
        }
    }

    let findDay = (day) => {
        if (day === 1) {
            return "Monday"
        } else if (day === 2) {
            return "Tuesday"
        } else if (day === 3) {
            return "Wednesday"
        } else if (day === 4) {
            return "Thursday"
        } else if (day === 5) {
            return "Friday"
        } else if (day === 6) {
            return "Saturday"
        } else if (day === 7) {
            return "Sunday"
        }
    }

    if (userObject.manager) {
        return <>
            <Link className="date" style={{ textDecoration: 'none' }} to={`/dates/${id}/edit`}>
                {findDay(dateDisplay.getDay())} <br />
                {findMonth(dateDisplay.getMonth() + 1)} {dateDisplay.getDate()}
                <div className="dayLocation" style={{ textDecoration: 'none' }}><h3>{venue}</h3> <br></br> {city} {state}</div>

                <button className="deleteButton" onClick={(evt) => {
                    evt.preventDefault()
                    fetch(`http://localhost:8088/showDates/${id}`, {
                        method: "DELETE"
                    })
                        .then(() => {
                            retrieveDates()
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