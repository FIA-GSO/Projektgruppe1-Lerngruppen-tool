"use client"
import { useRouter } from "next/navigation";
import "./Creategroup.css";

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

        // ToDo
        // Get the user token from local storage
        // const user = JSON.parse(localStorage.getItem('user') ?? '');
        // if (!user || !user.token) {
        //     return;
        // }

        // Send the group data to the server
        fetch('http://localhost:3080/creategroup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'usertoken': "user.token",
                },
                body: JSON.stringify({
                    name: groupname.value,
                    description: groupdescription.value,
                    topic: grouptopic.value,
                    groupstartdate: groupstartdate.value,
                    groupenddate: groupenddate.value,
                    maxmember: groupmembercount.value,
                    location: grouplocation.value,
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
                    <br />
                    <input type="text" id="groupname" />
                </div>
                <div className="formrow">
                    <label htmlFor="groupdescription">Gruppenbeschreibung: </label>
                    <br />
                    <textarea id="groupdescription" />
                </div>
                <div className="formrow">
                    <label htmlFor="grouptopic">Gruppenthema: </label>
                    <br />
                    <input type="text" id="grouptopic" />
                </div>
                <div className="formrow">
                    <label htmlFor="groupstartdate">Startdatum: </label>
                    <br />
                    <input type="date" id="groupstartdate" />
                </div>
                <div className="formrow">
                    <label htmlFor="groupenddate">Enddatum: </label>
                    <br />
                    <input type="date" id="groupenddate" />
                </div>
                <div className="formrow">
                    <label htmlFor="grouplocation">Ort: </label>
                    <br />
                    <input type="text" id="grouplocation" />
                </div>
                <div className="formrow">
                    <label htmlFor="groupmembercount">Maximale Schüler: </label>
                    <br />
                    <input type="number" id="groupmembercount" />
                </div>
                <div className="formrow">
                    <label htmlFor="groupprivat">Nur mein Jahrgang: </label>
                    <input type="checkbox" id="groupprivat" />
                </div>
                <div className="formrow">
                    <input className="submitbutton" type="button" onClick={createGroup} value="Gruppe erstellen" />
                </div>
            </form>
        </div>
    );
    
};
