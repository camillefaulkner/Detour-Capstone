import { Link, Outlet, Route, Routes } from "react-router-dom"
import { DateList } from "../dates/DateList"
import { ProfileView } from "../profile/Profile"
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useEffect, useState } from "react"
import { getAllDates, fetchLatandLong, getCoffeeShops } from "../ApiManager"
import "./Views.css"
import { DateEdit } from "../dates/DateEdit"
import { NewDateForm } from "../dates/NewDateForm"
import { SubmitGuest } from "../guests/SubmitGuests"
import { CrewList } from "../crew/CrewList"
import { EssentialDocs } from "../essentialdocs/EssentialDocs"
import { Requests } from "../requests/Requests"
import { ConvertDate } from "../dates/ConvertDate"


export const ManagerViews = () => {
	const [locations, setLocations] = useState({})
	const [dataForViz, setDataForViz] = useState([])
	const [coffeeList, setCoffeeList] = useState([])
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

	const foundCoffeeShops = (lat, long) => {
		getCoffeeShops(lat, long)
			.then((coffeebusinesses) => {
				setCoffeeList(coffeebusinesses.businesses)
			})
	}

	return (<Routes>
		<Route path="/" element={
			<>
				<div className="map">
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

				<Outlet />
			</>
		} />
		<Route path="/dates" element={<DateList retrieveDates={RetrieveDates} />} />
		<Route path="/dates/:showDateId/edit" element={<DateEdit retrieveDates={RetrieveDates} />} />
		<Route path="/dates/create" element={<NewDateForm retrieveDates={RetrieveDates} />} />
		<Route path="/guests" element={<SubmitGuest />} />
		<Route path="/requests" element={<Requests />} />
		<Route path="/crew" element={<CrewList />} />
		<Route path="/profile" element={<ProfileView />} />
		<Route path="/essentialdocs" element={<EssentialDocs />} />
	</Routes>
	)
}