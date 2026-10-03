import styles from './AnimeDetails.module.css';
import { useState } from 'react';
import { Link } from '@inertiajs/react';
import backArrow from '../../assets/ArrowBack.svg';
import NavBar from '../../components/NavBar/NavBar';

export default function AnimeDetails({ anime }) {
    const [show, setShow] = useState(false);
    const [selection, setSelection] = useState(0);
    const [rating, setRating] = useState(0);
    const [episode, setEpisode] = useState(1);

    console.log("Single anime: ", anime);
    const description = anime.description.replace(/<\/?[^>]+(>|$)/g, "");
    const genres = anime.genres.map((genre) => (
        genre.name
    )).join(', ');

    return (
        <>
            {show && <div className={styles.overlay}></div>}

            {
                anime.banner_url && (
                    <img src={anime.banner_url} alt="Banner" className={styles.bannerImage} />
                )
            }
            <Link className={`${styles.backToWelcome} ${show ? styles.disabledContent : ''}`} href="/search"><img src={backArrow} alt="back-arrow" className="bg-cyan" /></Link>
            {
                show &&
                <form className={`${styles.modal} bg-light-light-night-blue`} onSubmit={(e) => handleSubmit(e)}>
                    <h4 className="clr-white fs-300 fw-600">{anime.title}</h4>
                    <span className="clr-dates fs-200 fw-600">Status:</span>
                    <div className={styles.choices}>
                        <span key={1} className={`${styles.choice} ${selection === 1 ? "clr-night-blue bg-violet-selected" : "clr-cyan bg-light-night-blue"} fs-200 fw-600`} onClick={() => setSelection(1)}>In corso</span>
                        <span key={2} className={`${styles.choice} ${selection === 2 ? "clr-night-blue bg-violet-selected" : "clr-cyan bg-light-night-blue"} fs-200 fw-600`} onClick={() => setSelection(2)}>Completato</span>
                        <span key={3} className={`${styles.choice} ${selection === 3 ? "clr-night-blue bg-violet-selected" : "clr-cyan bg-light-night-blue"} fs-200 fw-600`} onClick={() => setSelection(3)}>Da vedere</span>
                        <span key={4} className={`${styles.choice} ${selection === 4 ? "clr-night-blue bg-violet-selected" : "clr-cyan bg-light-night-blue"} fs-200 fw-600`} onClick={() => setSelection(4)}>Droppato</span>
                    </div>

                    {
                        selection === 1 || selection === 4 ?
                            <>
                                <span className="clr-dates fs-200 fw-600">Episode:</span>
                                <div className={styles.episodeSection}>
                                    <button
                                        type="button"
                                        className={`${styles.plusMinusBtn} clr-cyan fs-200 fw-600 bg-light-night-blue`}
                                        onClick={() => { if (episode > 1) setEpisode(episode - 1) }}>-</button>
                                    <span className="clr-dates fs-200 fw-600">{episode}</span>
                                    <button
                                        type="button"
                                        className={`${styles.plusMinusBtn} clr-cyan fs-200 fw-600 bg-light-night-blue`}
                                        onClick={() => { if (episode < anime.episodes) setEpisode(episode + 1) }}>+</button>
                                </div>
                            </>
                            : ''
                    }

                    {
                        selection !== 1 && selection !== 3 ?
                            <>
                                <span className="clr-dates fs-200 fw-600">Rating:</span>
                                <div className={styles.stars}>
                                    {[1, 2, 3, 4, 5].map((starIndex) => (
                                        <img
                                            key={starIndex}
                                            className={styles.star}
                                            src={starIndex <= rating ? filledStar : emptyStar}
                                            alt={`${starIndex} stelle`}
                                            onClick={() => setRating(starIndex)}
                                        />
                                    ))}
                                </div>
                            </>
                            : ''
                    }



                    <div className={styles.btnSection}>
                        <button type="button" className={`${styles.button} ${styles.formBtn} clr-white bg-night-blue fs-300 fw-600`} onClick={() => setShow(false)}>Close</button>
                        <button type="submit" className={`${styles.button} ${styles.formBtn} clr-light-night-blue bg-cyan fs-300 fw-600`}>Save</button>
                    </div>
                </form>
            }
            <main className={styles.wrapper}>
                <div className={`${styles.animeInfo} bg-light-night-blue`}>
                    <h4 className="clr-white fs-300 fw-600">{anime.title}</h4>
                    <span className="clr-dates fs-200 fw-600">Episodes: {anime.episodes}</span>
                    <span className="clr-dates fs-200 fw-600">Year: {anime.year}</span>
                    <span className="clr-dates fs-200 fw-600">Genres: {genres}</span>
                    <span className="clr-dates fs-200 fw-600">Status: {anime.status}</span>
                    <p className="clr-dates fs-200 fw-600">Description: {description}</p>

                </div>
                <button className={`${styles.button} ${show ? styles.disabledContent : ''} clr-light-night-blue bg-cyan fs-300 fw-600`} onClick={() => setShow(true)}>Add</button>
            </main>
            <div className={show ? styles.disabledContent : ''}>
                <NavBar active="Search" />
            </div>
        </>
    );
}