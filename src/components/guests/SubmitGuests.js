import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllDates, saveNewGuest } from "../ApiManager"

export const SubmitGuest = () => {
    const [showDates, setShowDates] = useState([])

    const [guest, update] = useState({
        name: "",
        quantity: 0,
        showDateId: 1
    })

    const navigate = useNavigate()

    const localUser = localStorage.getItem("detour_user")
    const userObject = JSON.parse(localUser)

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
            showDateId: guest.showDateId
        }

        return saveNewGuest(newGuestToSendToAPI)
            .then(() => {
                navigate("/")
            })
    }

    return (
        <form className="showForm">
            <h2 className="showForm__title">New Guest List Spot</h2>
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

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Guest List Spot
            </button>
        </form>
    )
}