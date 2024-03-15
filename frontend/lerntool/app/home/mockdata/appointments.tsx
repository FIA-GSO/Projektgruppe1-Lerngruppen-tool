const appointments = [
    {
        id: 1,
        date: Date.parse("2025-09-01T12:00:00Z"),
        location: "Location 1",
        street: "Street 1",
        postcode: "12345",
        duration: 1,
        description: "Cool Description 1",
        group: 1
    },
    {
        id: 2,
        street: "Street 1",
        postcode: "12345",
        date: Date.parse("2025-10-02T12:00:00Z"),
        location: "Location 2",
        duration: 2,
        description: "Cool Description 2",
        group: 1
    },
    {
        id: 3,
        title: "Appointment 3",
        date: Date.parse("2025-10-02T10:00:00Z"),
        location: "Location 3",
        duration: 1,
        description: "Cool Description 3",
        group: 1
    },
    {
        id: 4,
        title: "Appointment 4",
        date: Date.parse("2025-10-02T09:00:00Z"),
        time: "12:00",
        duration: 3,
        location: "Location 4",
        description: "Cool Description 4",
        group: 2
    },
    {
        id: 5,
        title: "Appointment 5",
        date: Date.parse("2025-11-02T10:00:00Z"),
        duration: 1,
        location: "Location 5",
        description: "Cool Description 5",
        group: 2
    },
    {
        id: 6,
        title: "Appointment 6",
        date: Date.parse("2025-11-02T12:00:00Z"),
        duration: 1,
        location: "Location 6",
        description: "Cool Description 6",
        group: 2
    }
];


export default appointments;