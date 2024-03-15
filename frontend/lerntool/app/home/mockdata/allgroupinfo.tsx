import appointments from "./appointments";
import IGroupInfo from "../Model/IGroupObject";

const allgroupInfo: IGroupInfo = {
    id: "1",
    info : {
        name: "Group 1",
        topic: "Math",
        description: "This is a group for math"
    },
    appointments: appointments,
    members: [
        {
            id: "1",
            firstname: "John",
            lastname: "John",
            admin: true
        },
        {
            id: "2",
            firstname: "Doe",
            lastname: "John",
            admin: false
        },
        {
            id: "3",
            firstname: "Jane",
            lastname: "John",
            admin: false
        },
        {
            id: "4",
            firstname: "Doe",
            lastname: "John",
            admin: false
        },
        {
            id: "5",
            firstname: "Doe",
            lastname: "John",
            admin: false
        }
    ]

};



export default allgroupInfo;