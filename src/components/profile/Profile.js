import { useEffect, useState } from "react"
import { Col, FormGroup, Input, Label, Row } from "reactstrap"
import { getCustomerProfile, updateCustomerProfile } from "../ApiManager"
import "./Profile.css"

export const ProfileView = () => {

    const localUser = localStorage.getItem("detour_user")
    const userObject = JSON.parse(localUser)

    const [profile, updateProfile] = useState({
        name: "",
        phoneNumber: "",
        emailAddress: "",
        allergies: "",
        greenRoomRequests: "",
        isManager: userObject.isManager
    })
    const [feedback, setFeedback] = useState("")


    useEffect(() => {
        getCustomerProfile(userObject)
            .then((data) => {
                const memberObject = data[0]
                updateProfile(memberObject)
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
                                className="form-control"
                                value={profile.name}
                                onChange={
                                    (evt) => {
                                        const copy = { ...profile }
                                        copy.name = evt.target.value
                                        updateProfile(copy)
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
                                    value={profile.phoneNumber}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...profile }
                                            copy.phoneNumber = evt.target.value
                                            updateProfile(copy)
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
                                    value={profile.emailAddress}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...profile }
                                            copy.emailAddress = evt.target.value
                                            updateProfile(copy)
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
                                    value={profile.allergies}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...profile }
                                            copy.allergies = evt.target.value
                                            updateProfile(copy)
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
                                    value={profile.greenRoomRequests}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...profile }
                                            copy.greenRoomRequests = evt.target.value
                                            updateProfile(copy)
                                        }
                                    }></textarea>
                            </div>
                        </FormGroup>
                    </Col>
                </Row>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    save profile
                </button>
            </form>
        </>
    )
}
