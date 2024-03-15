"use client"
import { useEffect, useState } from "react";
import allgroupInfo from "../../mockdata/allgroupinfo";
import "./Group.css";
import GetUserToken from "../../controller/GetUserToken";
import { useRouter } from "next/navigation";
import IGroupObject from "../../Model/IGroupObject";
import IMember from "../../Model/IMember";
import IAppointment from "../../Model/IAppointment";

// Define the Group component accepting `params` as props.

export default function Group({ params }: { params: { id: string } }) {

    const [group, setGroup] = useState(allgroupInfo);
    const [userOwner, setUserOwner] = useState(false);

    const router = useRouter();

    useEffect(() => {

        CheckGroupOwnership();
        getGroupInfo();
        
    }, []);

    function getGroupInfo() {
        let usertoken = GetUserToken();
        if (!usertoken) 
            return false;

        fetch('http://localhost:3080/group', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': usertoken,
            },
            body: JSON.stringify({
                groupid: params.id,
            }),
        })
        .then((r) => r.json())
        .then((r) => {
            setGroup(r.group);
        })
        .catch((e) => {
            console.error(e);
            setGroup(allgroupInfo);
        });
    }
    // Function to verify if the current user is the owner of the group.

    function CheckGroupOwnership() {
        let usertoken = GetUserToken();
        if (!usertoken) 
            return;

        // Use fetch API to verify group ownership, including JWT token in the headers.

        fetch(`http://localhost:3080/verifyownership/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': usertoken,
            },

        })
        .then((r) => r.json())
        .then((r) => {
            if(r.isOwner)
                setUserOwner(true);
        })
        .catch((e) => {
            console.error(e);
        });
        
    }
    // Function to navigate to the new appointment creation page.

    function createNewAppointment() {
        GetUserToken();
        router.push(`/home/newevent?groupid=${params.id}`);
    }
    // Render the component UI.

    return (
        <section className="group-container">
            <div className="info">
                <div className="groupinfo">
                    <h2>{group.info.name}</h2>
                    <p>Description: {group.info.description}</p>
                    <p>Topic: {group.info.topic}</p>
                    <p>Members: {group.members.length}</p>
                </div>
                <div className="group-members">
                    <h2>Members</h2>
                    <div className="members">
                        {group.members.map((member: IMember) => {
                            return (
                                <div className="member" key={member.id}>
                                    <h3>{member.firstname} {member.lastname}</h3>
                                    <p>Role: {member.admin ? "Admin" : "Schüler"}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="group-appointments">
                    <h2>Appointments</h2>
                    <div className="appointments">
                        {group.appointments.map((appointment: IAppointment) => {
                            return (
                                <div className="appointment" key={appointment.id}>
                                    <h3>{appointment.description}</h3>
                                    <p>Datum: {new Date(appointment.date).toLocaleDateString('de-DE')}</p>
                                    <p>Zeit: {new Date(appointment.date).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</p>
                                    <p>Ort: {appointment.location}</p>
                                </div>
                            );
                        })}
                    </div>
                    <button className=" submit-button bg-blue-600 p-2" type="button" onClick={createNewAppointment}>
                        Neuen Termin
                    </button>
                </div>

                {userOwner ? <a className="btn" href={`/home/managegroup/${params.id}`}>Gruppe verwalten</a> : ""}
            </div>
        </section>
    );
};
