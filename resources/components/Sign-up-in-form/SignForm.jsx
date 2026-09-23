import styles from './SignForm.module.css';
import Button from '../Button/Button';
import { Link, Form } from '@inertiajs/react';

export default function SignForm({ title, phrase, link }) {

    return (
        <Form
            className={styles.form}
            action={title == "Register" ? "/register" : "/login"}
            method="post"
            disableWhileProcessing
        >
            {({ errors }) => (
                <>
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
                            {errors['username'] && <div className={`${styles.errorText} fs-100 fw-300`}>{errors['username']}</div>}
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
                        {errors['email'] && <div className={`${styles.errorText} fs-100 fw-300`}>{errors['email']}</div>}
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
                        {errors['password'] && <div className={`${styles.errorText} fs-100 fw-500`}>{errors['password']}</div>}
                        {errors['credentials'] && <div className={`${styles.errorText} fs-100 fw-300`}>{errors['credentials']}</div>}
                    </div>

                    {/* Password Confirmation */}
                    {
                        title === "Register" ?
                            <div className={styles.inputGroup}>
                                <input
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    placeholder="Confirm Password"
                                    className={`${styles.input} bg-light-light-night-blue clr-dates`}
                                    required
                                />
                                {errors['password_confirmation'] && <div className={`${styles.errorText} fs-100 fw-300`}>{errors['password_confirmation']}</div>}
                            </div>
                            : ""
                    }
                    
                    

                    <Button title={title} accent={title === "Login" ? false : true} fs="fs-300" />
                    <div className={styles.account}>
                        <p className="clr-dates fs-300 fw-600">{phrase}</p>
                        <Link href={link === "Login" ? "/login" : "/register"} className={`${styles.underlined} clr-dates fs-300 fw-600`}>{link}</Link>
                    </div>
                </>
            )}
        </Form>
    );
}