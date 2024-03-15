import IAppointment from "./IAppointment";
import IMember from "./IMember";

export default interface IGroupObject {
    id: string;
    info: {
        name: string;
        topic: string;
        description: string;
    };
    appointments: IAppointment[];
    members: IMember[];
}