import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAllDates } from "../ApiManager"
import { ShowDate } from "./ShowDate"
import "./DateList.css"
import { Button } from "reactstrap"

export const DateList = ({ retrieveDates }) => {
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
            showDates.map(date => <ShowDate retrieveDates={retrieveDates} key={`date--${date.id}`}
                id={date.id}
                date={date.date}
                venue={date.venue}
                city={date.city}
                state={date.state}
                setter={setShowDates} />)
        }

        {
            userObject.manager
                ? <Button className="addshowbutton" onClick={() => navigate("/dates/create")}>Add Date</Button>

                : <></>
        }

    </article>
}