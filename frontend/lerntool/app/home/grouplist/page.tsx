"use client"
import { useState } from "react";
import grouplist from "../mockdata/grouplists";
import "./Grouplist.css";

export default function GroupList() {

    const [groups, setGroups] = useState(grouplist);

    function joinGroup() {
        // ToDo
        // Join group logic ...
    }
    
    return (
        <section className="grouplist-container">
            <div className="groups">
                <h2 className="title">Gruppen Liste:</h2>
                <div className="listcontainer">
                    <ul className="grouplist-list">
                        {groups.map((group) => {
                            return (
                                <li className="grouplist-item" key={group.id}>
                                    <div>Name: {group.title}</div>
                                    <div>Thema: {group.topic}</div>
                                    <div>Mitglieder zahl: {group.membercount}</div>
                                    <button className="btn-to-group" onClick={joinGroup}>Join group</button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
};
