"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {


    const router = useRouter();

    useEffect(() => {
        const userItem = localStorage.getItem('user');
        if (userItem) {
            const user = JSON.parse(userItem);
            if (user && user.token) {
                ValidToken(user);
            } else {
                router.push('/login');
            }
        } else {
            router.push('/login');
        }
    }, []); // The empty dependency array ensures this effect runs only once on mount.

    function ValidToken(token: string) {
        fetch('http://127.0.0.1:8000/verify', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': token,
            },
        })
        .then((r) => r.json())
        .then((r) => {
            if (r.status === 200) {
                router.push('/home');
            } else {
                router.push('/login');
            } 
        })
        .catch((e) => {
            console.error(e);
        });
    }

    return (
        <div>Loading...</div>
    );
}

