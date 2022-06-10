import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getUser } from "../ApiManager"

export const CrewProfile = ({ name, phone, email, allergies, greenRoom }) => {
    const { userId } = useParams()
    const [user, setUser] = useState([])

    useEffect(
        () => {
            getUser(userId) 
                .then((data) => {
                    const singleUser = data[0]
                    setUser(singleUser)
                })
        },
        [userId]
    )


    return <>
        Name: {user?.name} <br/>
        Phone: {user?.phoneNumber} <br/>
        Email: {user?.emailAddress} <br/>
        Allergies: {user?.allergies} <br/>
        Green Room: {user?.greenRoomRequests}
       </>
}