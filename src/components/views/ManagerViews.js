import { Link, Outlet, Route, Routes } from "react-router-dom"
import { DateList } from "../dates/DateList"
import { ProfileView } from "../profile/Profile"
import { useEffect, useState } from "react"
import { getAllDates, fetchLatandLong, getCoffeeShops, coffeeAPI } from "../ApiManager"
// import "./Views.css"
import { DateEdit } from "../dates/DateEdit"
import { NewDateForm } from "../dates/NewDateForm"
import { SubmitGuest } from "../guests/SubmitGuests"
import { CrewList } from "../crew/CrewList"
import { EssentialDocs } from "../essentialdocs/EssentialDocs"
import { Requests } from "../requests/Requests"
import { ConvertDate } from "../dates/ConvertDate"
import { MapView } from "../map/Map"


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

	return (<Routes>
		<Route path="/" element={
			<>
				<Outlet />
			</>
		} />
		<Route path="/map" element={<MapView retrieveDates={RetrieveDates} />} />
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