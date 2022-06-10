import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { saveNewDate } from "../ApiManager"


export const NewDateForm = () => {
    const [showDate, update] = useState({
        userId: 0,
        date: "",
        venue: "",
        streetAddress: "",
        city: "",
        state: "",
        essentialNotes: "",
        other: ""
    })

    const navigate = useNavigate()

    const localUser = localStorage.getItem("detour_user")
    const userObject = JSON.parse(localUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const newShowToSendToAPI = {
            userId: userObject.id,
            date: showDate.date,
            venue: showDate.venue,
            streetAddress: showDate.streetAddress,
            city: showDate.city,
            state: showDate.state,
            essentialNotes: showDate.essentialNotes,
            other: showDate.other
        }

        return saveNewDate(newShowToSendToAPI)
            .then(() => {
                navigate("/dates")
            })
    }

    return (
        <form className="showForm">
            <h2 className="showForm__title">New Show Date</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Date:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={showDate.date}
                        onChange={
                            (evt) => {
                                const copy = { ...showDate }
                                copy.date = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Venue:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={showDate.venue}
                        onChange={
                            (evt) => {
                                const copy = { ...showDate }
                                copy.venue = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Street Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={showDate.streetAddress}
                        onChange={
                            (evt) => {
                                const copy = { ...showDate }
                                copy.streetAddress = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">City:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={showDate.city}
                        onChange={
                            (evt) => {
                                const copy = { ...showDate }
                                copy.city = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">State:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={showDate.state}
                        onChange={
                            (evt) => {
                                const copy = { ...showDate }
                                copy.state = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Essential Notes:</label>
                    <textarea
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={showDate.essentialNotes}
                        onChange={
                            (evt) => {
                                const copy = { ...showDate }
                                copy.essentialNotes = evt.target.value
                                update(copy)
                            }
                        }></textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Other:</label>
                    <textarea
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={showDate.other}
                        onChange={
                            (evt) => {
                                const copy = { ...showDate }
                                copy.other = evt.target.value
                                update(copy)
                            }
                        }></textarea>
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Add New Date
            </button>
        </form>
    )
}