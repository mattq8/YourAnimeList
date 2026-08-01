import styles from './SignForm.module.css';
import { Link } from 'react-router-dom';

export default function SignForm({ title, phrase, link }) {
    return (
        <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
            <span className="clr-cyan fs-500 fw-600">{title}</span>
            <input type="email" placeholder="E-mail" className={`${styles.input} bg-light-light-night-blue clr-dates`} />
            <input type="password" placeholder="Password" className={`${styles.input} bg-light-light-night-blue clr-dates`} />
            <button type="submit" className={`${styles.button} clr-light-night-blue fs-300 fw-600 bg-cyan`}>{title}</button>
            <div className={styles.account}>
                <p className="clr-dates fs-400 fw-600">{phrase}</p><Link className="clr-dates fs-400 fw-600">{link}</Link>
            </div>
        </form>
    );
}