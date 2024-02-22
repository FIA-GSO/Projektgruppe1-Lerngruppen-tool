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
                <ul className="grouplist-list">
                    {groups.map((group) => {
                        return (
                            <li className="grouplist-item" key={group.id}>
                                <div>{group.title}</div>
                                <div>Thema: {group.topic}</div>
                                <div>Mitglieder zahl: {group.membercount}</div>
                                <a className="btn-to-group" onClick={joinGroup}>Join group</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};
