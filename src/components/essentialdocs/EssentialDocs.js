import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fetchCloudinary, getAllFiles } from '../ApiManager';
import { ImageSource } from '@cloudinary/url-gen/qualifiers/source/sourceTypes/ImageSource';
import { image } from '@cloudinary/url-gen/qualifiers/source';


export const EssentialDocs = () => {
    const [files, setFiles] = useState({})
    const [imageSelected, setImageSelected] = useState("")
    const [imageData, setImageData] = useState("")

    // useEffect(
    //     () => {
    //         getAllFiles()
    //             .then((fileArray) => {
    //                 setFiles(fileArray)
    //             })
    //     }, []
    // )

    let uploadImage = () => {
        let formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "detour")

        fetchCloudinary(formData)
        setImageData(fetchCloudinary(formData).data)
        console.log(imageData)
    }

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dyhlcvrqp'
        }
    });

    const myImage = cld.image('ydmrixe1bfazcnszrc54')


    return (
        <>
            <input type="file" onChange={(evt) => {
                setImageSelected(evt.target.files[0])
                console.log(imageSelected)
            }} />
            <button onClick={uploadImage}>Upload</button>


            <AdvancedImage cldImg={myImage} />


        </>
    )
}; 