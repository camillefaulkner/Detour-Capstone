import { Outlet, Route, Routes } from "react-router-dom"
import { DateDetails } from "../dates/DateDetails"
import { DateList } from "../dates/DateList"
import { ProfileView } from "../profile/Profile"
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useEffect, useState } from "react"
import { getAllDates, fetchLatandLong } from "../ApiManager"
import "./Views.css"
import { SubmitRequest } from "../requests/RequestForm"


export const ArtistViews = () => {
	const [locations, setLocations] = useState({})
	const [dataForViz, setDataForViz] = useState([])
	const RetrieveDates = () => {
		getAllDates()
			.then((dateArray) => {
				setLocations(dateArray)
			})
	}

	useEffect(
		() => {
			RetrieveDates()
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

	return (<Routes>
		<Route path="/" element={
			<>
				<div className="map">
					{/* <h1>detour</h1> */}
					{dataForViz.length
						? <MapContainer center={[40, -100]} zoom={3} scrollWheelZoom={false}>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							{dataForViz.map(data => {
								let foundCity = locations.find((location) => {
									return location?.city.toLowerCase() === data?.address.city.toLowerCase()
								})
								return <Marker position={[data?.referencePosition?.latitude, data?.referencePosition?.longitude]}>
									<Popup>
										{foundCity?.venue} <br /> {foundCity?.city}, {foundCity?.state}
									</Popup>
								</Marker>
							})
							}
						</MapContainer>
						: <></>
					}
				</div>
				<Outlet />
			</>
		} />
		< Route path="/dates" element={< DateList />} />
		< Route path="/dates/:showDateId" element={< DateDetails />} />
		< Route path="/profile" element={< ProfileView />} />
		< Route path="/createrequest" element={< SubmitRequest />} />
	</Routes >
	)
}