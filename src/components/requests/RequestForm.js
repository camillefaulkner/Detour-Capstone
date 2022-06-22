import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input, Label } from "reactstrap"
import { getAllDates, getAllRequests, getUserGuestRequests, getUserRequests, saveNewGuest, saveRequest } from "../ApiManager"

export const SubmitRequest = () => {
    const localUser = localStorage.getItem("detour_user")
    const userObject = JSON.parse(localUser)

    const [request, update] = useState({
        userId: userObject.id,
        type: "",
        request: "",
        showDateId: 1,
        statusId: 1
    })

    const [guest, updateGuest] = useState({
        name: "",
        quantity: 0,
        showDateId: 1,
        userId: userObject.id,
        statusId: 1
    })


    const [guestForm, setGuestForm] = useState(false)
    const [greenRoomForm, setGreenRoomForm] = useState(false)
    const [showDates, setShowDates] = useState([])
    const [userRequests, setUserRequests] = useState([])
    const [allGuestRequests, setAllGuestRequests] = useState([])

    useEffect(
        () => {
            getAllDates()
                .then((dateArray) => {
                    setShowDates(dateArray)
                })
            getUserRequests(userObject.id)
                .then((requestArray) => {
                    setUserRequests(requestArray)
                })
            getUserGuestRequests(userObject.id)
                .then((guestArray) => {
                    setAllGuestRequests(guestArray)
                })
        }, []
    )

    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const requestToSendToAPI = {
            userId: userObject.id,
            type: request.type,
            request: request.request,
            showDateId: request.showDateId,
            statusId: request.statusId
        }

        return saveRequest(requestToSendToAPI)
            .then(() => {
                getUserRequests(userObject.id)
                    .then((requestArray) => {
                        setUserRequests(requestArray)
                    })
            })
    }


    const handleSaveGuestClick = (event) => {
        event.preventDefault()

        const newGuestToSendToAPI = {
            name: guest.name,
            quantity: guest.quantity,
            showDateId: guest.showDateId,
            statusId: guest.statusId,
            userId: guest.userId
        }

        return saveNewGuest(newGuestToSendToAPI)
            .then(() => {
                getUserGuestRequests(userObject.id)
                    .then((requestArray) => {
                        setAllGuestRequests(requestArray)
                    })
            })
    }


    let foundStatus = (statusId) => {
        if (statusId === 1) {
            return <>pending</>
        } else if (statusId === 3) {
            return <>denied</>
        }
        else if (statusId === 2) {
            return <>confirmed</>
        }
    }


    return (
        <>
            <h2 className="showForm__title">new request</h2>
            <div className="requestcontainer">
                <div className="left">
                    <form>
                        <fieldset>
                            <div className="requestform">
                                <h3>type:</h3>

                                <Input
                                    type="radio"
                                    name="radio"
                                    value="green room request"
                                    onChange={
                                        (evt) => {
                                            const copy = { ...request }
                                            copy.type = evt.target.value
                                            update(copy)
                                            setGreenRoomForm(true)
                                            setGuestForm(false)
                                        }
                                    } />
                                <Label htmlFor="description">green room request:</Label>

                                <Input
                                    type="radio"
                                    name="radio"
                                    value="guest list request"
                                    onChange={
                                        (evt) => {
                                            const copy = { ...request }
                                            copy.type = evt.target.value
                                            update(copy)
                                            setGuestForm(true)
                                            setGreenRoomForm(false)
                                        }
                                    } />
                                <Label htmlFor="description">guest list request:</Label>
                            </div>
                        </fieldset>
                        {
                            greenRoomForm === true
                                ? <>
                                    <fieldset>
                                        <h2 className="showForm__title">new green room request</h2>
                                        <div className="form-group">
                                            <label htmlFor="description">request:</label>
                                            <textarea
                                                type="text"
                                                style={{
                                                    height: "10rem"
                                                }}
                                                className="form-control"
                                                value={request.request}
                                                onChange={
                                                    (evt) => {
                                                        const copy = { ...request }
                                                        copy.request = evt.target.value
                                                        update(copy)
                                                    }
                                                }></textarea>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group">
                                            <label htmlFor="description">select show: </label>
                                            <select onChange={
                                                (evt) => {
                                                    const copy = { ...request }
                                                    copy.showDateId = parseInt(evt.target.value)
                                                    update(copy)
                                                }
                                            } name="shows" id="shows">
                                                {
                                                    showDates.map(date => {
                                                        return <option key={`date--${date.id}`} value={date.id}>{date.date} - {date.venue}</option>
                                                    })
                                                }

                                            </select>
                                        </div>
                                    </fieldset>
                                    <button
                                        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                                        className="btn btn-primary">submit request</button>
                                </>
                                : <></>
                        }
                        {
                            guestForm === true
                                ? <>
                                    <form className="showForm">
                                        <h2 className="showForm__title">new guest list spot request</h2>
                                        <fieldset>
                                            <div className="form-group">
                                                <label htmlFor="description">name:</label>
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
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <div className="form-group">
                                                <label htmlFor="description">how many tickets?:</label>
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
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <div className="form-group">
                                                <label htmlFor="description">select show: </label>
                                                <select onChange={
                                                    (evt) => {
                                                        const copy = { ...guest }
                                                        copy.showDateId = parseInt(evt.target.value)
                                                        updateGuest(copy)
                                                    }
                                                } name="shows" id="shows">
                                                    {
                                                        showDates.map(date => {
                                                            return <option key={`date--${date.id}`} value={date.id}>{date.date} - {date.venue}</option>
                                                        })
                                                    }

                                                </select>
                                            </div>
                                        </fieldset>

                                        <button
                                            onClick={(clickEvent) => handleSaveGuestClick(clickEvent)}
                                            className="btn btn-primary">
                                            submit guest list request
                                        </button>
                                    </form>
                                </>
                                : <></>
                        }
                    </form>
                </div>
                <div className="right">
                    <h2>all requests:</h2>
                    {userRequests
                        ? userRequests.map(request => {
                            let foundShow = showDates.find((show) => {
                                return show.id === request.showDateId
                            })
                            return <>{request.request} for {foundShow.venue} {foundShow.date} - {foundStatus(request.statusId)}<br />
                            </>
                        })
                        : <></>
                    }
                    {
                        allGuestRequests
                            ? allGuestRequests.map(request => {
                                let foundShow = showDates.find((show) => {
                                    return show.id === request.showDateId
                                })
                                return <>
                                    {request.name} - {request.quantity} tickets for {foundShow.venue} {foundShow.date} - {foundStatus(request.statusId)}<br />
                                </>
                            })
                            : <></>
                    }
                </div>
            </div>
        </>
    )
}