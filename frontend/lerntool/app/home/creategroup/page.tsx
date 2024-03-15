"use client"
import {useRouter} from "next/navigation";
import "./Creategroup.css";
import GetUserToken from "../controller/GetUserToken";

export default function CreateGroup() {

    const router = useRouter();

    function createGroup() {
        // Get the group data from the form
        const groupname = document.getElementById('groupname') as HTMLInputElement;
        const groupdescription = document.getElementById('groupdescription') as HTMLInputElement;
        const grouptopic = document.getElementById('grouptopic') as HTMLInputElement;
        const groupstartdate = document.getElementById('groupstartdate') as HTMLInputElement;
        const groupenddate = document.getElementById('groupenddate') as HTMLInputElement;
        const grouplocation = document.getElementById('grouplocation') as HTMLInputElement;
        const groupmembercount = document.getElementById('groupmembercount') as HTMLInputElement;
        const groupprivat = document.getElementById('groupprivat') as HTMLInputElement;
        console.log(groupname.value, groupdescription.value, grouptopic.value, groupmembercount.value, groupprivat.checked, groupstartdate.value, groupenddate.value, grouplocation.value);

        let usertoken = GetUserToken();
        if (!usertoken)
            return;

        // Send the group data to the server
        fetch('http://127.0.0.1:8000/creategroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'usertoken': usertoken,
            },
            body: JSON.stringify({
                name: groupname.value,
                description: groupdescription.value,
                topic: grouptopic.value,
                groupstartdate: groupstartdate.value,
                groupenddate: groupenddate.value,
                maxmember: groupmembercount.value,
                thisyearonly: groupprivat.checked,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                let groupid = data.groupid;
                if (groupid) {
                    router.push(`/group/${groupid}`);
                }
            }).catch((e) => {
            console.error(e);
        });
    }

    return (
        <div className="container">
            <h1 className="header">Gruppe erstellen:</h1>
            <form className="creategroupform">
                <div className="formrow">
                    <label htmlFor="groupname">Gruppenname: </label>
                    <br/>
                    <input type="text" id="groupname"/>
                </div>
                <div className="formrow">
                    <label htmlFor="groupdescription">Gruppenbeschreibung: </label>
                    <br/>
                    <textarea id="groupdescription"/>
                </div>
                <div className="formrow">
                    <label htmlFor="grouptopic">Gruppenthema: </label>
                    <br/>
                    <input type="text" id="grouptopic"/>
                </div>
                <div className="formrow">
                    <label htmlFor="groupstartdate">Startdatum: </label>
                    <br/>
                    <input type="date" id="groupstartdate"/>
                </div>
                <div className="formrow">
                    <label htmlFor="groupenddate">Enddatum: </label>
                    <br/>
                    <input type="date" id="groupenddate"/>
                </div>
                <div className="formrow">
                    <label htmlFor="groupmembercount">Maximale Schüler: </label>
                    <br/>
                    <input type="number" id="groupmembercount"/>
                </div>
                <div className="formrow">
                    <div className='private-formrow'>
                        <label htmlFor="groupprivat">Nur mein Jahrgang: </label>
                        <input type="checkbox" id="groupprivat"/>
                    </div>
                </div>
                <div className="formrow">
                    <button className="submitbutton" type="submit" onClick={createGroup} value="erstellen">Submit </button>
                </div>
            </form>
        </div>
    );

};
