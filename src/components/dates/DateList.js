import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAllDates } from "../ApiManager"
import { ShowDate } from "./ShowDate"
import "./DateList.css"
import { Button } from "reactstrap"

export const DateList = ({ retrieveDates }) => {
    const [showDates, setShowDates] = useState([])
    const [offdays, setOffDays] = useState([])
    const navigate = useNavigate()
    const localUser = localStorage.getItem("detour_user")
    const userObject = JSON.parse(localUser)
    const [alldays, setAllDays] = useState([])


    useEffect(
        () => {
            getAllDates()
                .then((dateArray) => {
                    setShowDates(dateArray)
                })
        }, []
    )

    useEffect(
        () => {
            if (showDates.length) {
             
                var result = showDates.sort(function (a, b) {
                    return Date.parse(a.date) - Date.parse(b.date);
                }).reduce(function (hash) {
                    return function (p, c) { //c is current date obj
                        var missingDaysNo = (Date.parse(c.date) - hash.prev) / (1000 * 3600 * 24);
                        if (hash.prev && missingDaysNo > 1) { //is there a gap?
                            for (var i = 1; i < missingDaysNo; i++) {

                                let newObj = {
                                    "userId": 1,
                                    "date": "",
                                    "venue": "off day",
                                    "streetAddress": "",
                                    "city": "",
                                    "state": "",
                                    "essentialNotes": "",
                                    "other": ""
                                }
                                newObj.date = new Date(hash.prev + (i + 1) * (1000 * 3600 * 24)).toLocaleDateString("fr-CA");
                                p.push(newObj)
                            }

                        }
                        p.push(c)
                        hash.prev = Date.parse(c.date);
                        return p;
                    };
                }(Object.create(null)), []);

                // offdateArray.push(result)
                setOffDays(result);
            }

        }, [showDates]
    )

    return <article className="datelist">
        {
            offdays.sort((a, b) => { return new Date(a.date) - new Date(b.date) }).map(date => <ShowDate retrieveDates={retrieveDates} key={`date--${date.id}`}
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