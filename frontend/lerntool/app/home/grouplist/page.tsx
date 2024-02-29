"use client"
import { useEffect, useState } from "react";
import grouplist from "../mockdata/grouplists";
import "./Grouplist.css";
import { useRouter } from "next/navigation";
import IGroupList from "../Model/IGroupList";

export default function GroupList() {

    const [groups, setGroups] = useState<IGroupList[]>();
    const router = useRouter();

    useEffect(() => {
        getGroups();
    }, []);

    function getGroups() {

        // Get the user token from local storage
        // const user = JSON.parse(localStorage.getItem('user') ?? '');
        // if (!user || !user.token) {
        //     return;
        // }

        fetch('http://localhost:3080/groups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': "user.token",
            },
        })
        .then((r) => r.json())
        .then((r) => {
            if(r.groups)
                setGroups(r.groups);
        })
        .catch((e) => {
            console.error(e);
            setGroups(grouplist);
        });
    }

    function joinGroup(groupid: number) {
        fetch('http://localhost:3080/joingroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'usertoken': "user.token",
            },
            body: JSON.stringify({
                groupid: groupid,
            }),
        })
        .then((response) => {
            if (response.status === 200) {
                router.push(`/group/${groupid}`);
            }
        })
        .catch((e) => {
            console.error(e);
        });
    }
    
    return (
        <section className="grouplist-container">
            <div className="groups">
                <h2 className="title">Gruppen Liste:</h2>
                <div className="listcontainer">
                    <ul className="grouplist-list">
                        {groups?.map((group) => {
                            return (
                                <li className="grouplist-item" key={group.id}>
                                    <div>Name: {group.name}</div>
                                    <div>Thema: {group.topic}</div>
                                    <div>Mitglieder zahl: {group.membercount}</div>
                                    <button className="btn-to-group" onClick={() => joinGroup(group.id)}>Join group</button>
                                </li>
                            );
                        }) ?? <li>Loading groups...</li>}
                    </ul>
                </div>
            </div>
        </section>
    );
};
