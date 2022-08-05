import { useEffect, useState } from "react"
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap"
import { getCustomerProfile, updateCustomerProfile } from "../ApiManager"
import "./Profile.css"

export const ProfileView = () => {

    const localUser = localStorage.getItem("dt_manager")
    const localUserId = localStorage.getItem("dt_currentuser")

    const [profile, updateProfile] = useState({
        first_name: "",
        phone_number: "",
        email: "",
        allergies: "",
        greenroom_requests: "",
        is_staff: localUser
    })
    const [feedback, setFeedback] = useState("")


    useEffect(() => {
        getCustomerProfile(localUserId)
            .then((data) => {
                updateProfile(data)
            })
    }, [])

    useEffect(() => {
        if (feedback !== "") {
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return updateCustomerProfile(profile)
            .then(() => {
                setFeedback("profile has been updated!")
            })

    }

    const changeProfileState = (domEvent) => {
        const copy = { ...profile }
        copy[domEvent.target.name] = domEvent.target.value
        updateProfile(copy)
    }

    const changeUserState = (domEvent) => {
        const copy = { ...profile }
        copy.user[domEvent.target.name] = domEvent.target.value
        updateProfile(copy)
    }

    return (
        <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
                <h2 className="profile__title">profile</h2>
            <form className="profile">
                <Col md={4}>
                    <FormGroup>
                        <div className="form-group">
                            <Label htmlFor="specialty">name:</Label>
                            <Input
                                required autoFocus
                                type="text"
                                name="first_name"
                                className="form-control"
                                value={profile.user?.first_name}
                                onChange={
                                    (evt) => {
                                        changeUserState(evt)
                                    }
                                } />
                        </div>
                    </FormGroup>
                </Col>
                <Row>
                    <Col md={3}>
                        <FormGroup>
                            <div className="form-group">
                                <Label htmlFor="name">phone number:</Label>
                                <Input type="text"
                                    className="form-control"
                                    name="phone_number"
                                    value={profile.phone_number}
                                    onChange={
                                        (evt) => {
                                            changeProfileState(evt)
                                        }
                                    } />
                            </div>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <div className="form-group">
                                <Label htmlFor="name">email address:</Label>
                                <Input type="text"
                                    className="form-control"
                                    name="email"
                                    value={profile.user?.email}
                                    onChange={
                                        (evt) => {
                                            changeUserState(evt)
                                        }
                                    } />
                            </div>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <FormGroup>
                            <div className="form-group">
                                <Label htmlFor="name">allergies:</Label>
                                <textarea type="text"
                                    className="form-control"
                                    name="allergies"
                                    value={profile.allergies}
                                    onChange={
                                        (evt) => {
                                            changeProfileState(evt)
                                        }
                                    }></textarea>
                            </div>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <div className="form-group">
                                <Label htmlFor="name">green room requests:</Label>
                                <textarea type="text"
                                    className="form-control"
                                    name="greenroom_requests"
                                    value={profile.greenroom_requests}
                                    onChange={
                                        (evt) => {
                                            changeProfileState(evt)
                                        }
                                    }></textarea>
                            </div>
                        </FormGroup>
                    </Col>
                </Row>
                <Button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    save profile
                </Button>
            </form>
        </>
    )
}
