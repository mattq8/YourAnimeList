import styles from "./BottomPart.module.css";

export default function BottomPart({ children, register, login, opacity }) {
    let animationClass = "";
    let formHeight = "";

    if (opacity) {
        animationClass = styles.animated;
    }

    if (register) {
        formHeight = styles.register;
    } else if (login) {
        formHeight = styles.login;
    } else {
        formHeight = styles.normal;
    }

    return (
        <div className={`${styles.bottom} ${animationClass} ${formHeight} bg-light-night-blue`}>
            {children}
        </div>
    );
}