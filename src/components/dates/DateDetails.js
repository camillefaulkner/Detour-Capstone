import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getAllUsers, getApprovedGuestRequests, getApprovedRequests, getAssignedDocs, getDateDetails, getDateDetailsArtist, getDocsForShow, getGuestRequests, getRequests, getScheduleItems } from "../ApiManager"
import { ConvertDate } from "./ConvertDate"
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
                    updateShowDate(data)
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
            if (showDate.schedule_items?.length) {
                let foundMorningSchedule = showDate.schedule_items?.filter((scheduleItem) => {
                    let timeArray = scheduleItem.time.split(":")
                    if (timeArray[0] < 12) {
                        return scheduleItem
                    }
                })

                let foundAfternoonSchedule = showDate.schedule_items?.filter((scheduleItem) => {
                    let timeArray = scheduleItem.time.split(":")
                    if (timeArray[0] >= 12) {
                        return scheduleItem
                    }
                })
                setMorning(foundMorningSchedule)
                setAfternoon(foundAfternoonSchedule)
            }
        }, [scheduleItems]
    )

    const findTime = (time) => {
        let timeArray = time.split(":")
        if (timeArray[0] < 12) {
            return `${timeArray[0]}:${timeArray[1]} am`
        } else if (timeArray[0] >= 12) {
            return `${timeArray[0] - 12}:${timeArray[1]} pm`
        }
    }

    return <>
        {
            showDate.date

                ? <h2 className="datedetailtitle">
                    {ConvertDate(showDate.date)}
                </h2>
                : <></>

        }
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
                                    morning.sort((a, b) => { return a.time.localeCompare(b.time) }).map(item => {
                                        return <div key={`schedule--${item.id}`}> {findTime(item.time)} - {item.description}</div>
                                    })
                                }
                                {

                                    afternoon.sort((a, b) => { return a.time.localeCompare(b.time) }).map(item => {
                                        return <div key={`schedule--${item.id}`}> {findTime(item.time)} - {item.description}</div>
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
                        { showDate.gr_requests
                            ? showDate.gr_requests.map(request => {
                                return <>{request.user?.user?.first_name} requests {request.request}<br /></>
                            })
                            :<></>
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
                        {showDate.guest_requests
                            ? showDate.guest_requests.map(guest => {
                                return <div> {guest.name} - {guest.quantity} tickets</div>
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