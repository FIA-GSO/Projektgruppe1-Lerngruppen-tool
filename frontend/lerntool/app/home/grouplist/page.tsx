"use client"
import { useEffect, useState } from "react";
import grouplist from "../mockdata/grouplists";
import "./Grouplist.css";
import { useRouter } from "next/navigation";
import IGroupList from "../Model/IGroupList";
import GetUserToken from "../controller/GetUserToken";

export default function GroupList() {

    const [groups, setGroups] = useState<IGroupList[]>();
    const router = useRouter();

    useEffect(() => {
        getGroups();
    }, []);

    function getGroups() {

        let usertoken = GetUserToken();
        if (!usertoken) 
            return;
        
        // Perform a GET request to fetch groups, including the JWT token in the request headers for authentication.

        fetch('http://localhost:3080/groups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': usertoken,
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

        let usertoken = GetUserToken();
        if (!usertoken) 
            return;

        // Perform a POST request to join a group, including the user token and group ID in the request.

        fetch('http://localhost:3080/joingroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'usertoken': usertoken,
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
    
    // Render the component UI.

    return (
        <section className="grouplist-container">
            <div className="groups">
                <h2 className="title">Gruppen Liste:</h2>
                <div className="listcontainer">
                    <ul className="grouplist-list">
                        {groups?.map((group) => {
                            return (
                                <li className="grouplist-item" key={group.id}>
                                    <h1>Name: {group.name}</h1>
                                    <h3>Thema: {group.topic}</h3>
                                    <p className='member-count'>Mitglieder zahl: {group.membercount}</p>
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
