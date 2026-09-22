import TopPart from "../TopPart/TopPart";
import BottomPart from "../BottomPart/BottomPart";
import styles from "./WelcomeContent.module.css";
import { Link } from "@inertiajs/react";

export default function WelcomeContent() {

    return (
        <main className={styles.container}>
            <TopPart animated={true} />
            <BottomPart animated={true}>
                <p className={`${styles.p} clr-dates fs-400 fw-600`}>Discover new anime, create your list, and rate the ones you've watched.</p>
                <Link href="/register" className={`${styles.button} ${styles.btnSignup} clr-light-night-blue fs-300 fw-600 bg-cyan`}>Register</Link>  
                <Link href="/login" className={`${styles.button} ${styles.btnSignin} clr-cyan fs-300 fw-600 bg-night-blue`}>Login</Link>  
            </BottomPart>
        </main>
    )
}