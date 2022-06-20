import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { fetchCloudinary, getAllDates, getAllFiles, getDocs, saveDoc, updateDoc } from '../ApiManager';
import "./EssentialDocs.css"



export const EssentialDocs = () => {
    const [publicURLs, setPublicURL] = useState([])
    const [imageSelected, setImageSelected] = useState("")
    const [docs, setDocs] = useState([])
    const [showDates, setShowDates] = useState([])

    const [doc, update] = useState({
        publicURL: '',
    })

    useEffect(
        () => {
            getDocs()
                .then((docArray) => {
                    setDocs(docArray)
                })
            getAllDates()
                .then((dateArray) => {
                    setShowDates(dateArray)
                })
        }, []
    )


    let uploadImage = () => {
        let formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "detour")

        fetchCloudinary(formData)
            .then((response) => { // get request
                setPublicURL(response.url)
                const copy = { ...doc }
                copy.publicURL = response.url
                update(copy)

                const docToSendToAPI = {
                    publicURL: response.url
                }

                return saveDoc(docToSendToAPI)
                    .then(() => {
                        getDocs()
                            .then((docArray) => {
                                setDocs(docArray)
                            })
                    })

            })
    }


    return (
        <>
            <input type="file" onChange={(evt) => {
                setImageSelected(evt.target.files[0])
            }} />
            <button onClick={
                uploadImage
            }>Upload</button>

            {
                docs
                    ? docs.map(url => {
                        return <div key={`doc--${url.id}`} className="imagecard">
                            <img className="image" src={url.publicURL} />
                            <label htmlFor="description">Select Show: </label>
                            <select onChange={
                                    (evt) => {
                                        url.showDateId = parseInt(evt.target.value)
                                        updateDoc(url)
                                    }
                                } name="shows" id="shows">
                                {
                                    showDates.map(date => {
                                        return <option key={`date--${date.id}`} value={date.id}>{date.date} - {date.venue}</option>
                                    })
                                }

                            </select>
                        </div>
                    })
                    : <></>
            }
        </>
    )
}; 