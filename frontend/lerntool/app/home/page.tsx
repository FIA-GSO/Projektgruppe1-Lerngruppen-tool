"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UpCommingEvents from "./components/Events/UpCommingEvents";
import Groups from "./components/Groups/Groups";
import appointments from "./mockdata/appointments";
import mygroupsMock from "./mockdata/mygroups";
import GetUserToken from "./controller/GetUserToken";
import IGroupsOfUser from "./Model/IGroupsOfUser";

export default function Home(props:any) {

    const { loggedIn, email } = props;
    const [upCommingEvents, setUpCommingEvents] = useState(appointments);
    const [groups, setGroups] = useState<IGroupsOfUser[]>();
    const router = useRouter();

    useEffect(() => {
        if (VerifyUser())
            router.push('/login');

        getUserGroups();
        getUpCommingEvents();
    }, [])

    async function getUserGroups() {
        
        let usertoken = GetUserToken();
        if (!usertoken) 
            return;
        
        await fetch('http://127.0.0.1:8000/groups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': usertoken,
            },
        })
        .then((r) => r.json())
        .then((r) => {
            setGroups(r.groups);
        })
        .catch((e) => {
            console.error(e);
            setGroups(mygroupsMock);
        });
    }

    async function getUpCommingEvents() {

        let usertoken = GetUserToken();
        if (!usertoken) 
            return;
        
        await fetch('http://127.0.0.1:8000/getuserevents', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': usertoken,
            },
        })
        .then((r) => r.json())
        .then((r) => {
            setUpCommingEvents(r.events);
        })
        .catch((e) => {
            console.error(e);
            setUpCommingEvents(appointments);
        });
    }

    function VerifyUser(): boolean {

        let usertoken = GetUserToken();
        if (!usertoken) 
            return false;
      
        // If the token exists, verify it with the auth server to see if it is valid
        fetch('http://127.0.0.1:8000/verify', {
            method: 'POST',
            headers: {
                'jwt-token': usertoken,
            },
        })
        .then((r) => r.json())
        .then((r) => {
            if ('success' === r.message) {
                return true;
            } else {
                return false;
            }
        });
        return false;
    }

    const onButtonClick = () => {
        if (loggedIn) {
            localStorage.removeItem('user');
            props.setLoggedIn(false);
        } else {
            router.push('/login');
        }
    }


    return (
        <div className="mainContainer">
            <Groups groups={groups} />
            <UpCommingEvents events={upCommingEvents} />
        </div>
    );
    
};
