import { Form } from "@inertiajs/react";
import { Form, usePage } from "@inertiajs/react";

export default function Logout() {
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