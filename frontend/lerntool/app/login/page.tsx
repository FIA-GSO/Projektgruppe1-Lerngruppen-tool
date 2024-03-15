"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import './login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hashedPassword, setHashedPassword] = useState<string>('');
  
    const router = useRouter();
  
    const onButtonClick = () => {
        // Set initial error values to empty
        setEmailError('');
        setPasswordError('');

        // Check if the user has entered both fields correctly
        if ('' === email) {
            setEmailError('Please enter your email');
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email');
            return;
        }

        // if (!/^[a-zA-Z0-9._-]+@gso\.schule\.koeln$/.test(email)) {
        //     setEmailError('Please enter a valid school email');
        //     return;
        // }

        if ('' === password) {
            setPasswordError('Please enter a password');
            return;
        }

        if (password.length < 7) {
            setPasswordError('The password must be 8 characters or longer');
            return;
        }

        // Hash the password
        HashPassword(password);

        // Check if email has an account associated with it
        // checkAccountExists((accountExists) => {
        //     // If yes, log in
        //     if (accountExists) logIn();
        //     // Else, ask user if they want to create a new account and if yes, then log in
        //     else if (
        //         window.confirm(
        //             'An account does not exist with this email address: ' + email + '. Do you want to create a new account?',
        //         )
        //     ) {
        //         logIn();
        //     }
        // })
        logIn();
    }

    async function HashPassword(password: string) {

        const utf8 = new TextEncoder().encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((bytes) => bytes.toString(16).padStart(2, '0'))
            .join('');
        setHashedPassword(hashHex);
    }

    // Call the server API to check if the given email ID already exists
    // const checkAccountExists = (callback) => {
    //     fetch('http://localhost:3080/check-account', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ email }),
    //         })
    //         .then((r) => r.json())
    //         .then((r) => {
    //             callback(r?.userExists)
    //     });
    // }
    
    // Log in a user using email and password
    const logIn = () => {
        fetch('http://127.0.0.1:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify({ email, hashedPassword }),
            })
            .then((r) => r.json())
            .then((r) => {
                if ('success' === r.message) {
                    localStorage.setItem('user', JSON.stringify({ email, token: r.token }))
                    setEmail(email);
                    router.push('/home');
                } else {
                    window.alert('Wrong email or password')
                }
        });
    }
  
    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
            <div>Login</div>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    value={email}
                    placeholder="Enter your email here"
                    onChange={(ev) => setEmail(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{emailError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    value={password}
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <label className="register-label">
                Click here to 
                <a className='text-blue-600' href="/register"> Register</a>
            </label>
            <div className={'inputContainer'}>
                <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
            </div>
        </div>
    );
}