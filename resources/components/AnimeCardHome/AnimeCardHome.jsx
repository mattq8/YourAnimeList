import Button from '../Button/Button';
import styles from './AnimeCardHome.module.css';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function AnimeCardHome({ animeId, title, currEp, totalEp, img }) {
    const [currentEpisode, setCurrentEpisode] = useState(currEp);
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    async function handleSubmit(e) {
        e.preventDefault();

        const isCompleted = currentEpisode + 1 >= totalEp;
        const newEpisode = isCompleted ? totalEp : currentEpisode + 1;

        setCurrentEpisode(newEpisode);

        if (isCompleted) {
            setIsVisible(false);
            router.patch(`/home/${animeId}`, {
                episodes_watched: newEpisode,
                status: 'COMPLETED'
            }, {
                preserveScroll: true,
                preserveState: true
            });

            return;
        }

        router.patch(`/home/${animeId}`, {
            episodes_watched: newEpisode,
        }, {
            preserveScroll: true,
            preserveState: true
        });
    }

    return (
        <div className={`${styles.cardHome} bg-light-night-blue`}>
            <img className={styles.coverImg} src={img} alt={`Cover Image - ${title}`} />
            <form onSubmit={(e) => handleSubmit(e)} className={styles.info}>
                <h4 className={`${styles.title} clr-white fs-200 fw-600`}>{title}</h4>
                <span className="clr-dates fs-200 fw-600">Episode: {currentEpisode}/{totalEp}</span>
                <span className="clr-dates fs-200 fw-600">Next episode: {currentEpisode + 1}</span>
                <Button title="1+ Episodio" accent={true} fs="fs-100" />
            </form>
        </div>
    );
}