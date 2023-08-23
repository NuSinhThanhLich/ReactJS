import EventsNavigation from '../components/EventsNavigation'
import { Outlet } from 'react-router-dom'
const EventRoot = () => {
    return (
        <>
            <EventsNavigation></EventsNavigation>
            <Outlet></Outlet>
        </>
    )
}

export default EventRoot