import TopPart from "./TopPart/TopPart";
import BottomPart from "./BottomPart/BottomPart";
import styles from "./WelcomeContent.module.css";
import { Link, useLocation } from "react-router-dom";

export default function WelcomeContent() {
    const location = useLocation();
    const isBack = location.state?.isBack;

    return (
        <main className={styles.container}>
            <TopPart animated={!isBack} />
            <BottomPart slideDown={isBack} animated={!isBack}>
                <p className={`${styles.p} clr-dates fs-400 fw-600`}>Scopri nuovi anime, crea la tua lista e dai un voto a quelli visti</p>
                <Link to="/signup" className={`${styles.button} ${styles.btnSignup} clr-light-night-blue fs-300 fw-600 bg-cyan`}>Registrati</Link>
                <Link to="/signin" className={`${styles.button} ${styles.btnSignin} clr-cyan fs-300 fw-600 bg-night-blue`}>Accedi</Link>
            </BottomPart>
        </main>
    )
}