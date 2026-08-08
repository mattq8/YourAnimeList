import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from './AnimeDetails.module.css';
import NavBar from '../../components/NavBar/NavBar';
import backArrow from "../../assets/ArrowBack.svg";
import emptyStar from "../../assets/EmptyStar.svg";

const ANIME_DETAILS_QUERY = `
    query ($id: Int) {
        Media(id: $id, type: ANIME) {
            id
            title {
                romaji
                english
                native
            }
            description
            episodes
            status
            seasonYear
            genres
            bannerImage
        }
    }
`;


export default function AnimeDetails() {
    const [show, setShow] = useState(false);

    const { animeId } = useParams();

    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const controller = new AbortController;
        const fetchAnimeDetails = async () => {
            try {
                setLoading(true);
                setError(false);

                const response = await fetch('https://graphql.anilist.co', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        query: ANIME_DETAILS_QUERY,
                        variables: { id: parseInt(animeId, 10) }
                    }),
                    signal: controller.signal
                });

                if (!response.ok) {
                    throw new Error('Errore durante recupero dettagli anime');
                }

                const result = await response.json();
                setAnime(result.data.Media);
            } catch (err) {
                if (err.name === 'AbortError') return;
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        if (animeId) {
            fetchAnimeDetails();
        }

        return () => controller.abort();

    }, [animeId]);


    if (loading) return <div>Caricamento</div>;
    if (error || !anime) return <div>errore durante caricamento anime</div>;

    return (
        <>
            {anime.bannerImage && (
                <img src={anime.bannerImage} alt="Banner" className={styles.bannerImage} />
            )}
            <Link className={`${styles.backToWelcome}`} to="/search"><img src={backArrow} alt="back-arrow" className="bg-cyan" /></Link>
            {
                show &&
                <form className={`${styles.modal} bg-light-light-night-blue`} onSubmit={(e) => e.preventDefault()}>
                    <h4 className="clr-white fs-300 fw-600">{anime.title.english || anime.title.romaji}</h4>
                    <span className="clr-dates fs-200 fw-600">Stato:</span>
                    <div className={styles.choices}>
                        <span className={`${styles.choice} clr-cyan fs-200 fw-600 bg-light-night-blue`}>In corso</span>
                        <span className={`${styles.choice} clr-cyan fs-200 fw-600 bg-light-night-blue`}>Completato</span>
                        <span className={`${styles.choice} clr-cyan fs-200 fw-600 bg-light-night-blue`}>Da vedere</span>
                        <span className={`${styles.choice} clr-cyan fs-200 fw-600 bg-light-night-blue`}>Droppato</span>
                    </div>
                    <span className="clr-dates fs-200 fw-600">Voto:</span>
                    <div className={styles.stars}>
                        <img key={1} className={styles.star} src={emptyStar} alt="EmpyStar" />
                        <img key={2} className={styles.star} src={emptyStar} alt="EmpyStar" />
                        <img key={3} className={styles.star} src={emptyStar} alt="EmpyStar" />
                        <img key={4} className={styles.star} src={emptyStar} alt="EmpyStar" />
                        <img key={5} className={styles.star} src={emptyStar} alt="EmpyStar" />
                    </div>
                    <div className={styles.btnSection}>
                        <button type="button" className={`${styles.button} ${styles.formBtn} clr-white bg-night-blue fs-300 fw-600`} onClick={() => setShow(false)}>Chiudi</button>
                        <button type="submit" className={`${styles.button} ${styles.formBtn} clr-light-night-blue bg-cyan fs-300 fw-600`}>Salva</button>
                    </div>
                </form>
            }
            <main className={styles.wrapper}>
                <div className={`${styles.animeInfo} bg-light-night-blue`}>
                    <h4 className="clr-white fs-300 fw-600">{anime.title.english || anime.title.romaji}</h4>
                    <span className="clr-dates fs-200 fw-600">Episodi: {anime.episodes}</span>
                    <span className="clr-dates fs-200 fw-600">Anno: {anime.seasonYear}</span>
                    <span className="clr-dates fs-200 fw-600">Generi: {anime.genres.join(', ')}</span>
                    <span className="clr-dates fs-200 fw-600">Stato: {anime.status}</span>
                    <p className="clr-dates fs-200 fw-600">
                        Trama: <span dangerouslySetInnerHTML={{ __html: anime.description }}></span>
                    </p>
                </div>
                <button className={`${styles.button} ${show ? styles.disabledContent : ''} clr-light-night-blue bg-cyan fs-300 fw-600`} onClick={() => setShow(true)}>Aggiungi</button>
            </main>
            <div className={show ? styles.disabledContent : ''}>
                <NavBar active="Search" />
            </div>
        </>
    );
}