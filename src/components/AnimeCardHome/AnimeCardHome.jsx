import { supabase } from '../lib/supabaseClient';
import Button from '../Button/Button';
import styles from './AnimeCardHome.module.css';
import { useState } from 'react';

export default function AnimeCardHome({ animeId, userId, title, currEp, totalEp, img }) {
    const [currentEpisode, setCurrentEpisode] = useState(currEp);

    const nextEpisode = currentEpisode + 1 > totalEp ? "No" : currentEpisode + 1;

    async function handleSubmit(e) {
        e.preventDefault();

        if (currentEpisode >= totalEp) {
            const { error } = await supabase
                .from('users_animes')
                .update({ status: "WATCHED" })
                .eq('user_id', userId)
                .eq('anime_id', animeId);
            if (error) {
                console.error("Errore: ", error.message);
            }

            return;
        }

        const newEpisode = currentEpisode + 1;
        setCurrentEpisode(newEpisode);

        const { error } = await supabase
            .from('users_animes')
            .update({ episodes_watched: newEpisode })
            .eq('user_id', userId)
            .eq('anime_id', animeId);

        if (error) {
            console.error("Errore durante l'aggiornamento dell'episodio: ", error.message);
            setCurrentEpisode(currentEpisode);
        }
    }

    return (
        <div className={`${styles.cardHome} bg-light-night-blue`}>
            <img className={styles.coverImg} src={img} alt={`Cover Image - ${title}`} />
            <form onSubmit={(e) => handleSubmit(e)} className={styles.info}>
                <h4 className={`${styles.title} clr-white fs-200 fw-600`}>{title}</h4>
                <span className="clr-dates fs-200 fw-600">Episodio: {currentEpisode}/{totalEp}</span>
                <span className="clr-dates fs-200 fw-600">Prossimo episodio: {nextEpisode}</span>
                <Button title="1+ Episodio" accent={true} fs="fs-100" />
            </form>
        </div>
    );
}