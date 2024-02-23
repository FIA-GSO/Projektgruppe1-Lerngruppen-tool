import "./UpCommingEvents.css";


export default function UpCommingEvents(params: {events: any[]}) {
    

    return (
        <div className="upCommingEvents">
            <h2>Upcoming Events</h2>
            <div className="events">
                {params.events.map((event, index) => {
                    return (
                        <div key={index} className="event">
                            <div>{event.title}</div>
                            <div>{event.date}</div>
                            <div>{event.location}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};