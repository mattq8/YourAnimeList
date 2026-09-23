import { Form, usePage } from "@inertiajs/react";
import styles from '../components/Sign-up-in-form/SignForm.module.css';

export default function Home() {
    const { auth } = usePage().props;

    return (
        <>
            <h1 className="clr-dates">Ciao {auth.user.username}</h1>
            <Form className={styles.form} action="/logout" method="post" disableWhileProcessing>
                <button type="submit" className="clr-dates">Log Out</button>
            </Form>
        </>
    );
}