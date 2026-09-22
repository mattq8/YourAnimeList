import styles from './SignForm.module.css';
import Button from '../Button/Button';
import { Link } from '@inertiajs/react';

export default function SignForm({ title, phrase, link }) {

    return (
        <form className={styles.form}>
            <span className="clr-cyan fs-500 fw-600">{title}</span>

            {/* Username */}
            {
                title === "Register" ?
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            className={`${styles.input} bg-light-light-night-blue clr-dates`}
                            required
                        />
                        {/* Username Error */}
                    </div>
                    : ""
            }

            {/* Email */}
            <div className={styles.inputGroup}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className={`${styles.input} bg-light-light-night-blue clr-dates`}
                    required
                />
                {/* Email Error */}
            </div>

            {/* Password */}
            <div className={styles.inputGroup}>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className={`${styles.input} bg-light-light-night-blue clr-dates`}
                    required
                />
                {/* Password Error */}
            </div>

            {/* Confirm Password */}
            {
                title === "Register" ?
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            placeholder="Confirm Password"
                            className={`${styles.input} bg-light-light-night-blue clr-dates`}
                            required
                        />
                        {/* Confirm Password Error */}
                    </div>
                : ""
            }

            <Button title={title} accent={title === "Login" ? false : true} fs="fs-300" />
            <div className={styles.account}>
                <p className="clr-dates fs-300 fw-600">{phrase}</p>
                <Link href={link === "Login" ? "/login" : "/register"} className={`${styles.underlined} clr-dates fs-300 fw-600`}>{link}</Link>
            </div>

        </form>
    );
}