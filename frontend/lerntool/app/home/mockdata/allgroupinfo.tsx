import appointments from "./appointments";
import IGroupInfo from "../Model/IGroupObject";

const allgroupInfo: IGroupInfo = {
    id: "1",
    info : {
        name: "Group 1",
        topic: "Math",
        description: "This is a group for math",
        membercount: 5
    },
    appointments: appointments,
    members: [
        {
            id: "1",
            name: "John",
            role: "Admin"
        },
        {
            id: "2",
            name: "Doe",
            role: "User"
        },
        {
            id: "3",
            name: "Jane",
            role: "User"
        },
        {
            id: "4",
            name: "Doe",
            role: "User"
        },
        {
            id: "5",
            name: "Doe",
            role: "User"
        }
    ]

};



export default allgroupInfo;