"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as bcrypt from 'bcrypt';
import './register.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [class_no, setClass_no] = useState('');
    const [year, setYear] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [firstnameError, setFirstNameError] = useState('');
    const [lastnameError, setLastNameError] = useState('');
    const [classnoError, setClassnoError] = useState('');
    const [yearError, setYearError] = useState('');
  
    const router = useRouter();
  
    const onButtonClick = () => {
        // Set initial error values to empty
        setEmailError('');
        setPasswordError('');
        setFirstNameError('');
        setLastNameError('');
        setClassnoError('');
        setYearError('');

        // Check if the user has entered both fields correctly
        if ('' === firstname) {
            setFirstNameError('Please enter your firstname');
            return;
        }

        if ('' === lastname) {
            setLastNameError('Please enter your firstname');
            return;
        }

        if ('' === email) {
            setEmailError('Please enter your email');
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,5}$/.test(email)) {
            setEmailError('Please enter a valid email');
            return;
        }
        // if (!/^[a-zA-Z0-9._-]+@gso\.schule\.koeln$/.test(email)) {
        //     setEmailError('Please enter a valid school email');
        //     return;
        // }

        if ('' === class_no) {
            setClassnoError('Please enter your class');
            return;
        }

        if ('' === year) {
            setYearError('Please enter your year');
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

        hashPassword()

        registerUser();
    }

    function hashPassword() {
        const saltRounds = 5; // The cost factor controls how much time is needed to calculate a single BCrypt hash. The higher the cost factor, the more hashing rounds are done. Increasing the cost factor by 1 doubles the necessary time. The more time is necessary, the more difficult is brute-forcing.
        const hash = bcrypt.hash(password, saltRounds);
        setPassword(hash);
    }

    async function registerUser() {


        await fetch('http://127.0.0.1:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                email: email,
                klasse: class_no,
                year: year,
                password: password,
            }),
        })
        .then((r) => r.json())
        .then((r) => {
            console.log("sdfsdf", r);
            
            if (r.success) {
                router.push('/login');
            }
        })
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
                        value={firstname}
                        placeholder="Firstname"
                        onChange={(ev) => setFirstname(ev.target.value)}
                        className={'inputBoxName'}
                    />
                    <label className="errorLabel">{firstnameError}</label>
                </div>
                <div className={'inputContainer'}>
                    <input
                        value={lastname}
                        placeholder="Lastname"
                        onChange={(ev) => setLastname(ev.target.value)}
                        className={'inputBoxName'}
                    />
                    <label className="errorLabel">{lastnameError}</label>
                </div>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    value={class_no}
                    placeholder="Enter your class here"
                    onChange={(ev) => setClass_no(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{classnoError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    value={year}
                    placeholder="Enter school year"
                    onChange={(ev) => setYear(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{yearError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    value={email}
                    type="email"
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
                    type='password'
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <div className="datenschutzcontainer">
                    <label className="datenschutz">Ich stimme den <a href="home/datenschutz">Datenschutzlinien</a> zu</label>
                    <input
                        value=""
                        type='checkbox'
                        
                    />
                </div>
                
                <label className="errorLabel">{passwordError}</label>
            </div>
            <label className="login-label">
                Click here to 
                <a className="text-blue-600" href="/login"> Login</a>
            </label>
            <div className={'inputContainer'}>
                <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Register'} />
            </div>
        </div>
    );
}