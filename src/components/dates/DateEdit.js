import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap"
import { getAllUsers, getApprovedGuestRequests, getApprovedRequests, getDateDetailsManager, getGuestRequests, getRequests, getScheduleItems, saveNewGuest, saveNewScheduleItem, updateShowDate } from "../ApiManager"
import "./DateForm.css"

export const DateEdit = ({ retrieveDates }) => {
    const { showDateId } = useParams()
    const navigate = useNavigate()
    const [guests, setGuests] = useState({})
    const [scheduleItems, setScheduleItems] = useState({})
    const [morning, setMorning] = useState({})
    const [afternoon, setAfternoon] = useState({})
    const [requests, setRequests] = useState({})
    const [users, setUsers] = useState({})

    const localUser = localStorage.getItem("detour_user")
    const userObject = JSON.parse(localUser)

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
        showDateId: parseInt(showDateId),
        userId: userObject.id,
        statusId: 2
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
            getApprovedGuestRequests(showDateId)
                .then((guestArray) => {
                    setGuests(guestArray)
                })
            getScheduleItems(showDateId)
                .then((scheduleArray) => {
                    setScheduleItems(scheduleArray)
                })
            getApprovedRequests(showDateId)
                .then((requestArray) => {
                    setRequests(requestArray)
                })
            getAllUsers()
                .then((userArray) => {
                    setUsers(userArray)
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
                retrieveDates()
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

    const populateValue = (showDate) => {
        let value = `${showDate.other}\n`
        if (requests.length && users.length) {
            requests.map(request => {
                let foundUser = users.find((user) => {
                    return user.id === request.userId
                })
                console.log(request)
                value += `${foundUser?.name} requests ${request.request}\n`
            })
        }
        return value
    }


    return <>
        <form className="showForm">
        <h2 className="showForm__title">Show Date Edit</h2>
            <div className="formbox">
                <Row>
                    <Col md={3}>
                        <FormGroup>
                            <div className="form-group">
                                <Label htmlFor="description">Date:</Label>
                                <Input
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
                        </FormGroup>
                    </Col>
                    <Col md={5}>
                        <FormGroup>
                            <div className="form-group">
                                <Label htmlFor="description">Venue:</Label>
                                <Input
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
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={5}>
                        <FormGroup>
                            <div className="form-group">
                                <Label htmlFor="description">Street Address:</Label>
                                <Input
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
                        </FormGroup>
                    </Col>
                    <Col md={5}>
                        <FormGroup>
                            <div className="form-group">
                                <Label htmlFor="description">City:</Label>
                                <Input
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
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <div className="form-group">
                                <Label htmlFor="description">State:</Label>
                                <Input
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
                        </FormGroup>
                    </Col>
                </Row>
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
                            value={populateValue(showDate)}
                            onChange={
                                (evt) => {
                                    const copy = { ...showDate }
                                    copy.other = evt.target.value
                                    assignShowDate(copy)
                                }
                            }>{showDate.other}

                        </textarea>
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
                                            <Button close onClick={(evt) => {
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

                                            }} /></div>
                                    })
                                }
                                {

                                    afternoon.sort((a, b) => { return a.time - b.time }).map(item => {
                                        return <div key={`schedule--${item.id}`}> {item.time}{item.timeDetail} - {item.description}
                                            <Button close onClick={(evt) => {
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

                                            }} /></div>
                                    })
                                }
                            </>
                            : <></>
                    }
                    <fieldset>
                        <div className="form-group">
                            <h4>Submit New Schedule Line Item</h4>
                            <Row>
                                <Col md={2}>
                                    <Label htmlFor="description">Time:</Label>
                                    <Input
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
                                </Col>
                                <Col md={2}>
                                    <Input onChange={
                                        (evt) => {
                                            const copy = { ...scheduleItem }
                                            copy.timeDetail = evt.target.value
                                            updateScheduleItem(copy)
                                        }
                                    } type="radio" id="am" name="fav_language" value="am" />
                                    <Label htmlFor="am">am</Label>
                                </Col>
                                <Col md={2}>
                                    <Input onChange={
                                        (evt) => {
                                            const copy = { ...scheduleItem }
                                            copy.timeDetail = evt.target.value
                                            updateScheduleItem(copy)
                                        }
                                    } type="radio" id="pm" name="fav_language" value="pm" />
                                    <Label htmlFor="pm">pm</Label><br />
                                </Col>
                            </Row>
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
                                <Button close onClick={(evt) => {
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

                                }} /></div>
                        })
                        : <></>
                    }
                    <fieldset>
                        <div className="form-group">
                            <h4>Submit New Guest Spot:</h4>
                            <Row>
                                <Col md={3}>
                                    <Label htmlFor="description">Name:</Label>
                                    <Input

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
                                </Col>
                                <Col md={3}>
                                    <Label htmlFor="description">How Many Tickets?:</Label>
                                    <Input

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
                                </Col>
                            </Row>
                            <button onClick={(clickEvent) => handleSaveGuestClick(clickEvent)}
                                className="btn btn-primary">Add New Guest Spot</button>
                        </div>
                    </fieldset>
                </div>

                <Button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="addshowbutton">
                    Save Show Details
                </Button>
            </div>
        </form>
    </>
}