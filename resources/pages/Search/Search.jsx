import styles from './Search.module.css';
import Header from '../../components/Header/Header';
import { Head, InfiniteScroll } from '@inertiajs/react';
import NavBar from '../../components/NavBar/NavBar';
import AnimeCardSearch from '../../components/AnimeCardSearch/AnimeCardSearch';

export default function Search({ animes }) {
    console.log("anime:", animes);
    return (
        <>
            <Head title="YAL - Search" />
            <Header title="Cerca" search={true} />
            <InfiniteScroll data="animes" className={styles.main}>
                {
                    animes.data.map((anime) => (
                        <AnimeCardSearch
                            key={anime.id}
                            img={anime.cover_url}
                            title={anime.title}
                            episodes={anime.episodes}
                            year={anime.year}
                            genres={anime.genres.map((genre) => (genre.name)).join(', ')}
                            status={anime.status}
                        />
                    ))
                }

            </InfiniteScroll>
            <NavBar active="Search" />
        </>
    );
}