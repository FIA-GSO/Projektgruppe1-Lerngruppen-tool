import IAppointment from "../../Model/IAppointment";
import "./UpCommingEvents.css";


export default function UpCommingEvents(params: { events: any[] }) {

    return (
        <div className="upComingEvents">
            <h2 id="events-header">Upcoming Events</h2>
            <div className="events">
                {params.events.map((event: IAppointment, index) => {
                    const date = new Date(event.date).toLocaleDateString('de-DE');
                    const time = new Date(event.date).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
                    
                    console.log(`Datum: ${date}, Zeit: ${time}`);
                    return (
                        <div key={index} className="event">
                            <div>{event.description}</div>
                            <div>{date} {time}</div>
                            <div>{event.location}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};