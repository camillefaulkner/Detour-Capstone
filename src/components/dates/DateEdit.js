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
                value += `${foundUser?.name} requests ${request.request}\n`
            })
        }
        return value
    }


    return <>
        <form className="showForm">
            <h2 className="showForm__title">edit show date</h2>
            <div className="formbox">
                <Row>
                    <Col md={3}>
                        <FormGroup>
                            <div className="form-group">
                                <Label htmlFor="description">date:</Label>
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
                                <Label htmlFor="description">venue:</Label>
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
                                <Label htmlFor="description">street address:</Label>
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
                                <Label htmlFor="description">city:</Label>
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
                                <Label htmlFor="description">state:</Label>
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
                        <label htmlFor="description">essential notes:</label>
                        <textarea
                            type="text"
                            style={{
                                height: "7rem"
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
                        <label htmlFor="description">other:</label>
                        <textarea
                            type="text"
                            style={{
                                height: "7rem"
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
                <hr></hr>
                <button className="schedulecollapsible" onClick={(clickEvent) => {
                    clickEvent.preventDefault()
                    const itemClicked = clickEvent.target
                    itemClicked.classList.toggle("scheduleactive");
                    var content = itemClicked.nextElementSibling
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                }
                }><h4>schedule:</h4></button>
                <div className="schedulecontent">
                    <div className="schedule">
                        {
                            morning.length || afternoon.length
                                ?
                                <>
                                    {
                                        morning.sort((a, b) => { return a.time - b.time }).map(item => {
                                            return <div key={`schedule--${item.id}`}> {item.time}{item.timeDetail} - {item.description}
                                                <Button className="dateeditclose" color="danger" close onClick={(evt) => {
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

                                                }} /><hr></hr></div>
                                        })
                                    }
                                    {

                                        afternoon.sort((a, b) => { return a.time - b.time }).map(item => {
                                            return <div key={`schedule--${item.id}`}> {item.time}{item.timeDetail} - {item.description}
                                                <Button className="dateeditclose" close onClick={(evt) => {
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

                                                }} /><hr></hr></div>
                                        })
                                    }
                                </>
                                : <></>
                        }
                    </div>
                    <fieldset>
                        <div className="newschedule">
                            <h4>new schedule line item</h4>
                            <Row>
                                <Col md={2}>
                                    <Label htmlFor="description">time:</Label>
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
                                    <div className="radio">
                                        <Input onChange={
                                            (evt) => {
                                                const copy = { ...scheduleItem }
                                                copy.timeDetail = evt.target.value
                                                updateScheduleItem(copy)
                                            }
                                        } type="radio" id="am" name="fav_language" value="am" />
                                        <Label htmlFor="am">am</Label>
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <div className="radio">
                                        <Input onChange={
                                            (evt) => {
                                                const copy = { ...scheduleItem }
                                                copy.timeDetail = evt.target.value
                                                updateScheduleItem(copy)
                                            }
                                        } type="radio" id="pm" name="fav_language" value="pm" />
                                        <Label htmlFor="pm">pm</Label><br />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <label htmlFor="description">description:</label>
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
                                </Col>
                            </Row>
                            <Button onClick={(clickEvent) => handleSaveScheduleClick(clickEvent)}
                                className="dateeditschedule">add new schedule item</Button>
                        </div>
                    </fieldset>
                </div>
                <hr></hr>
                <div>
                    <button className="schedulecollapsible" onClick={(clickEvent) => {
                        clickEvent.preventDefault()
                        const itemClicked = clickEvent.target
                        itemClicked.classList.toggle("scheduleactive");
                        var content = itemClicked.nextElementSibling
                        if (content.style.maxHeight) {
                            content.style.maxHeight = null;
                        } else {
                            content.style.maxHeight = content.scrollHeight + "px";
                        }
                    }
                    }><h4>guest list:</h4> </button>
                    <div className="schedulecontent">
                        <div className="guestform">
                            {guests.length
                                ? guests.map(guest => {
                                    return <div key={`guest--${guest.id}`}> {guest.name} - {guest.quantity} tickets
                                        <Button className="dateeditclose" close onClick={(evt) => {
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

                                        }} /><hr></hr></div>
                                })
                                : <></>
                            }
                        </div>
                        <fieldset>
                            <div className="newguest">
                                <h4>new guest spot:</h4>
                                <Row>
                                    <Col md={3}>
                                        <Label htmlFor="description">name:</Label>
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
                                        <Label htmlFor="description">how many tickets?:</Label>
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
                                <Button onClick={(clickEvent) => handleSaveGuestClick(clickEvent)}
                                    className="dateeditschedule">add new guest spot</Button>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <Button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="addshowbutton">
                    save show details
                </Button>
            </div>
        </form>
    </>
}