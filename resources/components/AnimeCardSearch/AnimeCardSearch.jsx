import styles from './AnimeCardSearch.module.css';

export default function AnimeCardSearch({ img, title, episodes, year, genres, status }) {
    return (
        <div className={`${styles.cardHome} bg-light-night-blue`}>
            <img className={styles.coverImg} src={img} alt={`Cover Image - ${title}`} />
            <form className={styles.info}>
                <h4 className={`${styles.title} clr-white fs-200 fw-600`}>{title}</h4>
                <span className="clr-dates fs-200 fw-600">Episodes: {episodes}</span>
                <span className="clr-dates fs-200 fw-600">Year: {year}</span>
                <span className={`${styles.genresText} clr-dates fs-200 fw-600`}>Genres: {genres}</span>
                <span className="clr-dates fs-200 fw-600">Status: {status}</span>
            </form>
        </div>
    );
}