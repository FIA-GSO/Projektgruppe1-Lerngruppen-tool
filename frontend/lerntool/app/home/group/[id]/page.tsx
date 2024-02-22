"use client"
import { useState } from "react";
import allgroupInfo from "../../mockdata/allgroupinfo";
import "./Group.css";

export default function Group({ params }: { params: { id: string } }) {

    const [group, setGroup] = useState(allgroupInfo);

    // Todo
    // Useeffect here to get group information from server ...

    function getGroupInfo(groupid: number) {
        // Todo
        // Get group information from server ...
    }

    function createNewAppointment() {
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
            </div>
        </section>
    );
};
