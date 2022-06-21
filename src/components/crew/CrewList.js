import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Row } from "reactstrap"
import { getAllUsers } from "../ApiManager"
import { Crew } from "./Crew"
import "./Crew.css"

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

    

    return <Accordion open="1" toggle={function noRefCheck(){}}>
        {
            users.map(user => {
                return <>
                    <AccordionItem>
                        <AccordionHeader targetId="">{user.name}</AccordionHeader>
                        <AccordionBody accordionId="">
                            {user.name}
                            {user.phoneNumber}
                            {user.emailAddress}
                            {user.allergies}
                            {user.greenRoomRequests}
                        </AccordionBody>
                    </AccordionItem>
                </>
            })
        }

    </Accordion >
}