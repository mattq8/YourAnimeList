import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import AnimeCardHome from '../../components/AnimeCardHome/AnimeCardHome';

export default function Home({ watchingAnimes }) {
    return (
        <>
            <Header title="Home" search={false} />
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
        </>
    );
}