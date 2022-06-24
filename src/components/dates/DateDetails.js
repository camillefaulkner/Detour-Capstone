import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getAllUsers, getApprovedGuestRequests, getApprovedRequests, getAssignedDocs, getDateDetails, getDateDetailsArtist, getDocsForShow, getGuestRequests, getRequests, getScheduleItems } from "../ApiManager"
import "./DateList.css"

export const DateDetails = () => {
    const { showDateId } = useParams()
    const [showDate, updateShowDate] = useState([])
    const [guests, setGuests] = useState([])
    const [scheduleItems, setScheduleItems] = useState([])
    const [morning, setMorning] = useState([])
    const [afternoon, setAfternoon] = useState([])
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
            getScheduleItems(showDateId)
                .then((scheduleArray) => {
                    setScheduleItems(scheduleArray)
                })
            getApprovedGuestRequests(showDateId)
                .then((guestArray) => {
                    setGuests(guestArray)
                })
            getApprovedRequests(showDateId)
                .then((requestArray) => {
                    setRequests(requestArray)
                })
            getAllUsers()
                .then((userArray) => {
                    setUsers(userArray)
                })
            getAssignedDocs(showDateId)
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

    // let dateArray = showDate?.date?.split("-") 
    // let dateDisplay = new Date(dateArray[0], dateArray[1] - 1, dateArray[2])

    // let findMonth = (month) => {
    //     if (month === 1) {
    //         return `January ${dateDisplay.getDate()}`
    //     } else if (month === 2) {
    //         return "February"
    //     } else if (month === 3) {
    //         return "March"
    //     } else if (month === 4) {
    //         return "April"
    //     } else if (month === 5) {
    //         return "May"
    //     } else if (month === 6) {
    //         return `June ${dateDisplay.getDate()}`
    //     } else if (month === 7) {
    //         return "July"
    //     } else if (month === 8) {
    //         return "August"
    //     } else if (month === 9) {
    //         return "September"
    //     } else if (month === 10) {
    //         return "October"
    //     } else if (month === 11) {
    //         return "November"
    //     } else if (month === 12) {
    //         return "December"
    //     }
    // }



    return <>
        <h2 className="datedetailtitle">
            {showDate.date}
        </h2>
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
                    <button className="datedetailcollapsible" onClick={(clickEvent) => {
                        const itemClicked = clickEvent.target
                        itemClicked.classList.toggle("datedetailactive");
                        var content = itemClicked.nextElementSibling
                        if (content.style.maxHeight) {
                            content.style.maxHeight = null;
                        } else {
                            content.style.maxHeight = content.scrollHeight + "px";
                        }
                    }
                    }>additional information:</button>
                    <div className="datedetailcontent">
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
                </div>
                <div>
                    <button className="datedetailcollapsible" onClick={(clickEvent) => {
                        const itemClicked = clickEvent.target
                        itemClicked.classList.toggle("datedetailactive");
                        var content = itemClicked.nextElementSibling
                        if (content.style.maxHeight) {
                            content.style.maxHeight = null;
                        } else {
                            content.style.maxHeight = content.scrollHeight + "px";
                        }
                    }
                    }>guest list:</button>
                    <div className="datedetailcontent">
                        {guests.length
                            ? guests.map(guest => {
                                return <div key={`guest--${guest.id}`}> {guest.name} - {guest.quantity} tickets</div>
                            })
                            : <></>
                        }
                    </div>
                </div>
                <div>
                    <h4 className="datedetaildoc">docs:</h4>
                    {docs.length
                        ? docs.map(doc => {
                            return <img className="image" src={doc.doc.publicURL} />
                        })
                        : <></>
                    }
                </div>
            </section>
        </section>
    </>
}