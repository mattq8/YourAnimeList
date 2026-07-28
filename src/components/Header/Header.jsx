import styles from "./Header.module.css";

export default function Header({ title, search }) {
    return (
        <header className={styles.header}>
            <div className={styles.title}>
                <h1 className="clr-cyan fs-600 fw-700">YANL</h1>
                <span className="clr-white fs-500 fw-700">{title}</span>
            </div>
            {search ?
                <div className={`${styles.searchBar} bg-light-night-blue`}>
                    <img src="" alt="search-icon"/>
                    <input type="text" id="search" className="clr-dates fs-400 fw-600 bg-light-night-blue" placeholder="Cerca un anime"/>
                </div> :
                <span className="clr-white fs-400 fw-600">Stai guardando</span>}
        </header>
    );
}