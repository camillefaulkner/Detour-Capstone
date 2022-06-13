import { Outlet, Route, Routes } from "react-router-dom"
import { DateList } from "../dates/DateList"
import { ProfileView } from "../profile/Profile"
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useEffect, useState } from "react"
import { getAllDates, fetchLatandLong } from "../ApiManager"
import "./Views.css"
import { DateEdit } from "../dates/DateEdit"
import { NewDateForm } from "../dates/NewDateForm"
import { SubmitGuest } from "../guests/SubmitGuests"
import { CrewList } from "../crew/CrewList"
import { CrewProfile } from "../crew/ShowCrewProfile"


export const ManagerViews = () => {
	const [locations, setLocations] = useState({})
	const [dataForViz, setDataForViz] = useState([])

	useEffect(
		() => {
			getAllDates()
				.then((dateArray) => {
					setLocations(dateArray)
				})
		},
		[]
	)

	useEffect(
		() => {
			if (locations.length) {
				locations.map(location => {
					fetchLatandLong(location.streetAddress, location.city, location.state)
						.then((LatLongArray) => {
							dataForViz.push(LatLongArray.locations[0])
						})
				})
			}
		},
		[locations]
	)

	return (<Routes>
		<Route path="/" element={
			<>
				<h1>detour</h1>
				{ dataForViz.length
					? <MapContainer center={[40, -100]} zoom={3} scrollWheelZoom={false}>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						{dataForViz.map(data => {
							return <Marker position={[data?.referencePosition?.latitude, data?.referencePosition?.longitude]}>
								<Popup>
									A pretty CSS3 popup. <br /> Easily customizable.
								</Popup>
							</Marker>
						})
						}
					</MapContainer>
					: <></>
				}

				<Outlet />
			</>
		} />
		<Route path="/dates" element={<DateList setLocations={setLocations} />} />
		<Route path="/dates/:showDateId/edit" element={<DateEdit />} />
		<Route path="/dates/create" element={<NewDateForm />} />
		<Route path="/guests" element={<SubmitGuest />} />
		<Route path="/crew" element={<CrewList />} />
		<Route path="/profile/:userId" element={<CrewProfile />} />
		<Route path="/profile" element={<ProfileView />} />
	</Routes>
	)
}