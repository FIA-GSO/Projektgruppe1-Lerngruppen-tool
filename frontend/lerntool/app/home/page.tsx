"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UpCommingEvents from "./components/Events/UpCommingEvents";
import Groups from "./components/Groups/Groups";
import appointments from "./mockdata/appointments";
import mygroups from "./mockdata/mygroups";

export default function Home(props:any) {

    const { loggedIn, email } = props;
    const [upCommingEvents, setUpCommingEvents] = useState(appointments);
    const [groups, setGroups] = useState(mygroups);
    const router = useRouter();

    useEffect(() => {
        // getUserGroups();
        getUpCommingEvents();
    }, [])

    async function getUserGroups() {
        // ToDo
        // Get user groups logic ...
        // setGroups(userGroups);
        const user = JSON.parse(localStorage.getItem('user') ?? '');
        if (!user || !user.token) {
            return;
        }
        await fetch('http://localhost:3080/groups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': user.token,
            },
        })
        .then((r) => r.json())
        .then((r) => {
            setGroups(r.groups.map((group: any, index: number) => {
                if (index < 3) {
                    return group;
                }
            }));
        })
        .catch((e) => {
            console.error(e);
            setGroups(mygroups);
        });
    }

    function getUpCommingEvents() {
        // ToDo
        // Get upcomming events logic ...
        // setUpCommingEvents(events);
    }

    // Todo: Implement the logic to verify the user token
    // useEffect(() => {
    //     // Fetch the user email and token from local storage
    //     const user = JSON.parse(localStorage.getItem('user'))
      
    //     // If the token/email does not exist, mark the user as logged out
    //     if (!user || !user.token) {
    //         setLoggedIn(false);
    //         return;
    //     }
      
    //     // If the token exists, verify it with the auth server to see if it is valid
    //     fetch('http://localhost:3080/verify', {
    //         method: 'POST',
    //         headers: {
    //             'jwt-token': user.token,
    //         },
    //     })
    //     .then((r) => r.json())
    //     .then((r) => {
    //         setLoggedIn('success' === r.message);
    //         setEmail(user.email || '');
    //     })
    // }, [])

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
