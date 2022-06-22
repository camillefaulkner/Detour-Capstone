import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap"
import { saveNewDate } from "../ApiManager"
import "./DateForm.css"


export const NewDateForm = ({ retrieveDates }) => {
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
                retrieveDates()
                navigate("/dates")
            })
    }

    return (
        <form className="showForm">
            <h2 className="showForm__title">new show date</h2>
            <div className="formbox">
                <Row>
                    <Col md={3}>
                        <FormGroup>
                            <div className="form-group">
                                <Label htmlFor="description">date:</Label>
                                <Input
                                    required autoFocus
                                    type="date"
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
                        </FormGroup>
                    </Col>
                    <Col md={5}>
                        <FormGroup>
                            <div className="form-group">
                                <Label htmlFor="description">venue:</Label>
                                <Input
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
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={5}>
                        <FormGroup>
                            <div className="form-group">
                                <Label htmlFor="description">street address:</Label>
                                <Input
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
                        </FormGroup>
                    </Col>
                    <Col md={5}>
                        <FormGroup>
                            <div className="form-group">
                                <Label htmlFor="description">city:</Label>
                                <Input
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
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <div className="form-group">
                                <Label htmlFor="description">state:</Label>
                                <Input
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
                        </FormGroup>
                    </Col>
                </Row>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">essential notes:</label>
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
                        <label htmlFor="description">other:</label>
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
                <Button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} color="danger" outline className="addshowbutton">
                    add new date
                </Button>
            </div>
        </form>
    )
}