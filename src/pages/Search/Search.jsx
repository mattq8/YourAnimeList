import AnimeCardSearch from '../../components/AnimeCardSearch/AnimeCardSearch';
import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import styles from './Search.module.css';
import { useCallback, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';


const animePerPage = 20;
const ANILIST_QUERY = `
    query ($page: Int, $perPage: Int, $search: String) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                hasNextPage
            }
            media(type: ANIME, sort: POPULARITY_DESC, search: $search) {
                id
                title { romaji english }
                episodes
                genres
                status
                seasonYear
                coverImage { large }
            }
        }
    }
`;

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [animes, setAnimes] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    const pageRef = useRef(1);
    const observerRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 400);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    
    const fetchAnimes = useCallback(async (page, query, signal) => {
        try {
            setLoading(true);
            setError(false);

            const variables = {
                page,
                perPage: animePerPage,
                ...(query.trim() !== '' && { search: query.trim() })
            };

            const response = await fetch('https://graphql.anilist.co', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ query: ANILIST_QUERY, variables }),
                signal
            });

            if (!response.ok) throw new Error('Errore nella risposta server');

            const res = await response.json();
            const mediaList = res.data?.Page?.media || [];
            const pageInfo = res.data?.Page?.pageInfo;

            setAnimes(prevAnime => page === 1 ? mediaList : [...prevAnime, ...mediaList]);
            setHasMore(Boolean(pageInfo?.hasNextPage));
        } catch (e) {
            if (e.name === 'AbortError') return;
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        pageRef.current = 1;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchAnimes(1, debouncedQuery, controller.signal);

        return () => controller.abort();
    }, [debouncedQuery, fetchAnimes]);

    
    const lastAnimeRef = useCallback((node) => {
        if (loading) return;

        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                pageRef.current += 1;
                fetchAnimes(pageRef.current, debouncedQuery, undefined);
            }
        });

        if (node) observerRef.current.observe(node);
    }, [loading, hasMore, fetchAnimes, debouncedQuery]);

    return (
        <>
            <Header title="Cerca" search={true}
                searchQuery={searchQuery} onSearchChange={(e) => setSearchQuery(e.target.value)}
            />
            <main className={styles.main}>

                {animes.map((anime, index) => {
                    const isLast = index === animes.length - 1;
                    return (
                        <Link key={anime.id} to={`/anime/${anime.id}`}
                            ref={isLast ? lastAnimeRef : null}
                        >
                            <AnimeCardSearch
                                img={anime.coverImage.large}
                                title={anime.title.english || anime.title.romaji}
                                episodes={anime.episodes}
                                year={anime.seasonYear}
                                genres={anime.genres.slice(0, 2).join(', ')}
                                status={anime.status}
                            />
                        </Link>
                    );
                })}

                {loading && <p className="clr-white fs-300 fw-600">Caricamento</p>}
                {error && <p className="clr-white fs-300 fw-600">Errore</p>}
            </main>
            <NavBar active="Search" />
        </>
    )
}