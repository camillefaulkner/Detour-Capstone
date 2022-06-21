import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Col, Row } from "reactstrap"
import { getAllDates, saveNewGuest } from "../ApiManager"
import './Guest.css'

export const SubmitGuest = () => {
    const localUser = localStorage.getItem("detour_user")
    const userObject = JSON.parse(localUser)
    const [showDates, setShowDates] = useState([])

    const [guest, update] = useState({
        name: "",
        quantity: 0,
        showDateId: 1,
        userId: userObject.id,
        statusId: 2
    })

    const navigate = useNavigate()

    useEffect(
        () => {
            getAllDates()
                .then((dateArray) => {
                    setShowDates(dateArray)
                })
        }, []
    )

    const handleSaveButtonClick = (event) => {
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
                navigate("/")
            })
    }

    return (
        <>
            <h2 className="showForm__title">New Guest List Spot</h2>
            <form className="guestForm">
                <Row>
                    <Col md={3}>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="description">Name:</label>
                                <input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    value={guest.name}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...guest }
                                            copy.name = evt.target.value
                                            update(copy)
                                        }
                                    } />
                            </div>
                        </fieldset>
                    </Col>
                    <Col md={2}>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="description">How Many Tickets?:</label>
                                <input
                                    required autoFocus
                                    type="number"
                                    className="form-control"
                                    value={guest.quantity}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...guest }
                                            copy.quantity = parseInt(evt.target.value)
                                            update(copy)
                                        }
                                    } />
                            </div>
                        </fieldset>
                    </Col>
                    <Col md={4}>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="description">Select Show: </label>
                                <select onChange={
                                    (evt) => {
                                        const copy = { ...guest }
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
                    </Col>
                </Row>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Submit Guest List Spot
                </button>
            </form>
        </>
    )
}