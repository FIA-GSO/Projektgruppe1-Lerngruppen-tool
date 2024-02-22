"use client"
import { useEffect, useState } from "react";
import mygroupsMock from "../mockdata/mygroups";
import othergroupsMock from "../mockdata/othergroups";
import "./MyGroups.css";
import { useRouter } from "next/navigation";

export default function MyGroups() {
    
    const [ mygroups, setMyGroups ] = useState(mygroupsMock);
    const [ othergroups, setOtherGroups ] = useState(othergroupsMock);

    useEffect(() => {
        getUserGroups();
    }, []);

    function getUserGroups() {
        // ToDo
        // Get user groups logic ...
        // setGroups(userGroups);
    }

    function leaveGroup(groupid: number) {
        // ToDo
        // Leave group logic ...
    }

    return (
        <section className="mygrouplist-container">
            <GroupList groups={mygroups} owner={true} leaveGroup={leaveGroup} />
            <GroupList groups={othergroups} owner={false} leaveGroup={leaveGroup} />
        </section>
    );
};

function GroupList(params: { groups: any[], owner: boolean, leaveGroup: (groupid: number) => void }) {

    const router = useRouter();

    return (
        <div className="groups">
            <h2 className="title">{params.owner ? "Meine Gruppen" : "Andere Gruppen"}:</h2>
            <ul className="mygrouplist-list">
                {params.groups.map((group) => {
                    return (
                        <li className="mygrouplist-item" key={group.id}>
                            <div>{group.title}</div>
                            <div>Thema: {group.topic}</div>
                            <a className="btn-to-group" href={`/home/group/${group.id}`}>Zu Gruppe</a>
                            {params.owner 
                                ? <a className="btn-to-group" onClick={() => router.push(`/home/managegroup/${group.id}`)} >Verwalten</a>
                                : <a className="btn-to-group" onClick={() => params.leaveGroup(group.id)} >Gruppe Verlassen</a>
                            }
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
