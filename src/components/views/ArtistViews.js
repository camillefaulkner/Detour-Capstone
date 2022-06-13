import { Outlet, Route, Routes } from "react-router-dom"
import { DateDetails } from "../dates/DateDetails"
import { DateList } from "../dates/DateList"
import { ProfileView } from "../profile/Profile"
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useEffect, useState } from "react"
import { getAllDates, fetchLatandLong } from "../ApiManager"
import "./Views.css"


export const ArtistViews = () => {
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
				<MapContainer center={[40, -100]} zoom={3} scrollWheelZoom={false}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{ dataForViz.length === locations.length
					? dataForViz.map(data => {
						return <Marker position={[data?.referencePosition?.latitude, data?.referencePosition?.longitude]}>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
						</Marker>
					})
					:<></>
				}
				</MapContainer>

				<Outlet />
			</>
		} />
		<Route path="/dates" element={<DateList setLocations={setLocations}/>} />
		<Route path="/dates/:showDateId" element={<DateDetails />} />
		<Route path="/profile" element={<ProfileView />} />
	</Routes>
	)
}