import { Outlet, Route, Routes } from "react-router-dom"
import { DateList } from "../dates/DateList"
import { ProfileView } from "../profile/Profile"
import { DateEdit } from "../dates/DateEdit"
import { NewDateForm } from "../dates/NewDateForm"
import { SubmitGuest } from "../guests/SubmitGuests"
import { CrewList } from "../crew/CrewList"
import { CrewProfile } from "../crew/ShowCrewProfile"


export const ManagerViews = () => {
	return (<Routes>
		<Route path="/" element={
			<>
				<h1>Detour</h1>

				<Outlet />
			</>
		} />
			<Route path="/dates" element={<DateList />} />
			<Route path="/dates/:showDateId/edit" element={<DateEdit />} />
			<Route path="/dates/create" element={<NewDateForm />} />
			<Route path="/guests" element={<SubmitGuest />} />
			<Route path="/crew" element={<CrewList />} />
			<Route path="/profile/:userId" element={<CrewProfile />} />
			<Route path="/profile" element={<ProfileView />} />
	</Routes>
	) 
}