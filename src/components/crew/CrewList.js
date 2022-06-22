import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
// import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Row } from "reactstrap"
import { getAllUsers } from "../ApiManager"
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



    return <>
        <h2 className="title">crew</h2>
        {
            users.map(user => {
                return <>
                    <div className="crewmember">
                        <button className="collapsible" onClick={(clickEvent) => {
                            const itemClicked = clickEvent.target
                            itemClicked.classList.toggle("active");
                            var content = itemClicked.nextElementSibling
                            if (content.style.maxHeight) {
                                content.style.maxHeight = null;
                            } else {
                                content.style.maxHeight = content.scrollHeight + "px";
                            }
                        }
                        }>

                            {user.name}</button>
                        <div className="content">
                            phone number: {user.phoneNumber} <br />
                            email: {user.emailAddress} <br />
                            allergies: {user.allergies} <br />
                            green room requests: {user.greenRoomRequests}
                        </div>
                    </div>
                </>
            })
        }

    </>
}