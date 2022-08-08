import { keys } from "./ApiKey"
import { Buffer } from 'buffer'


export const getLogin = (user) => {
    return fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}

export const getHandleRegister = (user) => {
    return fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}


export const saveNewUser = (user) => {
    return fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}


export const getCustomerProfile = (userObject) => {
    return fetch(`http://localhost:8000/users/${userObject}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const updateCustomerProfile = (profile) => {
    return fetch(`http://localhost:8000/users/${profile.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
}

export const getAllDates = () => {
    return fetch('http://localhost:8000/showDates', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getAllUsers = () => {
    return fetch('http://localhost:8000/users', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getUser = (id) => {
    return fetch(`http://localhost:8000/users?id=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getDateDetailsArtist = (showId) => {
    return fetch(`http://localhost:8000/showDates/${showId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getDocsForShow = (showId) => {
    return fetch(`http://localhost:8000/docs?showDateId=${showId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getDateDetailsManager = (showId) => {
    return fetch(`http://localhost:8000/showDates/${showId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const updateShowDate = (showDate) => {
    return fetch(`http://localhost:8000/showDates/${showDate.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(showDate)
    })
}

export const saveNewDate = (showDateToSendToAPI) => {
    return fetch(`http://localhost:8000/showDates`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(showDateToSendToAPI)
    })
        .then(response => response.json())
}

export const saveDocAssign = (docAssignToSendToAPI) => {
    return fetch(`http://localhost:8000/assignDocToShow`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(docAssignToSendToAPI)
    })
        .then(response => response.json())
}

export const getGuestRequests = (id) => {
    return fetch(`http://localhost:8000/guestRequests?showDateId=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

// export const getAssignedDocs = (id) => {
//     return fetch(`http://localhost:8000/assignDocToShow?showDateId=${id}&_expand=doc`, {
//         headers: {
//             "Authorization": `Token ${localStorage.getItem("dt_token")}`
//         }
//     })
//         .then(response => response.json())
// }

export const getApprovedGuestRequests = (id) => {
    return fetch(`http://localhost:8000/guestRequests?showDateId=${id}&statusId=2`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getPendingGuestRequests = () => {
    return fetch(`http://localhost:8000/guestRequests?statusId=1`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getAllRequests = () => {
    return fetch(`http://localhost:8000/greenRoomRequests?statusId=1`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getRequests = (id) => {
    return fetch(`http://localhost:8000/greenRoomRequests?showDateId=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getApprovedRequests = (id) => {
    return fetch(`http://localhost:8000/greenRoomRequests?showDateId=${id}&statusId=2`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getUserRequests = (id) => {
    return fetch(`http://localhost:8000/greenRoomRequests?userId=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getUserGuestRequests = (id) => {
    return fetch(`http://localhost:8000/guestRequests?userId=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}


export const saveRequest = (requestToSendToAPI) => {
    return fetch(`http://localhost:8000/greenRoomRequests`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestToSendToAPI)
    })
        .then(response => response.json())
}

export const updateGreenRoomRequest = (greenRoomObj) => {
    return fetch(`http://localhost:8000/greenRoomRequests/${greenRoomObj.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(greenRoomObj)
    })
}


export const updateAPIGuestRequest = (guestObj) => {
    return fetch(`http://localhost:8000/guestRequests/${guestObj.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(guestObj)
    })
}

export const updateDoc = (docObj) => {
    return fetch(`http://localhost:8000/docs/${docObj.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(docObj)
    })
}

export const getScheduleItems = (id) => {
    return fetch(`http://localhost:8000/scheduleItems?showDateId=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getDocs = () => {
    return fetch(`http://localhost:8000/docs`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const saveNewGuest = (newGuestToSendToAPI) => {
    return fetch(`http://localhost:8000/guestRequests`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newGuestToSendToAPI)
    })
        .then(response => response.json())
}

export const saveNewScheduleItem = (newScheduleItemToSendToAPI) => {
    return fetch(`http://localhost:8000/scheduleItems`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newScheduleItemToSendToAPI)
    })
        .then(response => response.json())
}

export const saveDoc = (docToSendToAPI) => {
    return fetch(`http://localhost:8000/docs`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`,
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

export const getCoffeeShops = (lat, long) => {
    let API = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?&categories=coffee&open_now=true&limit=7&latitude=${lat}&longitude=${long}`
    let key = `${keys.yelp}`
    return fetch(`${API}`, {
        headers: {
            Authorization: `Bearer ${key}`,
            Origin: `localhost`,
            withCredentials: true,
        }
    })
        .then(response => response.json())
}

export const coffeeAPI = (lat, long) => {
    return fetch(`http://localhost:8000/datacollection/yelp_api?lat=${lat}&long=${long}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

