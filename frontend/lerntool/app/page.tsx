"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
    return (
        <main className="flex flex-col gap-8 items-center justify-between p-24">
            <Button route="/login" btnName='Login'/>
            <Button route="/register" btnName='Register'/>
        </main>
    );
}

function Button(params: {route: string, btnName: string}) {

    const router = useRouter();

    const handleClick = () => {
        router.push(params.route);
    };

    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClick}>
            {params.btnName}
        </button>
    )
}
