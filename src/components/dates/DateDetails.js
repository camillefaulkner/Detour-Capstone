import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getDateDetailsArtist } from "../ApiManager"
import { ConvertDate } from "./ConvertDate"
import "./DateList.css"

export const DateDetails = () => {
    const { showDateId } = useParams()
    const [showDate, updateShowDate] = useState([])
    const [morning, setMorning] = useState([])
    const [afternoon, setAfternoon] = useState([])


    useEffect(
        () => {
            getDateDetailsArtist(showDateId)
                .then((data) => {
                    updateShowDate(data)
                })
        },
        [showDateId]
    )

    useEffect(
        () => {
            if (showDate.schedule_items?.length) {
                let foundMorningSchedule = showDate.schedule_items?.filter((scheduleItem) => {
                    let timeArray = scheduleItem.time.split(":")
                    if (timeArray[0] < 12) {
                        return scheduleItem
                    }
                })

                let foundAfternoonSchedule = showDate.schedule_items?.filter((scheduleItem) => {
                    let timeArray = scheduleItem.time.split(":")
                    if (timeArray[0] >= 12) {
                        return scheduleItem
                    }
                })
                setMorning(foundMorningSchedule)
                setAfternoon(foundAfternoonSchedule)
            }
        }, [showDate.schedule_items]
    )

    const findTime = (time) => {
        let timeArray = time.split(":")
        if (timeArray[0] < 12) {
            return `${timeArray[0]}:${timeArray[1]} am`
        } else if (timeArray[0] >= 12) {
            return `${timeArray[0] - 12}:${timeArray[1]} pm`
        }
    }

    return <>
        {
            showDate.date

                ? <h2 className="datedetailtitle">
                    {ConvertDate(showDate.date)}
                </h2>
                : <></>

        }
        <section className="showdetails">
            <section className="leftSide">

                <div className="showAddress">{showDate?.venue}<br></br>
                    {showDate?.street_address}<br></br>
                    {showDate?.city} {showDate?.state}</div>

                <div className="essentials">
                    <h4>essential notes:</h4>
                    {showDate?.essential_notes}
                </div>


                <div className="schedule">
                    <h4>schedule:</h4>
                    {
                        morning.length && afternoon.length
                            ?
                            <>
                                {
                                    morning.sort((a, b) => { return a.time.localeCompare(b.time) }).map(item => {
                                        return <div key={`schedule--${item.id}`}> {findTime(item.time)} - {item.description}</div>
                                    })
                                }
                                {

                                    afternoon.sort((a, b) => { return a.time.localeCompare(b.time) }).map(item => {
                                        return <div key={`schedule--${item.id}`}> {findTime(item.time)} - {item.description}</div>
                                    })
                                }
                            </>
                            : <></>
                    }
                </div>

            </section>

            <section className="rightSide">
                <div>
                    <button className="datedetailcollapsible" onClick={(clickEvent) => {
                        const itemClicked = clickEvent.target
                        itemClicked.classList.toggle("datedetailactive");
                        var content = itemClicked.nextElementSibling
                        if (content.style.maxHeight) {
                            content.style.maxHeight = null;
                        } else {
                            content.style.maxHeight = content.scrollHeight + "px";
                        }
                    }
                    }>additional information:</button>
                    <div className="datedetailcontent">
                        {showDate?.other} <br />
                        { showDate.gr_requests
                            ? showDate.gr_requests.map(request => {
                                return <>{request.user?.user?.first_name} requests {request.request}<br /></>
                            })
                            :<></>
                        }
                    </div>
                </div>
                <div>
                    <button className="datedetailcollapsible" onClick={(clickEvent) => {
                        const itemClicked = clickEvent.target
                        itemClicked.classList.toggle("datedetailactive");
                        var content = itemClicked.nextElementSibling
                        if (content.style.maxHeight) {
                            content.style.maxHeight = null;
                        } else {
                            content.style.maxHeight = content.scrollHeight + "px";
                        }
                    }
                    }>guest list:</button>
                    <div className="datedetailcontent">
                        {showDate.guest_requests
                            ? showDate.guest_requests.map(guest => {
                                return <div> {guest.name} - {guest.quantity} tickets</div>
                            })
                            : <></>
                        }
                    </div>
                </div>
                <div>
                    <h4 className="datedetaildoc">docs:</h4>
                    {showDate.docs?.length
                        ? showDate.docs.map(doc => {
                            return <img className="image" src={doc.publicURL} />
                        })
                        : <></>
                    }
                </div>
            </section>
        </section>
    </>
}