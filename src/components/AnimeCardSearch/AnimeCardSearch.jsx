import styles from './AnimeCardSearch.module.css';

export default function AnimeCardSearch({ img, title, episodes, year, genres, status }) {
    return (
        <div className={`${styles.cardHome} bg-light-night-blue`}>
            <img className={styles.coverImg} src={img} alt={`Cover Image - ${title}`} />
            <form className={styles.info}>
                <h4 className={`${styles.title} clr-white fs-200 fw-600`}>{title}</h4>
                <span className="clr-dates fs-200 fw-600">Episodi: {episodes}</span>
                <span className="clr-dates fs-200 fw-600">Anno: {year}</span>
                <span className={`${styles.genresText} clr-dates fs-200 fw-600`}>Generi: {genres}</span>
                <span className="clr-dates fs-200 fw-600">Stato: {status}</span>
            </form>
        </div>
    );
}