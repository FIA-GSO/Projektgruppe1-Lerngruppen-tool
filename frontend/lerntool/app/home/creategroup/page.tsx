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
        const groupmembercount = document.getElementById('groupmembercount') as HTMLInputElement;
        const groupprivat = document.getElementById('groupprivat') as HTMLInputElement;
        console.log(groupname.value, groupdescription.value, grouptopic.value, groupmembercount.value, groupprivat.checked);

        // Get the user token from local storage
        const user = JSON.parse(localStorage.getItem('user') ?? '');
        if (!user || !user.token) {
            return;
        }

        // Send the group data to the server
        fetch('http://localhost:3080/creategroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'usertoken': user.token,
            },
            body: JSON.stringify({
                groupname: groupname.value,
                groupdescription: groupdescription.value,
                grouptopic: grouptopic.value,
                groupmembercount: groupmembercount.value,
                groupprivat: groupprivat.checked,
            }),
        }).then((r) => {
            if (r.status === 200) {
                // If the group was created successfully, redirect to the group page
                router.push('/mygroups');
            }
        }).catch((e) => {
            console.error(e);
        });
    }

    return (
        <div className="container">
            <h1 className="header">Gruppe erstellen:</h1>
            <form className="creategroupform">
                <div>
                    <label htmlFor="groupname">Gruppenname: </label>
                    <br />
                    <input type="text" id="groupname" />
                </div>
                <div>
                    <label htmlFor="groupdescription">Gruppenbeschreibung: </label>
                    <br />
                    <input type="text" id="groupdescription" />
                </div>
                <div>
                    <label htmlFor="grouptopic">Gruppenthema: </label>
                    <br />
                    <input type="text" id="grouptopic" />
                </div>
                <div>
                    <label htmlFor="groupmembercount">Maximale Schüler: </label>
                    <br />
                    <input type="number" id="groupmembercount" />
                </div>
                <div>
                    <label htmlFor="groupprivat">Nur mein Jahrgang: </label>
                    <input type="checkbox" id="groupprivat" />
                </div>
                
                <div>
                    <input className="submitbutton" type="button" onClick={createGroup} value="Gruppe erstellen" />
                </div>
            </form>
        </div>
    );
    
};
