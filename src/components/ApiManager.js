
import { keys } from "./ApiKey"

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

export const getGuestRequests = (id) => {
    return fetch(`http://localhost:8088/guestRequests?showDateId=${id}`)
        .then(response => response.json())
}

export const getScheduleItems = (id) => {
    return fetch(`http://localhost:8088/scheduleItems?showDateId=${id}`)
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

export const fetchLatandLong = (street, city, state) => {
    let url = street + ' ' + city + ' ' + state
    let encode = encodeURIComponent(url)
    let API = `https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${encode}&apiKey=${keys.ptv}`
    return fetch(`${API}`) //default method is GET = i want data, give it to me please, give all of the requests
        .then(response => response.json()) //returns array of objects in this scenario
}