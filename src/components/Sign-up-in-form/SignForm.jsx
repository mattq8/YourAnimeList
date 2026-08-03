import styles from './SignForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Button from '../Button/Button';


export default function SignForm({ title, phrase, link }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


    async function handleSubmit(e) {
        e.preventDefault();

        setEmailError('');
        setPasswordError('');

        const cleanEmail = email.trim();
        const cleanPassword = password.trim();

        let hasError = false;


        if (!cleanEmail) {
            setEmailError('L\'email è obbligatoria');
            hasError = true;
        } else if (!isValidEmail(cleanEmail)) {
            setEmailError('Inserisci un formato email valido');
            hasError = true;
        }

        if (title === "Registrati") {
            const hasLetter = /[a-zA-Z]/.test(cleanPassword);

            if (cleanPassword.length < 8) {
                setPasswordError('La password deve contenere almeno 8 caratteri');
                hasError = true;
            } else if (!hasLetter) {
                setPasswordError('La password deve contenere almeno una lettera');
                hasError = true;
            }
        } else {
            if (!cleanPassword) {
                setPasswordError('Inserisci la password');
                hasError = true;
            }
        }

        if (hasError) return;

        if (title === "Registrati") {
            const { error } = await supabase.auth.signUp({
                email: email,
                password: password
            });

            if (error) {
                if (error.message.includes("already registered") || error.status === 422) {
                    setEmailError("Questa email è già registrata");
                } else {
                    setEmailError("Impossibile registrare l'utente: " + error.message);
                }

            } else {
                navigate('/home');
            }
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                setPasswordError("Email o password non corrette");
            } else {
                navigate('/home');
            }
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form} noValidate>
            <span className="clr-cyan fs-500 fw-600">{title}</span>
            <div className={styles.inputGroup}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" required className={`${styles.input} bg-light-light-night-blue clr-dates`} />
                {emailError && <p className={`${styles.errorText} fs-100`}>{emailError}</p>}
            </div>
            <div className={styles.inputGroup}>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className={`${styles.input} bg-light-light-night-blue clr-dates`} />
                {passwordError && <p className={`${styles.errorText} fs-100`}>{passwordError}</p>}
            </div>

            <Button title={title} accent={title === "Accedi" ? false : true} fs="fs-300"/>
            <div className={styles.account}>
                <p className="clr-dates fs-400 fw-600">{phrase}</p>
                <Link state={{ noSlide: true }} className="clr-dates fs-400 fw-600"
                    to={link === "Accedi" ? "/signin" : "/signup"}>
                    {link}
                </Link>
            </div>
        </form>
    );
}