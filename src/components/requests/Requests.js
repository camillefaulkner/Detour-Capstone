import { useEffect, useState } from "react"
import { getAllDates, getAllUsers, getAllRequests, getPendingGuestRequests, updateGuestRequest, updateGreenRoomRequest, updateAPIGuestRequest } from "../ApiManager"

//need to do all my PUT and DELETE fetch calls


export const Requests = () => {
    const [requests, setRequests] = useState([]) //
    const [users, setUsers] = useState([])
    const [showDates, setShowDates] = useState([])
    const [guestRequests, setGuestRequests] = useState([])

    const localUser = localStorage.getItem("detour_user")
    const userObject = JSON.parse(localUser)

    const [greenroom, updateGreenRoom] = useState({ //
        statusId: 1
    })

    const [guestrequest, updateGuestRequest] = useState({
        statusId: 1
    })

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

    const handleUpdateGreenRoomClick = (event) => {
        event.preventDefault()
        return updateGreenRoomRequest(greenroom) 
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

    const handleUpdateGuestClick = (event) => {
        event.preventDefault()
        return updateAPIGuestRequest(guestrequest) 
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
        <h2>requests</h2>
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
                    return <div key={`request--${request.id}`}>{request.type} for {request.request} from {foundUser.name} - {foundShow.venue} {foundShow.date}
                        <button onClick={(clickEvent) => {
                            request.statusId = 2
                            updateGreenRoom(request) 
                            handleUpdateGreenRoomClick(clickEvent)
                        }}>accept</button>
                        <button onClick={(clickEvent) => {
                            request.statusId = 3
                            updateGreenRoom(request)
                            handleUpdateGreenRoomClick(clickEvent)
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
                    return <div key={`request--${request.id}`}>guest list request for {request.name} - {request.quantity} tickets from {foundUser.name} - {foundShow.venue} {foundShow.date}
                        <button onClick={(clickEvent) => {
                            request.statusId = 2
                            updateGuestRequest(request) //
                            handleUpdateGuestClick(clickEvent)
                        }}>accept</button>
                        <button onClick={(clickEvent) => {
                            request.statusId = 2
                            updateGuestRequest(request) //
                            handleUpdateGuestClick(clickEvent)
                        }}>deny</button>
                    </div>
                })
                : <></>
        }
    </>
}