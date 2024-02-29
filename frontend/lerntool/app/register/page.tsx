"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import './register.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
  
    const router = useRouter();
  
    const onButtonClick = () => {
        // Set initial error values to empty
        setEmailError('');
        setPasswordError('');

        // Check if the user has entered both fields correctly
        if ('' === firstname) {
            setEmailError('Please enter your firstname');
            return;
        }

        if ('' === lastname) {
            setEmailError('Please enter your firstname');
            return;
        }

        if ('' === email) {
            setEmailError('Please enter your email');
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email');
            return;
        }
        if (!/^[a-zA-Z0-9._-]+@gso\.schule\.koeln$/.test(email)) {
            setEmailError('Please enter a valid school email');
            return;
        }

        if ('' === password) {
            setPasswordError('Please enter a password');
            return;
        }

        if (password.length < 7) {
            setPasswordError('The password must be 8 characters or longer');
            return;
        }

        // ToDo: Add the logic to check if the user is in the database
        
    }
  
    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
            <div>Register</div>
            </div>
            <br />
            <div className="inputNamesContainer">
                <div className={'inputContainer'}>
                    <input
                        value={email}
                        placeholder="Firstname"
                        onChange={(ev) => setFirstname(ev.target.value)}
                        className={'inputBoxName'}
                    />
                    <label className="errorLabel">{emailError}</label>
                </div>
                <div className={'inputContainer'}>
                    <input
                        value={email}
                        placeholder="Lastname"
                        onChange={(ev) => setLastname(ev.target.value)}
                        className={'inputBoxName'}
                    />
                    <label className="errorLabel">{emailError}</label>
                </div>
            </div>
            {/* <br />
            <div className={'inputContainer'}>
                <input
                    value={email}
                    placeholder="Age"
                    onChange={(ev) => setEmail(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{emailError}</label>
            </div> */}
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
            <label className="">
                Click here to 
                <a className="text-blue-600" href="/login"> Login</a>
            </label>
            <div className={'inputContainer'}>
                <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Register'} />
            </div>
        </div>
    );
}