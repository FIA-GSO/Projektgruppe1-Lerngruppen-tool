import { use, useEffect, useState } from "react";
import IGroupObject from "../../Model/IGroupObject";
import allgroupInfo from "../../mockdata/allgroupinfo";



export default function ManageGroup({ params }: { params: { id: string } }) {

    const [group, setGroup] = useState<IGroupObject>(allgroupInfo);

    

    function EditGroupTitle() {
        // Todo: Edit Group Title
    }

    function EditGroupDescription() {
        // Todo: Edit Group Description
    }
    
    useEffect(() => {
        function CheckIfUserIsGroupOwner() {
            // Todo: Check if User is Group Owner
            // Get current user
            // User should be able to manage group if he is the owner
            // check if user is group owner
            // return true or false/show error message
        }
        function getGroupInfo() {
            // Todo: Get group information from server ...
            // use params.id to get the group id
        }
    }, []);
    

    function AddMember() {
        // Todo: Add Member
    }

    function DeleteGroup() {
        // Todo: Delete Group
        // Then redirect to home page
    }
    function RemoveMember(id: number) {
        // Todo: Remove Member
    }
    function ChangeGroupOwner() {
        // Todo: Change Group Owner
    }

    return (
        <div>
            <h1>Manage Group</h1>
            <div className="group-option">
                <div className="deletegroup">
                    <button onClick={DeleteGroup}>Delete Group</button>
                </div>
                <div className="editgrouptitle">
                    <button onClick={EditGroupTitle}>Edit Group Title</button>
                </div>
                <div className="editgroupdescription">
                    <button onClick={EditGroupDescription}>Edit Group Description</button>
                </div>
                <div className="memberlist">
                    <h2>Members</h2>
                    <div className="members">
                        {group.members.map((member: any) => {
                            return (
                                <div className="member" key={member.id}>
                                    <h3>{member.name}</h3>
                                    <p>Role: {member.role}</p>
                                    <button onClick={() => RemoveMember(member.id)}>Remove Member</button>
                                    <button onClick={ChangeGroupOwner}>Promote to Owner</button>
                                </div>
                            );
                        })}
                    </div>
                    <div className="addmember">
                        <input type="email" name="" id="" value={"Member Email"} />
                        <button onClick={AddMember}>Add Member</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
