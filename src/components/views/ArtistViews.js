import { Outlet, Route, Routes } from "react-router-dom"
import { DateDetails } from "../dates/DateDetails"
import { DateList } from "../dates/DateList"
import { ProfileView } from "../profile/Profile"
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useEffect, useState } from "react"
import { getAllDates, fetchLatandLong, getCoffeeShops } from "../ApiManager"
import "./Views.css"
import { SubmitRequest } from "../requests/RequestForm"
import { ConvertDate } from "../dates/ConvertDate"


export const ArtistViews = () => {
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
									return location?.city.toLowerCase() === data?.address.city.toLowerCase()
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
		< Route path="/dates" element={< DateList />} />
		< Route path="/dates/:showDateId" element={< DateDetails />} />
		< Route path="/profile" element={< ProfileView />} />
		< Route path="/createrequest" element={< SubmitRequest />} />
	</Routes >
	)
}