export default interface IGroupObject {
    id: string;
    info: {
        name: string;
        topic: string;
        description: string;
        membercount: number;
    };
    appointments: {
        id: number;
        title: string;
        date: string;
        time: string;
        location: string;
        description: string;
    }[];
    members: {
        id: string;
        name: string;
        role: string;
    }[];
}