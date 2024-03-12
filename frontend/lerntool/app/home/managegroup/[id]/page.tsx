"use client"
import {useEffect, useState} from "react";
import IGroupObject from "../../Model/IGroupObject";
import allgroupInfo from "../../mockdata/allgroupinfo";
import {useRouter} from "next/navigation";
import GetUserToken from "../../controller/GetUserToken";
import "./ManageGroup.css";


export default function ManageGroup({params}: { params: { id: string } }) {

    const [group, setGroup] = useState<IGroupObject>();
    const [isowner, setIsOwner] = useState<boolean>(false);
    const router = useRouter();


    function EditGroupTitle() {
        // Todo: Edit Group Title
    }

    function EditGroupDescription() {
        // Todo: Edit Group Description
    }

    function CheckIfUserIsGroupOwner(): boolean {

        let usertoken = GetUserToken();
        if (!usertoken)
            return false;

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
                if (r.isOwner) {
                    setIsOwner(true);
                    return true;
                }

            })
            .catch((e) => {
                console.error(e);
                // ToDo: need to be remove when backend works
                setIsOwner(true);
                return true;
            });
        setIsOwner(false);
        return false;
    }

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

    function AddMember() {
        // Todo: Add Member
    }

    function DeleteGroup() {

        if (!isowner)
            return false;

        let usertoken = GetUserToken();
        if (!usertoken)
            return false;

        fetch('http://localhost:3080/deletegroup', {
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
                if (r.success) {
                    router.push("/mygroups");
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }

    function RemoveMember(id: number) {
        let usertoken = GetUserToken();
        if (!usertoken)
            return false;

        fetch('http://localhost:3080/removeMember', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': usertoken,
            },
            body: JSON.stringify({
                userid: id,
            }),
        })
            .then((r) => r.json())
            .then((r) => {
                if (r.success) {
                    getGroupInfo();
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }

    function ChangeGroupOwner(id: number) {
        let usertoken = GetUserToken();
        if (!usertoken)
            return false;

        fetch('http://localhost:3080/changeowner', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': usertoken,
            },
            body: JSON.stringify({
                userid: id,
            }),
        })
            .then((r) => r.json())
            .then((r) => {
                if (r.success) {
                    router.push(`/group/${params.id}`);
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }

    useEffect(() => {

        if (CheckIfUserIsGroupOwner())
            router.push("/home");

        getGroupInfo();

    }, []);

    return (
        <div className="manage-group-container">
            <h1 className="manage-group-header">Manage Group</h1>
            <div className="group-option">
                <div className="group-administration">

                    <div className="editgrouptitle">
                        <button onClick={EditGroupTitle}>Edit Group Title</button>
                        <input type="email" name="" id="" value={"Member Email"}/>

                    </div>
                    <div className="editgroupdescription">

                        <button onClick={EditGroupDescription}>Edit Group Description</button>
                        <input type="email" name="" id="" value={"Member Email"}/>

                    </div>
                        <div className="save action-buttons">
                            <button onClick={AddMember}>Save</button>
                        </div>
                </div>

                <div className="memberlist">
                    <h1 className="manage-group-header">Members</h1>
                    <div className="members">
                        {group?.members.map((member: any) => {
                            return (
                                <div className="member" key={member.id}>
                                    <h3>{member.name}</h3>
                                    <p>Role: {member.role}</p>
                                    <div className="btn-group">
                                    <button  className="action-buttons" onClick={() => RemoveMember(member.id)}>Remove Member</button>
                                    <button className="action-buttons" onClick={() => ChangeGroupOwner(member.id)}>Promote to Owner</button>
                                    </div>
                                    </div>
                            );
                        })}
                    </div>
                    <div className="addmember">
                        <div className='member-input'>
                            <label htmlFor="memberEmail">Enter member E-mail</label>

                            <input type="email" name="" id="memberEmail" value={"Member Email"}/>
                        </div>
                        <button className="action-buttons" onClick={AddMember}>Add Member</button>
                    </div>
                </div>
                <div className="deletegroup">
                    <button className="action-buttons" onClick={() => router.push(`/`)}>Delete Group</button>
                </div>
            </div>
        </div>
    );
};
