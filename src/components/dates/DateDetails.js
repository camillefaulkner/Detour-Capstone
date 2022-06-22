import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getAllUsers, getApprovedGuestRequests, getDateDetails, getDateDetailsArtist, getDocsForShow, getGuestRequests, getRequests, getScheduleItems } from "../ApiManager"
import "./DateList.css"

export const DateDetails = () => {
    const { showDateId } = useParams()
    const [showDate, updateShowDate] = useState([])
    const [guests, setGuests] = useState([])
    const [scheduleItems, setScheduleItems] = useState([])
    const [morning, setMorning] = useState({})
    const [afternoon, setAfternoon] = useState({})
    const [requests, setRequests] = useState([])
    const [users, setUsers] = useState([])
    const [docs, setDocs] = useState([])

    useEffect(
        () => {
            getDateDetailsArtist(showDateId)
                .then((data) => {
                    const singleShowDate = data[0]
                    updateShowDate(singleShowDate)
                })
            getApprovedGuestRequests(showDateId)
                .then((guestArray) => {
                    setGuests(guestArray)
                })
            getRequests(showDateId)
                .then((requestArray) => {
                    setRequests(requestArray)
                })
            getAllUsers()
                .then((userArray) => {
                    setUsers(userArray)
                })
            getDocsForShow(showDateId)
                .then((docArray) => {
                    setDocs(docArray)
                })
        },
        [showDateId]
    )

    useEffect(
        () => {
            if (scheduleItems.length) {
                let foundMorningSchedule = scheduleItems?.filter((scheduleItem) => {
                    return scheduleItem.timeDetail === "am"
                })
                let foundAfternoonSchedule = scheduleItems?.filter((scheduleItem) => {
                    return scheduleItem.timeDetail === "pm"
                })
                setMorning(foundMorningSchedule)
                setAfternoon(foundAfternoonSchedule)
            }
        }, [scheduleItems]
    )


    return <> 
        <header className="detail__date">{showDate?.date}</header>
        <section className="showdetails">
            <section className="leftSide">

                <div className="showAddress">{showDate?.venue}<br></br>
                    {showDate?.streetAddress}<br></br>
                    {showDate?.city} {showDate?.state}</div>

                <div className="essentials">
                    <h4>essential notes:</h4>
                    {showDate?.essentialNotes}
                </div>


                <div className="schedule">
                    <h4>schedule:</h4>
                    {
                        morning.length && afternoon.length
                            ?
                            <>
                                {
                                    morning.sort((a, b) => { return a.time - b.time }).map(item => {
                                        return <div key={`schedule--${item.id}`}> {item.time}{item.timeDetail} - {item.description}</div>
                                    })
                                }
                                {

                                    afternoon.sort((a, b) => { return a.time - b.time }).map(item => {
                                        return <div key={`schedule--${item.id}`}> {item.time}{item.timeDetail} - {item.description}</div>
                                    })
                                }
                            </>
                            : <></>
                    }
                </div>

            </section>

            <section className="rightSide">
                <div>
                    <h4>additional information:</h4>
                    {showDate?.other} <br />
                    {
                        requests.map(request => {
                            let foundUser = users.find((user) => {
                                return user.id === request.userId
                            })
                            return <>{foundUser?.name} requests {request.request}<br /></>
                        })
                    }

                </div>
                <div>
                    <h4>guest list:</h4>
                    {guests.length
                        ? guests.map(guest => {
                            return <div key={`guest--${guest.id}`}> {guest.name} - {guest.quantity} tickets</div>
                        })
                        : <></>
                    }
                </div>
                <div>
                    <h4>docs:</h4>
                    { docs.length
                        ? docs.map(doc => {
                            return <img className="image" src={doc.publicURL} />
                        })
                        : <></>
                    }
                </div>
            </section>
        </section>
    </>
}