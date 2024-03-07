"use client"
import { useEffect, useState } from "react";
import allgroupInfo from "../../mockdata/allgroupinfo";
import "./Group.css";
import GetUserToken from "../../controller/GetUserToken";

export default function Group({ params }: { params: { id: string } }) {

    const [group, setGroup] = useState(allgroupInfo);
    const [userOwner, setUserOwner] = useState(false);

    // Todo
    // Useeffect here to get group information from server ...

    useEffect(() => {

        CheckGroupOwnership();
        
        // ToDo
        // Get group information from server ...
    }, []);

    function CheckGroupOwnership() {
        let usertoken = GetUserToken();
        if (!usertoken) 
            return;

        fetch('http://localhost:3080/verifyownership', {
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
            if(r.isOwner)
                setUserOwner(true);
        })
        .catch((e) => {
            console.error(e);
        });
        
    }

    function createNewAppointment() {
        GetUserToken();
        // Todo
        // Create a new appointment client logic ...
    }

    return (
        <section className="group-container">
            <h1>Group</h1>
            <div className="info">
                <div className="groupinfo">
                    <h2>{group.info.name}</h2>
                    <p>Description: {group.info.description}</p>
                    <p>Topic: {group.info.topic}</p>
                    <p>Members: {group.info.membercount}</p>
                </div>
                <div className="group-appointments">
                    <h2>Appointments</h2>
                    <div className="appointments">
                        {group.appointments.map((appointment: any) => {
                            return (
                                <div className="appointment" key={appointment.id}>
                                    <h3>{appointment.title}</h3>
                                    <p>Time: {appointment.time}</p>
                                    <p>Location: {appointment.location}</p>
                                </div>
                            );
                        })}
                    </div>
                    <input className="bg-blue-600 p-2" type="button" onClick={createNewAppointment} value="Neuen Termin" />
                </div>
                <div className="group-members">
                    <h2>Members</h2>
                    <div className="members">
                        {group.members.map((member: any) => {
                            return (
                                <div className="member" key={member.id}>
                                    <h3>{member.name}</h3>
                                    <p>Role: {member.role}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {userOwner ? <a className="btn" href={`/home/managegroup/${params.id}`}>Gruppe verwalten</a> : ""}
            </div>
        </section>
    );
};
