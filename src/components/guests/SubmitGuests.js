import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Col, Row } from "reactstrap"
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
            <h2 className="guestForm__title">new guest list spot</h2>
            <form className="guestForm">
                <Row>
                    <Col md={4}>
                        <div className="newguestname">
                            <fieldset>
                                <div className="form-group">
                                    <label htmlFor="description">name:</label>
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
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="newguestticket">
                            <fieldset>
                                <div className="form-group">
                                    <label htmlFor="description">how many tickets?:</label>
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
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="newguestshow">
                            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                <InputLabel id="simple-select" htmlFor="description">select show: </InputLabel>
                                <Select
                                    className="guestselect"
                                    labelId="simple-select"
                                    label="select show" onChange={
                                    (evt) => {
                                        const copy = { ...guest }
                                        copy.showDateId = parseInt(evt.target.value)
                                        update(copy)
                                    }
                                } name="shows" id="shows">
                                    {
                                        showDates.sort((a, b) => { return new Date(a.date) - new Date(b.date) }).map(date => {
                                            return <MenuItem key={`date--${date.id}`} value={date.id}>{date.date} - {date.venue}</MenuItem>
                                        })
                                    }

                                </Select>
                            </FormControl>
                        </div>
                    </Col>
                </Row>
                <Button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="newguestbutton">
                    Submit Guest List Spot
                </Button>
            </form>
        </>
    )
}