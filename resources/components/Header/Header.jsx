import styles from "./Header.module.css";

export default function Header({ title, search, searchQuery, onSearchChange }) {
    return (
        <header className={styles.header}>
            <div className={styles.title}>
                <h1 className="clr-cyan fs-600 fw-700">YANL</h1>
                <span className="clr-white fs-500 fw-700">{title}</span>
            </div>
            {search ?
                <div className={`${styles.searchBar} bg-light-night-blue`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 clr-dates">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                    <input type="text" value={searchQuery} onChange={onSearchChange} id="search" className="clr-white fs-400 fw-600 bg-light-night-blue" placeholder="Cerca un anime" />
                </div> :
                <span className="clr-white fs-400 fw-600">Stai guardando</span>}
        </header>
    );
}