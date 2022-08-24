
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useEffect, useState } from "react"
import { getAllDates, fetchLatandLong, coffeeAPI } from "../ApiManager"
import "./Views.css"
import { ConvertDate } from "../dates/ConvertDate"

export const MapView = ({ retrieveDates }) => {

    const [locations, setLocations] = useState({})
    const [dataForViz, setDataForViz] = useState([])
    const [coffeeList, setCoffeeList] = useState([])

    useEffect(
        () => {
            retrieveDates()
            getAllDates()
                .then((dateArray) => {
                    setLocations(dateArray)
                    // retrieveDates()
                })
        },
        []
    )

    useEffect(
        () => {
            if (locations.length) {
                let newDataState = []
                let allDataFetches = locations.map(location => {
                    return fetchLatandLong(location.streetAddress, location.city, location.state)
                })
                Promise.all(allDataFetches)
                    .then((LatLongResponses) => {
                        for (const response of LatLongResponses) {
                            newDataState.push(response.locations[0])
                        }
                        setDataForViz(newDataState)
                    })
            }
        },
        [locations]
    )

    const foundCoffeeShops = (lat, long) => {
        coffeeAPI(lat, long)
            .then((coffeebusinesses) => {
                setCoffeeList(coffeebusinesses.businesses)
            })
    }

    return <div className="map">
        {dataForViz.length
            ? <MapContainer center={[40, -100]} zoom={3} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {dataForViz.map(data => {
                    let foundCity = locations.find((location) => {
                        return location.city.toLowerCase() === data?.address.city.toLowerCase()
                    })
                    return <Marker position={[data?.referencePosition?.latitude, data?.referencePosition?.longitude]}>
                        <Popup>
                            {ConvertDate(foundCity?.date)} <br />
                            {foundCity?.venue} <br /> {foundCity?.city}, {foundCity?.state}
                            <br /><br />
                            <button className="coffee" onClick={() => {
                                foundCoffeeShops(data?.referencePosition?.latitude, data?.referencePosition?.longitude)
                            }
                            }>coffee?</button>
                            {
                                coffeeList.length
                                    ? coffeeList.map(coffee => {
                                        return <><br />{coffee.name} - {coffee.location.address1}</>
                                    })
                                    : <></>
                            }
                            <button onClick={() => {
                                setCoffeeList([])
                            }
                            }>no coffee.</button>
                        </Popup>
                    </Marker>
                })
                }
            </MapContainer>
            : <></>
        }
    </div>
}