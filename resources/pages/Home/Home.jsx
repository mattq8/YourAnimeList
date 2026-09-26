import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import AnimeCardHome from '../../components/AnimeCardHome/AnimeCardHome';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import SettingsMenu from '../../components/SettingsMenu/SettingsMenu';

export default function Home({ watchingAnimes }) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <>
            <Head title="YAL - HOME" />
            <Header title="Home" 
                search={false} 
                onOpenSettings={() => setIsSettingsOpen(true)} 
            />
            <main className={styles.main}>
                {
                    watchingAnimes.length > 0 ?
                    watchingAnimes.map((item, index) => (
                        <AnimeCardHome
                            key={index}
                            animeId={item.id}
                            title={item.title}
                            currEp={item.pivot.episodes_watched}
                            totalEp={item.episodes}
                            img={item.cover_url}
                        />
                    ))
                    : <p className="clr-dates fs-300 fw-500">Non stai guardando anime attualmente</p>
                }
                
            </main>
            <NavBar active="Home" />

            <SettingsMenu
                isVisible={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
        </>
    );
}