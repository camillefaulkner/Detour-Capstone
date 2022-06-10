import { useEffect, useState } from "react"
import { getCustomerProfile, updateCustomerProfile } from "../ApiManager"


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
                setFeedback("Profile has been updated!")
            })

    }

    return (
        <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <form className="profile">
                <h2 className="profile__title">Profile</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="specialty">Name:</label>
                        <input
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
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Phone Number:</label>
                        <input type="text"
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
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Email Address:</label>
                        <input type="text"
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
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Allergies:</label>
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
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Green Room Requests:</label>
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
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Save Profile
                </button>
            </form>
        </>
    )
}
