import BottomPart from "../../components/WelcomeContent/BottomPart/BottomPart";
import TopPart from "../../components/WelcomeContent/TopPart/TopPart";
import SignForm from "../../components/Sign-up-in-form/SignForm";
import { Link } from "react-router-dom";
import styles from "./Signup.module.css";
import backArrow from "../../assets/ArrowBack.svg";

export default function Signup() {
    return (
        <main className={styles.container}>
            <Link state={{ isBack: true }} className={styles.backToWelcome} to="/"><img src={backArrow} alt="back-arrow" className="bg-cyan" /></Link>
            <TopPart animated={false} />
            <BottomPart slideUp={true}>
                <SignForm title="Registrati" phrase="Hai già un account?" link="Accedi" />
            </BottomPart>
        </main>
    );
}