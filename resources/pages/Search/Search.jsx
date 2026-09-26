import styles from './Search.module.css';
import Header from '../../components/Header/Header';
import { Head, InfiniteScroll, router } from '@inertiajs/react';
import NavBar from '../../components/NavBar/NavBar';
import AnimeCardSearch from '../../components/AnimeCardSearch/AnimeCardSearch';
import { useEffect, useState } from 'react';
import SettingsMenu from '../../components/SettingsMenu/SettingsMenu';
import FiltersMenu from '../../components/FiltersMenu/FiltersMenu';

export default function Search({ animes, genres }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [debounceSearch, setDebounceSearch] = useState('');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isFiltersOpen, setisFiltersOpen] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => {
            setDebounceSearch(searchQuery)
        }, 2000);

        return () => {
            clearTimeout(id);
        }
    }, [searchQuery]);

    useEffect(() => {
        router.get(`/search`, {
            search: debounceSearch
        }, {
            preserveScroll: true,
            preserveState: true
        })
    }, [debounceSearch]);

    useEffect(() => {
        console.log("anime:", animes);
    }, [animes]);
    // console.log("Genres", genres);

    return (
        <>
            <Head title="YAL - Search" />
            <Header 
                title="Search" 
                search={true} 
                filter={true}
                searchQuery={searchQuery} 
                onSearchChange={(e) => setSearchQuery(e.target.value)} 
                onOpenSettings={() => setIsSettingsOpen(true)}
                onOpenFilters={() => setisFiltersOpen(true)}    
            />
            <InfiniteScroll data="animes" preserveUrl className={styles.main}>
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
            <SettingsMenu
                isVisible={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
            <FiltersMenu
                isVisible={isFiltersOpen}
                onClose={() => setisFiltersOpen(false)}
                genres={genres}
            />
        </>
    );
}