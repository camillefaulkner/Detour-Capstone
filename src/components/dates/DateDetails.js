import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getDateDetails, getDateDetailsArtist, getGuestRequests, getScheduleItems } from "../ApiManager"
import "./DateList.css"

export const DateDetails = () => {
    const { showDateId } = useParams()
    const [showDate, updateShowDate] = useState({})
    const [guests, setGuests] = useState({})
    const [scheduleItems, setScheduleItems] = useState({})
    const [morning, setMorning] = useState({})
    const [afternoon, setAfternoon] = useState({})

    useEffect(
        () => {
            getDateDetailsArtist(showDateId)
                .then((data) => {
                    const singleShowDate = data[0]
                    updateShowDate(singleShowDate)
                })
            getGuestRequests(showDateId)
                .then((guestArray) => {
                    setGuests(guestArray)
                })
            getScheduleItems(showDateId)
                .then((scheduleArray) => {
                    setScheduleItems(scheduleArray)
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
                <h4>Essential Day Notes:</h4>
                {showDate?.essentialNotes}</div>
                

            <div className="schedule">
                <h4>Schedule:</h4>
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
                    <h4>Additional Information:</h4>
                    {showDate?.other}</div>
                <div>
                    <h4>Guest List:</h4>
                    {guests.length
                        ? guests.map(guest => {
                            return <div key={`guest--${guest.id}`}> {guest.name} - {guest.quantity} tickets</div>
                        })
                        : <></>
                    }
                </div>
            </section>
        </section>
    </>
}