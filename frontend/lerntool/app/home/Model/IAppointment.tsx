export default interface IAppointment {
    id: number;
    description: string;
    date: Date;
    location: string;
    street: string;
    postcode: string;
    duration: number;
}