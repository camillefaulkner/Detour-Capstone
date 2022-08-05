import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAllUsers } from "../ApiManager"
import "./Crew.css"

export const CrewList = () => {
    const [users, setUsers] = useState([])

    useEffect(
        () => {
            getAllUsers()
                .then((userArray) => {
                    setUsers(userArray)
                })
        }, []
    )



    return <>
        <h2 className="crewtitle">crew</h2>
        <div className="crewcontainer">
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

                                {user.full_name}</button>
                            <div className="content">
                                phone number: {user.phone_number} <br />
                                email: {user.user.email} <br />
                                allergies: {user.allergies} <br />
                                green room requests: {user.greenroom_requests}
                            </div>
                        </div>
                    </>
                })
            }
        </div>
    </>
}