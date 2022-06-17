import { useEffect, useState } from "react"
import { getAllDates, getAllUsers, getAllRequests, getPendingGuestRequests, updateGuestRequest, updateGreenRoomRequest, updateAPIGuestRequest } from "../ApiManager"
import "./Requests.css"


export const Requests = () => {
    const [requests, setRequests] = useState([])
    const [users, setUsers] = useState([])
    const [showDates, setShowDates] = useState([])
    const [guestRequests, setGuestRequests] = useState([])

    const localUser = localStorage.getItem("detour_user")
    const userObject = JSON.parse(localUser)

    useEffect(
        () => {
            getAllRequests() //
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

    return <>

        <h2 className="requests">requests</h2>
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
                        return <div className="requestitem" key={`request--${request.id}`}>{request.type} for {request.request} from {foundUser.name} - {foundShow.venue} {foundShow.date}
                            <button onClick={(clickEvent) => {
                                request.statusId = 2
                                handleUpdateGreenRoomClick(clickEvent, request)
                            }}>accept</button>
                            <button onClick={(clickEvent) => {
                                request.statusId = 3
                                handleUpdateGreenRoomClick(clickEvent, request)
                            }}>deny</button>
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
                        return <div className="requestitem" key={`request--${request.id}`}>guest list request for {request.name} - {request.quantity} tickets from {foundUser.name} - {foundShow.venue} {foundShow.date}
                            <button onClick={(clickEvent) => {
                                request.statusId = 2
                                handleUpdateGuestClick(clickEvent, request)
                            }}>accept</button>
                            <button onClick={(clickEvent) => {
                                request.statusId = 3
                                handleUpdateGuestClick(clickEvent, request)
                            }}>deny</button>
                        </div>
                    })
                    : <></>
            }
        </div>
    </>
}