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
        // Todo
        // Get upcomming events of client logic ...
        
        // Todo
        // get groups client logic ...
    }, [])

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
