import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllDates, getAllRequests, getUserGreenRoomRequests, getUserRequests, saveNewGuest, saveRequest } from "../ApiManager"

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
    const [userGreenRoomRequests, setUserGreenRoomRequests] = useState([])

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
            getUserGreenRoomRequests(userObject.id)
                .then((requestArray) => {
                    setUserGreenRoomRequests(requestArray)
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
                getUserGreenRoomRequests(userObject.id)
                    .then((requestArray) => {
                        setUserGreenRoomRequests(requestArray)
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
            <form className="showForm">
                <h2 className="showForm__title">New Request:</h2>
                <fieldset>
                    <div className="form-group">
                        <h3>Type:</h3>
                        <label htmlFor="description">green room request:</label>
                        <input
                            type="radio"
                            className="form-control"
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
                        <label htmlFor="description">guest list request:</label>
                        <input
                            type="radio"
                            className="form-control"
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
                    </div>
                </fieldset>
                {
                    greenRoomForm === true
                        ? <>
                            <fieldset>
                            <h2 className="showForm__title">New Green Room Request</h2>
                                <div className="form-group">
                                    <label htmlFor="description">Request:</label>
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
                                    <label htmlFor="description">Select Show: </label>
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
                                className="btn btn-primary">Submit Request</button>
                        </>
                        : <></>
                }
                {
                    guestForm === true
                        ? <>
                            <form className="showForm">
                                <h2 className="showForm__title">New Guest List Spot</h2>
                                <fieldset>
                                    <div className="form-group">
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
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div className="form-group">
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
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="description">Select Show: </label>
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
                                    Submit Guest List Spot
                                </button>
                            </form>
                        </>
                        : <></>
                }
            </form>
            <h2>All Requests:</h2>
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
                userGreenRoomRequests
                    ? userGreenRoomRequests.map(request => {
                        let foundShow = showDates.find((show) => {
                            return show.id === request.showDateId
                        })
                        return <>
                            {request.name} - {request.quantity} tickets for {foundShow.venue} {foundShow.date} - {foundStatus(request.statusId)}<br />
                        </>
                    })
                    : <></>
            }
        </>
    )
}