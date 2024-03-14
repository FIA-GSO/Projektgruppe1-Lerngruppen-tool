"use client"
import { useEffect, useState } from "react";
import allgroupInfo from "../../mockdata/allgroupinfo";
import "./Group.css";
import GetUserToken from "../../controller/GetUserToken";
import { useRouter } from "next/navigation";

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
        router.push(`/home/newevent?groupid=${params.id}`);
    }

    return (
        <section className="group-container">
            <div className="info">
                <div className="groupinfo">
                    <h2>{group.info.name}</h2>
                    <p>Description: {group.info.description}</p>
                    <p>Topic: {group.info.topic}</p>
                    <p>Members: {group.info.membercount}</p>
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
                    <button className=" submit-button bg-blue-600 p-2" type="button" onClick={createNewAppointment}>
                        Neuen Termin
                    </button>
                </div>

                {userOwner ? <a className="btn" href={`/home/managegroup/${params.id}`}>Gruppe verwalten</a> : ""}
            </div>
        </section>
    );
};
