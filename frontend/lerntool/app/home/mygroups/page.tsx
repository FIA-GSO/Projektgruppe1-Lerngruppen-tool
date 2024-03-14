"use client"
import { useEffect, useState } from "react";
import mygroupsMock from "../mockdata/mygroups";
import "./MyGroups.css";
import { useRouter } from "next/navigation";
import IGroupsOfUser from "../Model/IGroupsOfUser";
import GetUserToken from "../controller/GetUserToken";

// Define the MyGroups component.

export default function MyGroups() {

    // State hooks for managing the groups where the user is an owner and where they are not.

    const [ mygroups, setMyGroups ] = useState<IGroupsOfUser[]>();
    const [ othergroups, setOtherGroups ] = useState<IGroupsOfUser[]>();

    useEffect(() => {
        getUserGroups();
    }, []);

    async function getUserGroups() {
        
        let usertoken = GetUserToken();
        if (!usertoken) 
            return;

        // Perform a GET request to fetch the groups of the user.

        await fetch('http://localhost:3080/groupsofuser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': usertoken,
            },
        })
        .then((r) => r.json())
        .then((r) => {
            if(r.groups)
            {
                r.groups.map((group: IGroupsOfUser) => {
                    if(group.isOwner)
                        setMyGroups((prev) => [...(prev || []), group]);
                    else
                        setOtherGroups((prev) => [...(prev || []), group]);
                });
            }   
        })
        .catch((e) => {
            console.error(e);
            mygroupsMock.map((group: IGroupsOfUser) => {
                if(group.isOwner)
                    setMyGroups((prev) => [...(prev || []), group]);
                else
                    setOtherGroups((prev) => [...(prev || []), group]);
            });
        });
    }

    function leaveGroup(groupid: number) {

        let usertoken = GetUserToken();
        if (!usertoken) 
            return;

        // Perform a POST request to leave a group, including the group ID in the request body.

        fetch('http://localhost:3080/leavegroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': usertoken,
            },
            body: JSON.stringify({
                groupid: groupid,
            }),
        })
        .then((response) => {
            if (response.status === 200) {
                window.location.reload();
            }
        })
        .catch((e) => {
            console.error(e);
        });
    }

    return (
        <section className="mygrouplist-container">
            <GroupList groups={mygroups ?? []} owner={true} leaveGroup={leaveGroup} />
            <GroupList groups={othergroups ?? []} owner={false} leaveGroup={leaveGroup} />
        </section>
    );
};

function GroupList(params: { groups: IGroupsOfUser[], owner: boolean, leaveGroup: (groupid: number) => void }) {

    const router = useRouter();
    
    // Render the component UI.

    return (
        <div className="groups">
            <h2 className="title">{params.owner ? "Meine Gruppen" : "Andere Gruppen"}:</h2>
            <ul className="mygrouplist-list">
                {params.groups.map((group) => {
                    return (
                        <li className="mygrouplist-item" key={group.id}>
                            <h1>{group.name}</h1>
                            <h3>Thema: {group.topic}</h3>
                            <div className="group-action-buttons">
                            <a className="btn-to-group" href={`/home/group/${group.id}`}>Zu Gruppe</a>
                            {params.owner 
                                ? <button className="btn-to-group" onClick={() => router.push(`/home/managegroup/${group.id}`)} >Verwalten</button>
                                : <button className="btn-to-group" onClick={() => params.leaveGroup(group.id)} >Gruppe Verlassen</button>
                            }
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
