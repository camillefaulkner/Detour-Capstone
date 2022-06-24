import { keys } from "./ApiKey"
import { Buffer } from 'buffer'

export const getLogin = (email) => {
    return fetch(`http://localhost:8088/users?emailAddress=${email}`)
        .then(res => res.json())
}

export const saveNewUser = (user) => {
    return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}

export const getHandleRegister = (user) => {
    return fetch(`http://localhost:8088/users?emailAddress=${user.email}`)
        .then(res => res.json())
}

export const getCustomerProfile = (userObject) => {
    return fetch(`http://localhost:8088/users?id=${userObject.id}`)
        .then(response => response.json())
}

export const updateCustomerProfile = (profile) => {
    return fetch(`http://localhost:8088/users/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
        .then(response => response.json())
}

export const getAllDates = () => {
    return fetch('http://localhost:8088/showDates')
        .then(response => response.json())
}

export const getAllUsers = () => {
    return fetch('http://localhost:8088/users')
        .then(response => response.json())
}

export const getUser = (id) => {
    return fetch(`http://localhost:8088/users?id=${id}`)
        .then(response => response.json())
}

export const getDateDetailsArtist = (showId) => {
    return fetch(`http://localhost:8088/showDates?id=${showId}`)
        .then(response => response.json())
}

export const getDocsForShow = (showId) => {
    return fetch(`http://localhost:8088/docs?showDateId=${showId}`)
        .then(response => response.json())
}

export const getDateDetailsManager = (showId) => {
    return fetch(`http://localhost:8088/showDates/${showId}`)
        .then(response => response.json())
}

export const updateShowDate = (showDate) => {
    return fetch(`http://localhost:8088/showDates/${showDate.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(showDate)
    })
        .then(response => response.json())
}

export const saveNewDate = (showDateToSendToAPI) => {
    return fetch(`http://localhost:8088/showDates`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(showDateToSendToAPI)
    })
        .then(response => response.json())
}

export const saveDocAssign = (docAssignToSendToAPI) => {
    return fetch(`http://localhost:8088/assignDocToShow`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(docAssignToSendToAPI)
    })
        .then(response => response.json())
}

export const getGuestRequests = (id) => {
    return fetch(`http://localhost:8088/guestRequests?showDateId=${id}`)
        .then(response => response.json())
}

export const getAssignedDocs = (id) => {
    return fetch(`http://localhost:8088/assignDocToShow?showDateId=${id}&_expand=doc`)
        .then(response => response.json())
}

export const getApprovedGuestRequests = (id) => {
    return fetch(`http://localhost:8088/guestRequests?showDateId=${id}&statusId=2`)
        .then(response => response.json())
}

export const getPendingGuestRequests = () => {
    return fetch(`http://localhost:8088/guestRequests?statusId=1`)
        .then(response => response.json())
}

export const getAllRequests = () => {
    return fetch(`http://localhost:8088/greenRoomRequests?statusId=1`)
        .then(response => response.json())
}

export const getRequests = (id) => {
    return fetch(`http://localhost:8088/greenRoomRequests?showDateId=${id}`)
        .then(response => response.json())
}

export const getApprovedRequests = (id) => {
    return fetch(`http://localhost:8088/greenRoomRequests?showDateId=${id}&statusId=2`)
        .then(response => response.json())
}

export const getUserRequests = (id) => {
    return fetch(`http://localhost:8088/greenRoomRequests?userId=${id}`)
        .then(response => response.json())
}

export const getUserGuestRequests = (id) => {
    return fetch(`http://localhost:8088/guestRequests?userId=${id}`)
        .then(response => response.json())
}


export const saveRequest = (requestToSendToAPI) => {
    return fetch(`http://localhost:8088/greenRoomRequests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestToSendToAPI)
    })
        .then(response => response.json())
}

export const updateGreenRoomRequest = (greenRoomObj) => {
    return fetch(`http://localhost:8088/greenRoomRequests/${greenRoomObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(greenRoomObj)
    })
        .then(response => response.json())
}

export const updateAPIGuestRequest = (guestObj) => {
    return fetch(`http://localhost:8088/guestRequests/${guestObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(guestObj)
    })
        .then(response => response.json())
}

export const updateDoc = (docObj) => {
    return fetch(`http://localhost:8088/docs/${docObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(docObj)
    })
        .then(response => response.json())
}

export const getScheduleItems = (id) => {
    return fetch(`http://localhost:8088/scheduleItems?showDateId=${id}`)
        .then(response => response.json())
}

export const getDocs = () => {
    return fetch(`http://localhost:8088/docs`)
        .then(response => response.json())
}

export const saveNewGuest = (newGuestToSendToAPI) => {
    return fetch(`http://localhost:8088/guestRequests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newGuestToSendToAPI)
    })
        .then(response => response.json())
}

export const saveNewScheduleItem = (newScheduleItemToSendToAPI) => {
    return fetch(`http://localhost:8088/scheduleItems`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newScheduleItemToSendToAPI)
    })
        .then(response => response.json())
}

export const saveDoc = (docToSendToAPI) => {
    return fetch(`http://localhost:8088/docs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(docToSendToAPI)
    })
        .then(response => response.json())
}

export const fetchLatandLong = (street, city, state) => {
    let url = street + ' ' + city + ' ' + state
    let encode = encodeURIComponent(url)
    let API = `https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${encode}&apiKey=${keys.ptv}`
    return fetch(`${API}`)
        .then(response => response.json())
}

export const fetchCloudinary = (formData) => {
    let API = `https://api.cloudinary.com/v1_1/${keys.cloudinary}/image/upload`
    return fetch(`${API}`, {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
}

// export const getAllFiles = () => {
//     let API = `https://api.cloudinary.com/v1_1/${keys.cloudinary}/resources/image`
//     return fetch(`${API}`, {
//         headers: {
//             Authorization: `Basic ${Buffer.from(keys.cloudinaryAPIkey + ':' + keys.cloudinaryAPIsecret).toString('base64')}`
//         }
//     })
//         .then(response => response.json())
// }