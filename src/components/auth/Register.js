import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getHandleRegister, saveNewUser } from "../ApiManager"
import { Button, Col, Input, Label, Row } from "reactstrap"
import "./Login.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        name: "",
        phoneNumber: "",
        emailAddress: "",
        allergies: "",
        greenRoomRequests: "",
        isManager: false
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return saveNewUser(user)
        .then(data => {
            if (data.valid) {
                localStorage.setItem("dt_token", data.token)
                localStorage.setItem("dt_manager", data.manager)
                localStorage.setItem("dt_currentuser", data.current_user)
                navigate("/map")
            }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return getHandleRegister(user)
            .then(response => {
                if (response.length > 0) {
                    window.alert("Account with that email address already exists")
                }
                else {
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main className="registerlogin" style={{ textAlign: "center" }}>
            <form onSubmit={handleRegister}>
                <h3 className="registertitle">please register for detour</h3>
                <Row>
                    <Col md={3}>
                        <fieldset>
                            <label htmlFor="fullName"> full name </label>
                            <input onChange={updateUser}
                                type="text" id="name" className="form-control"
                                placeholder="Enter your name" required autoFocus />
                        </fieldset>
                    </Col>
                    <Col md={4}>
                        <fieldset>
                            <label htmlFor="phoneNumber"> phone number </label>
                            <input onChange={updateUser}
                                type="phoneNumber" id="phoneNumber" className="form-control"
                                placeholder="Phone Number" required />
                        </fieldset>
                    </Col>
                    <Col md={5}>
                        <fieldset>
                            <label htmlFor="email"> email address </label>
                            <input onChange={updateUser}
                                type="email" id="emailAddress" className="form-control"
                                placeholder="Email address" required />
                        </fieldset>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <fieldset>
                            <label htmlFor="allergies"> allergies </label>
                            <textarea
                                type="text"
                                style={{
                                    height: "7rem"
                                }} onChange={updateUser}
                                id="allergies" className="form-control"
                                placeholder="If none, type 'none'" required></textarea>
                        </fieldset>
                    </Col>
                    <Col md={5}>
                        <fieldset>
                            <label htmlFor="greenroom"> green room requests</label>
                            <textarea
                                type="text"
                                style={{
                                    height: "7rem"
                                }} onChange={updateUser}
                                id="greenRoomRequests" className="form-control"
                                placeholder="Green room requests" required></textarea>
                        </fieldset>
                    </Col>
                </Row>
                <fieldset className="imamgr">
                    <input onChange={(evt) => {
                        const copy = { ...user }
                        copy.isManager = evt.target.checked
                        setUser(copy)
                    }}
                        type="checkbox" id="isManager" />
                    <label htmlFor="email"> i am a tour manager </label>
                </fieldset>
                <fieldset>
                    <Button type="submit"> Register </Button>
                </fieldset>

            </form>
        </main>
    )
}