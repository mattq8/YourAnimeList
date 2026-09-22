import SplashScreen from "../components/SplashScreen/SplashScreen";
import WelcomeContent from "../components/WelcomeContent/WelcomeContent";
import { useState, useEffect } from "react";

export default function Welcome() {
    const [hasSeenSplash, setHasSeenSplash] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const seen = localStorage.getItem("hasSeenSplash");
        setHasSeenSplash(Boolean(seen));
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    if (hasSeenSplash) {
        return <WelcomeContent />
    }

    return (
        <SplashScreen
            onFinish={() => {
                localStorage.setItem("hasSeenSplash", "true");
                setHasSeenSplash(true);
            }}
        />
    );
}