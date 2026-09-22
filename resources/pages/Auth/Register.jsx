import TopPart from "../../components/TopPart/TopPart";
import BottomPart from "../../components/BottomPart/BottomPart";
import SignForm from "../../components/Sign-up-in-form/SignForm";
import '../../components/WelcomeContent/WelcomeContent.module.css';

export default function Register() {
    return (
        <main className="container">
            <TopPart animated={false} />
            <BottomPart register={true}>
                <SignForm 
                    title="Register"
                    phrase="Already have an account?"
                    link="Login"
                />
            </BottomPart>
        </main>
    );
}