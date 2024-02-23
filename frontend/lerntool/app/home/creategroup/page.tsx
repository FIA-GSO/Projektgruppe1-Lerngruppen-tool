"use client"
import "./Creategroup.css";

export default function CreateGroup() {

    function createGroup() {
        // Todo: Implement create group
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
