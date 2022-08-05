import { useEffect, useState } from "react"
import { Button, CloseButton } from 'reactstrap';
import { getAllDates, getAllUsers, getAllRequests, getPendingGuestRequests, updateGuestRequest, updateGreenRoomRequest, updateAPIGuestRequest } from "../ApiManager"
import { ConvertDate } from "../dates/ConvertDate";
import "./Requests.css"


export const Requests = () => {
    const [requests, setRequests] = useState([])
    const [users, setUsers] = useState([])
    const [showDates, setShowDates] = useState([])
    const [guestRequests, setGuestRequests] = useState([])

    // const localUser = localStorage.getItem("detour_user")
    // const userObject = JSON.parse(localUser)

    useEffect(
        () => {
            getAllRequests()
                .then((requestArray) => {
                    setRequests(requestArray)
                })
            getAllUsers()
                .then((userArray) => {
                    setUsers(userArray)
                })
            getAllDates()
                .then((dateArray) => {
                    setShowDates(dateArray)
                })
            getPendingGuestRequests()
                .then((guestArray) => {
                    setGuestRequests(guestArray)
                })
        }, []
    )



    const handleUpdateGreenRoomClick = (event, request) => {
        event.preventDefault()
        return updateGreenRoomRequest(request)
            .then(() => {
                getAllRequests()
                    .then((requestArray) => {
                        setRequests(requestArray)
                    })
                getPendingGuestRequests()
                    .then((guestArray) => {
                        setGuestRequests(guestArray)
                    })
            })
    }

    const handleUpdateGuestClick = (event, request) => {
        event.preventDefault()
        return updateAPIGuestRequest(request)
            .then(() => {
                getAllRequests()
                    .then((requestArray) => {
                        setRequests(requestArray)
                    })
                getPendingGuestRequests()
                    .then((guestArray) => {
                        setGuestRequests(guestArray)
                    })
            })
    }

    let findMonth = (month) => {
        if (month === 1) {
            return "January"
        } else if (month === 2) {
            return "February"
        } else if (month === 3) {
            return "March"
        } else if (month === 4) {
            return "April"
        } else if (month === 5) {
            return "May"
        } else if (month === 6) {
            return "June"
        } else if (month === 7) {
            return "July"
        } else if (month === 8) {
            return "August"
        } else if (month === 9) {
            return "September"
        } else if (month === 10) {
            return "October"
        } else if (month === 11) {
            return "November"
        } else if (month === 12) {
            return "December"
        }
    }



    return <>

        <h2 className="requesttitle">requests</h2>
        <div className="requestbox">
            {
                users.length && requests.length && showDates.length
                    ?
                    requests.map(request => {
                        let foundUser = users.find((user) => {
                            return user.id === request.userId
                        })
                        let foundShow = showDates.find((show) => {
                            return show.id === request.showDateId
                        })
                        return <div className="requestinline">
                            <div className="requestitem" key={`request--${request.id}`}>{request.type} from {foundUser.name}: {request.request} for {foundShow.venue} ({ConvertDate(foundShow.date)})
                            </div>
                            <div className="requestbuttons">
                                <Button className="requestbutton" onClick={(clickEvent) => {
                                    request.statusId = 2
                                    handleUpdateGreenRoomClick(clickEvent, request)
                                }}>accept</Button>
                                <CloseButton
                                    variant="white" onClick={(clickEvent) => {
                                        request.statusId = 3
                                        handleUpdateGreenRoomClick(clickEvent, request)
                                    }}></CloseButton>
                            </div>
                        </div>
                    })

                    : <></>
            }
            {
                guestRequests.length && showDates.length
                    ? guestRequests.map(request => {
                        let foundUser = users.find((user) => {
                            return user.id === request.userId
                        })
                        let foundShow = showDates.find((show) => {
                            return show.id === request.showDateId
                        })
                        return <div className="requestinline">
                            <div className="requestitem" key={`request--${request.id}`}>guest list request from {request.user.full_name}:  {request.name} needs {request.quantity} tickets for {request.show_date.venue} ({ConvertDate(request.show_date.date)})
                            </div>
                            <div className="requestbuttons">
                                <Button className="requestbutton" onClick={(clickEvent) => {
                                    request.status.id = 2
                                    handleUpdateGuestClick(clickEvent, request)
                                }}>accept</Button>
                                <CloseButton variant="white" onClick={(clickEvent) => {
                                    request.status.id = 3
                                    handleUpdateGuestClick(clickEvent, request)
                                }}></CloseButton>
                            </div>
                        </div>
                    })
                    : <></>
            }
        </div>
    </>
}