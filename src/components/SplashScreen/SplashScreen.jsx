import styles from "./SplashScreen.module.css";

export default function SplashScreen({ onFinish }) {
    return (
        <main className={styles.center}>
            <h1 className="clr-cyan fs-600 fw-700" id={styles.title}
            onAnimationEnd={onFinish}>YourAnimeList</h1>
        </main>
    )
}