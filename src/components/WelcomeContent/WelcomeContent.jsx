import TopPart from "./TopPart/TopPart";
import styles from "./WelcomeContent.module.css";
import { Link } from "react-router-dom";


export default function WelcomeContent() {
    return (
        <main className={styles.container}>
            <TopPart />
            <div className={`${styles.bottom} bg-light-night-blue`}>
                <p className={`${styles.p} clr-dates fs-400 fw-600`}>Scopri nuovi anime, crea la tua lista e dai un voto a quelli visti</p>
                <Link to="/signup" className={`${styles.button} ${styles.btnSignup} clr-light-night-blue fs-300 fw-600 bg-cyan`}>Registrati</Link>
                <Link to="/signin" className={`${styles.button} ${styles.btnSignin} clr-cyan fs-300 fw-600 bg-night-blue`}>Accedi</Link>
            </div>
        </main>
    )
}