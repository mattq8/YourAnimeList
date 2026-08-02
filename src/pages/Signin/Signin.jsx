import BottomPart from "../../components/WelcomeContent/BottomPart/BottomPart";
import TopPart from "../../components/WelcomeContent/TopPart/TopPart";
import SignForm from "../../components/Sign-up-in-form/SignForm";
import { Link,  useLocation } from "react-router-dom";
import styles from "../Signup/Sign-up-in.module.css";
import backArrow from "../../assets/ArrowBack.svg";

export default function Signin() {
    const location = useLocation();
    const noSlide = location.state?.noSlide;

    return (
        <main className={styles.container}>
            <Link state={{ isBack: true }} className={styles.backToWelcome} to="/"><img src={backArrow} alt="back-arrow" className="bg-cyan" /></Link>
            <TopPart animated={false} />
            <BottomPart slideUp={!noSlide} noSlide={noSlide}>
                <SignForm title="Accedi" phrase="Nessun account?" link="Registrati" />
            </BottomPart>
        </main>
    );
}
