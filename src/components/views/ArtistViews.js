import { Outlet, Route, Routes } from "react-router-dom"
import { DateDetails } from "../dates/DateDetails"
import { DateList } from "../dates/DateList"
import { ProfileView } from "../profile/Profile"


export const ArtistViews = () => {
	return (<Routes>
		<Route path="/" element={
			<>
				<h1>Detour</h1>

				<Outlet />
			</>
		} />
			<Route path="/dates" element={<DateList />} />
			<Route path="/dates/:showDateId" element={<DateDetails />} />
			<Route path="/profile" element={<ProfileView />} />
	</Routes>
	) 
}