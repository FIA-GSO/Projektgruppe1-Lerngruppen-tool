"use client"
import { useState } from "react";
import mygroups from "../mockdata/mygroups";
import "./MyGroups.css";

export default function MyGroups() {
    
    const [ groups, setGroups ] = useState(mygroups);

    function getUserGroups() {
        // ToDo
        // Get user groups logic ...
        // setGroups(userGroups);
    }

    function leaveGroup() {
        // ToDo
        // Leave group logic ...
    }


    return (
        <section className="mygrouplist-container">
            <div className="groups">
                <h2 className="title">Meine Gruppen:</h2>
                <ul className="mygrouplist-list">
                    {groups.map((group) => {
                        return (
                            <li className="mygrouplist-item" key={group.id}>
                                <div>{group.title}</div>
                                <div>Thema: {group.topic}</div>
                                <a className="btn-to-group" href={`/home/group/${group.id}`}>Zu Gruppe</a>
                                <a className="btn-to-group" onClick={leaveGroup} >Gruppe Verlassen</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};
