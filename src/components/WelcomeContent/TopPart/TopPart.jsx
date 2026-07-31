import welcomeImg from "../../../assets/WelcomeImage.png";
import styles from "./TopPart.module.css";

export default function TopPart() {
    return (
        <header className={styles.top}>
            <img src={welcomeImg} alt="Background Blue" className={styles.img} />
            <h1 className={`${styles.title} clr-cyan fs-600 fw-700`}>YourAnimeList</h1>
        </header>
    )
}