import TopPart from "../../components/TopPart/TopPart";
import BottomPart from "../../components/BottomPart/BottomPart";
import SignForm from "../../components/Sign-up-in-form/SignForm";
import '../../components/WelcomeContent/WelcomeContent.module.css';

export default function Login() {
    return (
        <>
            <Head title="YAL - Login" />
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