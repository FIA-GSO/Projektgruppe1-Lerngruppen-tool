"use client"

export default function CreateGroup() {

    function createGroup() {
        // Todo: Implement create group
    }

    return (
        <div className="container">
            <h1>Gruppe erstellen:</h1>
            <form>
                <div>
                    <label htmlFor="groupname">Gruppenname: </label>
                    <input type="text" id="groupname" />
                </div>
                <div>
                    <label htmlFor="groupdescription">Gruppenbeschreibung: </label>
                    <input type="text" id="groupdescription" />
                </div>
                <div>
                    <label htmlFor="grouptopic">Gruppenthema: </label>
                    <input type="text" id="grouptopic" />
                </div>
                <div>
                    <label htmlFor="groupmembercount">Membercount: </label>
                    <input type="number" id="groupmembercount" />
                </div>
                <div>
                    <label htmlFor="groupprivat">Nur mein Jahrgang: </label>
                    <input type="checkbox" id="groupprivat" />
                </div>
                <div>
                    <input className="bg-blue-600 p-3" type="button" onClick={createGroup} value="Gruppe erstellen" />
                </div>
            </form>
        </div>
    );
    
};
