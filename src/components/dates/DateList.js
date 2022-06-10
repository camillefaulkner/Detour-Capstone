import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAllDates } from "../ApiManager"
import { Date } from "./ShowDate"
import "./DateList.css"

export const DateList = () => {
    const [showDates, setShowDates] = useState([])
    const navigate = useNavigate()
    const localUser = localStorage.getItem("detour_user")
    const userObject = JSON.parse(localUser)

    useEffect(
        () => {
            getAllDates()
                .then((dateArray) => {
                    setShowDates(dateArray)
                })
        }, []
    )

    return <article className="datelist">
        {
            showDates.map(date => <Date key={`date--${date.id}`}
                id={date.id}
                date={date.date}
                venue={date.venue}
                city={date.city}
                state={date.state}
                setter={setShowDates} />)
        }

        {
            userObject.manager
                ? <button className="addShowButton" onClick={() => navigate("/dates/create")}>Add Date</button>

                : <></>
        }

    </article>
}