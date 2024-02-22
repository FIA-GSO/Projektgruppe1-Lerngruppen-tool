import "./UpCommingEvents.css";


export default function UpCommingEvents(params: {events: any[]}) {
    

    return (
        <div className="upCommingEvents">
            <h2>Upcoming Events</h2>
            <div className="events">
                {params.events.map((event, index) => {
                    return (
                        <div key={index} className="event">
                            <h3>{event.title}</h3>
                            <p>{event.date}</p>
                            <p>{event.location}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
