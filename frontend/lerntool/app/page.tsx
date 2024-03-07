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
    }, []);

    function ValidToken(token: string) {
        fetch('http://localhost:3080/verify', {
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

