import TopPart from "../../components/TopPart/TopPart";
import BottomPart from "../../components/BottomPart/BottomPart";
import SignForm from "../../components/Sign-up-in-form/SignForm";
import '../../components/WelcomeContent/WelcomeContent.module.css';
import { Head, Link } from "@inertiajs/react";
import styles from './Auth.module.css';
import backArrow from '../../assets/ArrowBack.svg';

export default function Login() {
    return (
        <>
            <Head title="YAL - Login" />
            <Link href="/" className={styles.backToWelcome}><img src={backArrow} alt="back_arrow" className="bg-cyan"/></Link>
            <main className="container">
                <TopPart animated={false} />
                <BottomPart login={true}>
                    <SignForm
                        title="Login"
                        phrase="Don't have an account?"
                        link="Register" />
                </BottomPart>
            </main>
        </>

    );
}