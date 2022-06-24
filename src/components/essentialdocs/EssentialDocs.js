import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Button } from 'reactstrap';
import { fetchCloudinary, getAllDates, getAllFiles, getDocs, saveDoc, saveDocAssign, updateDoc } from '../ApiManager';
import { ConvertDate } from '../dates/ConvertDate';
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
            .then((response) => {
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


    return (<>
        <h2 className="doctitle">essential docs</h2>
        <div className="doccontainer">
            <input type="file" onChange={(evt) => {
                setImageSelected(evt.target.files[0])
            }} />
            <Button onClick={uploadImage}>Upload</Button>
            <div className='docimages'>

                {
                    docs
                        ? docs.map(url => {
                            return <div key={`doc--${url.id}`} className="imagecard">
                                <img className="image" src={url.publicURL} />
                                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                    <InputLabel id="simple-select" className="chooseshow" htmlFor="description">select show: </InputLabel>
                                    <Select
                                        labelId="simple-select"
                                        label="select show"
                                        onChange={
                                            (evt) => {
                                                const docAssignToSendToAPI = {
                                                    docId: url.id,
                                                    showDateId: parseInt(evt.target.value)
                                                }

                                                return saveDocAssign(docAssignToSendToAPI)

                                            }
                                        } name="shows" id="shows">
                                        {
                                            showDates.sort((a, b) => { return new Date(a.date) - new Date(b.date) }).map(date => {
                                                return <MenuItem key={`date--${date.id}`} value={date.id}>{ConvertDate(date.date)} - {date.venue}</MenuItem>
                                            })
                                        }

                                    </Select>
                                </FormControl>
                            </div>
                        })
                        : <></>
                }
            </div>
        </div>
    </>
    )
}; 