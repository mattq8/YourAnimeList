import SplashScreen from "../../components/SplashScreen/SplashScreen";
import WelcomeContent from "../../components/WelcomeContent/WelcomeContent";

export default function Welcome({ hasSeenSplash, onSplashFinish }) {
    if (hasSeenSplash) {
        return <WelcomeContent/>
    }
    return <SplashScreen onFinish={onSplashFinish}/>
}