"use client"
import {useRouter, useSearchParams} from "next/navigation";
import "./NewEvent.css";
import GetUserToken from "../controller/GetUserToken";

export default function NewEvent() {

    const router = useRouter();
    const searchParams = useSearchParams()


    async function addevent() {
        
        // Get the group data from the form
        const topic = document.getElementById('topic') as HTMLInputElement;
        const date = document.getElementById('date') as HTMLInputElement;
        const duration = document.getElementById('duration') as HTMLInputElement;
        const location = document.getElementById('location') as HTMLInputElement;
        const postcode = document.getElementById('postcode') as HTMLInputElement;
        const street = document.getElementById('street') as HTMLInputElement;
        const groupid = searchParams.get('groupid');

        // if(groupid === undefined || groupid === null || groupid === "")
        //     router.push('/home');
    
        console.log(groupid, topic.value, date.value, duration.value, street.value, location.value, postcode.value);

        let usertoken = GetUserToken();
        if (!usertoken)
            return;

        // Send the group data to the server
        await fetch('http://127.0.0.1:8000/newevent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'usertoken': usertoken,
            },
            body: JSON.stringify({
                topic: topic.value,
                date: date.value,
                duration: duration.value,
                location: location.value,
                postcode: postcode.value,
                street: street.value,
                groupid: groupid,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success === true) {
                    router.push(`/home/group/${groupid}`);
                }
            }).catch((e) => {
                console.error(e);
                router.push(`/home/group/${groupid}`);
            });
            
    }

    return (
        <div className="container">
            <h1 className="header">Termin Erstellen:</h1>
            <div className="createeventform">
                <div className="formrow">
                    <label htmlFor="topic">Thema: </label>
                    <br/>
                    <input type="text" id="topic"/>
                </div>
                <div className="formrow">
                    <label htmlFor="date">Startdatum: </label>
                    <br/>
                    <input type="date" id="date"/>
                </div>
                <div className="formrow">
                    <label htmlFor="duration">Dauer: </label>
                    <br/>
                    <input type="number" id="duration"/>
                </div>
                <div className="formrow">
                    <label htmlFor="location">Ort: </label>
                    <br/>
                    <input type="text" id="location"/>
                </div>
                <div className="formrow">
                    <label htmlFor="postcode">PLZ: </label>
                    <br/>
                    <input type="text" id="postcode"/>
                </div>
                <div className="formrow">
                    <label htmlFor="street">Straße: </label>
                    <br/>
                    <input type="text" id="street"/>
                </div>
                <div className="formrow">
                    <button className="submitbutton" onClick={addevent} value="Einstellen">Einstellen </button>
                </div>
            </div>
        </div>
    );

};
