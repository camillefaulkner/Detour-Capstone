import { Outlet, Route, Routes } from "react-router-dom"
import { DateDetails } from "../dates/DateDetails"
import { DateList } from "../dates/DateList"
import { ProfileView } from "../profile/Profile"
import { useEffect, useState } from "react"
import { getAllDates, fetchLatandLong, coffeeAPI } from "../ApiManager"
// import "./Views.css"
import { SubmitRequest } from "../requests/RequestForm"
import { ConvertDate } from "../dates/ConvertDate"
import { MapView } from "../map/Map"


export const ArtistViews = () => {
	const [locations, setLocations] = useState({})

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

	return (<Routes>
		<Route path="/" element={
			<>

				<Outlet />
			</>
		} />
		< Route path="/map" element={<MapView retrieveDates={RetrieveDates} />} />
		< Route path="/dates" element={< DateList />} />
		< Route path="/dates/:showDateId" element={< DateDetails />} />
		< Route path="/profile" element={< ProfileView />} />
		< Route path="/createrequest" element={< SubmitRequest />} />
	</Routes >
	)
}