import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDateDetailsManager, getGuestRequests, getScheduleItems, saveNewGuest, saveNewScheduleItem, updateShowDate } from "../ApiManager"

export const DateEdit = () => {
    const { showDateId } = useParams()
    const navigate = useNavigate()
    const [guests, setGuests] = useState({})
    const [scheduleItems, setScheduleItems] = useState({})
    const [morning, setMorning] = useState({})
    const [afternoon, setAfternoon] = useState({})

    const [showDate, assignShowDate] = useState({
        userId: 0,
        date: "",
        venue: "",
        streetAddress: "",
        city: "",
        state: "",
        essentialNotes: "",
        other: ""
    })

    const [guest, updateGuest] = useState({
        name: "",
        quantity: 0,
        showDateId: parseInt(showDateId)
    })

    const [scheduleItem, updateScheduleItem] = useState({
        time: "",
        timeDetail: "",
        description: "",
        showDateId: parseInt(showDateId)
    })


    useEffect(
        () => {
            getDateDetailsManager(showDateId)
                .then((dateArray) => {
                    assignShowDate(dateArray)
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

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        return updateShowDate(showDate)
            .then(() => {
                navigate("/dates")
            })
    }

    const handleSaveScheduleClick = (event) => {
        event.preventDefault()
        return saveNewScheduleItem(scheduleItem)
            .then(() => {
                getScheduleItems(showDateId)
                    .then((scheduleArray) => {
                        setScheduleItems(scheduleArray)
                    })
            })
    }

    const handleSaveGuestClick = (event) => {
        event.preventDefault()
        return saveNewGuest(guest)
            .then(() => {
                getGuestRequests(showDateId)
                    .then((guestArray) => {
                        setGuests(guestArray)
                    })
            })
    }


    return <>
        <form className="showDateForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Date:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={showDate.date}
                        onChange={
                            (evt) => {
                                const copy = { ...showDate }
                                copy.date = evt.target.value
                                assignShowDate(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Venue:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={showDate.venue}
                        onChange={
                            (evt) => {
                                const copy = { ...showDate }
                                copy.venue = evt.target.value
                                assignShowDate(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Street Address:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={showDate.streetAddress}
                        onChange={
                            (evt) => {
                                const copy = { ...showDate }
                                copy.streetAddress = evt.target.value
                                assignShowDate(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">City:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={showDate.city}
                        onChange={
                            (evt) => {
                                const copy = { ...showDate }
                                copy.city = evt.target.value
                                assignShowDate(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">State:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={showDate.state}
                        onChange={
                            (evt) => {
                                const copy = { ...showDate }
                                copy.state = evt.target.value
                                assignShowDate(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Essential Notes:</label>
                    <textarea
                        type="text"
                        style={{
                            height: "10rem"
                        }}
                        className="form-control"
                        value={showDate.essentialNotes}
                        onChange={
                            (evt) => {
                                const copy = { ...showDate }
                                copy.essentialNotes = evt.target.value
                                assignShowDate(copy)
                            }
                        }>{showDate.essentialNotes}</textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Other:</label>
                    <textarea
                        type="text"
                        style={{
                            height: "10rem"
                        }}
                        className="form-control"
                        value={showDate.other}
                        onChange={
                            (evt) => {
                                const copy = { ...showDate }
                                copy.other = evt.target.value
                                assignShowDate(copy)
                            }
                        }>{showDate.other}</textarea>
                </div>
            </fieldset>

            <div className="schedule">
                <h4>Schedule:</h4>
                {
                    morning.length || afternoon.length
                        ?
                        <>
                            {
                                morning.sort((a, b) => { return a.time - b.time }).map(item => {
                                    return <div key={`schedule--${item.id}`}> {item.time}{item.timeDetail} - {item.description}
                                        <button onClick={(evt) => {
                                            evt.preventDefault()

                                            fetch(`http://localhost:8088/scheduleItems/${item.id}`, {
                                                method: "DELETE"
                                            })
                                                .then(() => {
                                                    getScheduleItems(showDateId)
                                                        .then((scheduleArray) => {
                                                            setScheduleItems(scheduleArray)
                                                        })
                                                })

                                        }}>Delete</button></div>
                                })
                            }
                            {

                                afternoon.sort((a, b) => { return a.time - b.time }).map(item => {
                                    return <div key={`schedule--${item.id}`}> {item.time}{item.timeDetail} - {item.description}
                                        <button onClick={(evt) => {
                                            evt.preventDefault()

                                            fetch(`http://localhost:8088/scheduleItems/${item.id}`, {
                                                method: "DELETE"
                                            })
                                                .then(() => {
                                                    getScheduleItems(showDateId)
                                                        .then((scheduleArray) => {
                                                            setScheduleItems(scheduleArray)
                                                        })
                                                })

                                        }}>Delete</button></div>
                                })
                            }
                        </>
                        : <></>
                }
                <fieldset>
                    <div className="form-group">
                        <h4>Submit New Schedule Line Item</h4>
                        <label htmlFor="description">Time:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={scheduleItem.time}
                            onChange={
                                (evt) => {
                                    const copy = { ...scheduleItem }
                                    copy.time = evt.target.value
                                    updateScheduleItem(copy)
                                }
                            } />
                        <input onChange={
                            (evt) => {
                                const copy = { ...scheduleItem }
                                copy.timeDetail = evt.target.value
                                updateScheduleItem(copy)
                            } 
                        } type="radio" id="am" name="fav_language" value="am"/>
                            <label htmlFor="am">am</label>
                        <input onChange={
                            (evt) => {
                                const copy = { ...scheduleItem }
                                copy.timeDetail = evt.target.value
                                updateScheduleItem(copy)
                            } 
                        } type="radio" id="pm" name="fav_language" value="pm"/>
                            <label htmlFor="pm">pm</label><br/>
                                    <label htmlFor="description">Description:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={scheduleItem.description}
                                        onChange={
                                            (evt) => {
                                                const copy = { ...scheduleItem }
                                                copy.description = evt.target.value
                                                updateScheduleItem(copy)
                                            }
                                        } />
                                    <button onClick={(clickEvent) => handleSaveScheduleClick(clickEvent)}
                                        className="btn btn-primary">Add New Schedule Item</button>
                                </div>
                            </fieldset>
                    </div>

                    <div>
                        <h4>Guest List:</h4>
                        {guests.length
                            ? guests.map(guest => {
                                return <div key={`guest--${guest.id}`}> {guest.name} - {guest.quantity} tickets
                                    <button onClick={(evt) => {
                                        evt.preventDefault()

                                        fetch(`http://localhost:8088/guestRequests/${guest.id}`, {
                                            method: "DELETE"
                                        })
                                            .then(() => {
                                                getGuestRequests(showDateId)
                                                    .then((guestArray) => {
                                                        setGuests(guestArray)
                                                    })
                                            })

                                    }}>Delete</button></div>
                            })
                            : <></>
                        }
                        <fieldset>
                            <div className="form-group">
                                <h4>Submit New Guest Spot:</h4>
                                <label htmlFor="description">Name:</label>
                                <input

                                    type="text"
                                    className="form-control"
                                    value={guest.name}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...guest }
                                            copy.name = evt.target.value
                                            updateGuest(copy)
                                        }
                                    } />
                                <label htmlFor="description">How Many Tickets?:</label>
                                <input

                                    type="number"
                                    className="form-control"
                                    value={guest.quantity}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...guest }
                                            copy.quantity = parseInt(evt.target.value)
                                            updateGuest(copy)
                                        }
                                    } />
                                <button onClick={(clickEvent) => handleSaveGuestClick(clickEvent)}
                                    className="btn btn-primary">Add New Guest Spot</button>
                            </div>
                        </fieldset>
                    </div>


                    <button
                        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                        className="btn btn-primary">
                        Save Show Details
                    </button>
                </form>
            </>
}