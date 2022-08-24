import { keys } from "./ApiKey"
import { Buffer } from 'buffer'


export const getLogin = (user) => {
    return fetch("https://detour-backend.herokuapp.com/login", {
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
    return fetch("https://detour-backend.herokuapp.com/register", {
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
    return fetch("https://detour-backend.herokuapp.com/users", {
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
    return fetch(`https://detour-backend.herokuapp.com/users/${userObject}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const updateCustomerProfile = (profile) => {
    return fetch(`https://detour-backend.herokuapp.com/users/${profile.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
}

export const getAllDates = () => {
    return fetch('https://detour-backend.herokuapp.com/showDates', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getAllUsers = () => {
    return fetch('https://detour-backend.herokuapp.com/users', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getUser = (id) => {
    return fetch(`https://detour-backend.herokuapp.com/users?id=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getDateDetailsArtist = (showId) => {
    return fetch(`https://detour-backend.herokuapp.com/showDates/${showId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getDocsForShow = (showId) => {
    return fetch(`https://detour-backend.herokuapp.com/docs?showDateId=${showId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getDateDetailsManager = (showId) => {
    return fetch(`https://detour-backend.herokuapp.com/showDates/${showId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const updateShowDate = (showDate) => {
    return fetch(`https://detour-backend.herokuapp.com/showDates/${showDate.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(showDate)
    })
}

export const saveNewDate = (showDateToSendToAPI) => {
    return fetch(`https://detour-backend.herokuapp.com/showDates`, {
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
    return fetch(`https://detour-backend.herokuapp.com/assignDocToShow`, {
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
    return fetch(`https://detour-backend.herokuapp.com/guestRequests?showDateId=${id}`, {
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
    return fetch(`https://detour-backend.herokuapp.com/guestRequests?showDateId=${id}&statusId=2`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getPendingGuestRequests = () => {
    return fetch(`https://detour-backend.herokuapp.com/guestRequests?statusId=1`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getAllRequests = () => {
    return fetch(`https://detour-backend.herokuapp.com/greenRoomRequests?statusId=1`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getRequests = (id) => {
    return fetch(`https://detour-backend.herokuapp.com/greenRoomRequests?showDateId=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getApprovedRequests = (id) => {
    return fetch(`https://detour-backend.herokuapp.com/greenRoomRequests?showDateId=${id}&statusId=2`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getUserRequests = (id) => {
    return fetch(`https://detour-backend.herokuapp.com/greenRoomRequests?userId=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getUserGuestRequests = (id) => {
    return fetch(`https://detour-backend.herokuapp.com/guestRequests?userId=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}


export const saveRequest = (requestToSendToAPI) => {
    return fetch(`https://detour-backend.herokuapp.com/greenRoomRequests`, {
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
    return fetch(`https://detour-backend.herokuapp.com/greenRoomRequests/${greenRoomObj.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(greenRoomObj)
    })
}


export const updateAPIGuestRequest = (guestObj) => {
    return fetch(`https://detour-backend.herokuapp.com/guestRequests/${guestObj.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(guestObj)
    })
}

export const updateDoc = (docObj) => {
    return fetch(`https://detour-backend.herokuapp.com/docs/${docObj.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(docObj)
    })
}

export const getScheduleItems = (id) => {
    return fetch(`https://detour-backend.herokuapp.com/scheduleItems?showDateId=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const getDocs = () => {
    return fetch(`https://detour-backend.herokuapp.com/docs`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

export const saveNewGuest = (newGuestToSendToAPI) => {
    return fetch(`https://detour-backend.herokuapp.com/guestRequests`, {
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
    return fetch(`https://detour-backend.herokuapp.com/scheduleItems`, {
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
    return fetch(`https://detour-backend.herokuapp.com/docs`, {
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
    return fetch(`https://detour-backend.herokuapp.com/datacollection/yelp_api?lat=${lat}&long=${long}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`
        }
    })
        .then(response => response.json())
}

