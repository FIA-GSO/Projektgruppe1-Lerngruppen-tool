import IGroupsOfUser from "../Model/IGroupsOfUser";

const mygroupsMock = [
    {
        id: 1,
        name: "Gruppe 1",
        description: "Gruppe 1 Beschreibung",
        topic: "Mathe",
        membercount: 5,
        isOwner: true,

    },
    {
        id: 2,
        name: "Gruppe 2",
        description: "Gruppe 2 Beschreibung",
        topic: "Deutsch",
        membercount: 3,
        isOwner: true,
    },
    {
        id: 3,
        name: "Gruppe 3",
        description: "Gruppe 3 Beschreibung",
        topic: "SQL",
        membercount: 3,
        isOwner: true,
    },
    {
        id: 4,
        name: "Gruppe 4",
        description: "Gruppe 4 Beschreibung",
        topic: "Mathe",
        membercount: 3,
        isOwner: false,
    },
    {
        id: 5,
        name: "Gruppe 5",
        description: "Gruppe 5 Beschreibung",
        topic: "Deutsch",
        membercount: 2,
        isOwner: false,
    },
    {
        id: 6,
        name: "Gruppe 6",
        description: "Gruppe 6 Beschreibung",
        topic: "English",
        membercount: 3,
        isOwner: false,
    },
    {
        id: 7,
        name: "Gruppe 7",
        description: "Gruppe 7 Beschreibung",
        topic: "Deutsch",
        membercount: 1,
        isOwner: false,
    },

] as IGroupsOfUser[];

export default mygroupsMock;