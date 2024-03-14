import { useRouter } from "next/navigation";

export default function Resetpassword() {

    const router = useRouter();

    function resetPassword(email: string) {
        fetch('http://localhost:3080/resetpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
            }),
        })
        .then((r) => r.json())
        .then((r) => {
            console.log(r);
            router.push('/login');
        })
        .catch((e) => {
            console.error(e);
        });
    }

    return (
        <div>
            <input type="email" placeholder="email" />
            <button onClick={() => resetPassword('email')}>Reset Password</button>
        </div>
    );
};
