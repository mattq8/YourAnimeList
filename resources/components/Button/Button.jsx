import styles from "./Button.module.css"

export default function Button({ title, accent, fs }) {
    return <button className={`${styles.button} ${accent ? "clr-light-night-blue bg-cyan" : `clr-cyan bg-night-blue ${styles.btnSignin}`} ${fs} fw-600`}>{title}</button>
}