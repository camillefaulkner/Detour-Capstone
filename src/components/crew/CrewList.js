import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAllUsers } from "../ApiManager"
import { Crew } from "./Crew"

export const CrewList = () => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const localUser = localStorage.getItem("detour_user")
    const userObject = JSON.parse(localUser)

    useEffect(
        () => {
            getAllUsers()
                .then((userArray) => {
                    setUsers(userArray)
                })
        }, []
    )

    return <article className="userlist">
        {
            users.map(user => <Crew key={`user--${user.id}`}
                id={user.id}
                name={user.name}
                phone={user.phoneNumber}
                email={user.emailAddress}
                allergies={user.allergies}
                greenRoom={user.greenRoomRequests} />)
        }

    </article>
}