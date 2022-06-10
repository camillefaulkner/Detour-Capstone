import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getHandleRegister, saveNewUser } from "../ApiManager"

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
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("detour_user", JSON.stringify({
                        id: createdUser.id,
                        manager: createdUser.isManager
                    }))

                    navigate("/")
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
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Detour</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateUser}
                           type="text" id="name" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="phoneNumber"> Phone Number </label>
                    <input onChange={updateUser}
                        type="phoneNumber" id="phoneNumber" className="form-control"
                        placeholder="Phone Number" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="emailAddress" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="allergies"> Allergies </label>
                    <input onChange={updateUser}
                        type="allergies" id="allergies" className="form-control"
                        placeholder="If none, type 'none'" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="greenroom"> Green Room Requests</label>
                    <input onChange={updateUser}
                        type="greenroom" id="greenRoomRequests" className="form-control"
                        placeholder="Green room requests" required />
                </fieldset>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = {...user}
                        copy.isManager = evt.target.checked
                        setUser(copy)
                    }}
                        type="checkbox" id="isManager" />
                    <label htmlFor="email"> I am a Tour Manager </label>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}