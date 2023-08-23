import { Await, defer, json, redirect, useRouteLoaderData } from "react-router-dom"
import EventItem from '../components/EventItem'
import EventsList from "../components/EventsList"
import { Suspense } from "react"

const EventDetailPage = () => {
    const {event, events} = useRouteLoaderData('event-detail')
    return (
        <>
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
            <Await resolve={event}>
               {(loadedEvent) => <EventItem event={loadedEvent}/>}
            </Await>    
        </Suspense>
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
            <Await resolve={events} >
                {(loadEvents) => <EventsList events={loadEvents}></EventsList>}
            </Await>
        </Suspense>
        </>
    )
}
export default EventDetailPage

async function loadedEvent (id) {
    const response = await fetch ("http://localhost:8080/events/" + id)
    if (!response.ok) {
        throw json({message: 'Could not fetch details for selected events.'}, 
        {status: 500})
    } else {
        const resData = await response.json()
        return resData.event
    }
}

async function loadEvents () {
    const response = await fetch("http://localhost:8080/events");
  
    if (!response.ok) {
      // return ({isError: true, message: 'Could not fetch events'})
      // throw new Response(JSON.stringify({message: 'Could not fetch events'}), {status: 500})
      throw json ({message: 'Could not fetch events'}, {status: 500})
    } else {
      const resData = await response.json()
      return resData.events
      
    }
}




export async function loader({request, params}) {
    const id = params.eventsID
    return defer ({
        event: await loadedEvent(id),
        events: loadEvents()
    })
}

export async function action({request, params}) {
    const id = params.eventsID
    const response = await fetch ("http://localhost:8080/events/" + id, {
        method: request.method
    })
    if (!response.ok) {
        throw json({message: 'Could not delete event'}, 
        {status: 500})
    }
    return redirect('/events')
}