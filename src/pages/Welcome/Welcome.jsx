import { useState } from "react";
import SplashScreen from "../../components/SplashScreen/SplashScreen";
import WelcomeContent from "../../components/WelcomeContent/WelcomeContent";

export default function Welcome() {
    const [showWelcome, setShowWelcome] = useState(false);

    if (showWelcome) {
        return <WelcomeContent/>
    }
    return <SplashScreen onFinish={() => setShowWelcome(true)}/>
}