import { supabase } from "../../components/lib/supabaseClient";
import Header from "../../components/Header/Header";
import AnimeCardHome from "../../components/AnimeCardHome/AnimeCardHome";
import NavBar from "../../components/NavBar/NavBar";
import styles from './Home.module.css';
import { useEffect, useState } from "react";
import { useAuth } from '../../context/AuthContext';


export default function Home() {
    const [animeList, setAnimeList] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        async function fetchWatchingAnime() {

            const { data, error } = await supabase
                .from('users_animes')
                .select(`
                    episodes_watched,
                        animes (
                            id,  
                            title,
                            episodes,
                            cover_url
                        )
                    `)
                .eq('user_id', user.id)
                .eq('status', 'WATCHING');

            if (error) {
                console.error("Errore nel recupero degli anime: ", error.message);
            } else {
                setAnimeList(data);
            }
        }

        fetchWatchingAnime();
    }, [user]);

    console.log(animeList);

    return (
        <>
            <Header title="Home" search={false} />
            <main className={styles.main}>
                {animeList.map((item, index) => (
                    <AnimeCardHome
                        key={index}
                        animeId={item.animes.id}
                        userId={user.id}
                        title={item.animes.title}
                        currEp={item.episodes_watched}
                        totalEp={item.animes.episodes}
                        img={item.animes.cover_url}
                    />
                ))}
            </main>
            <NavBar />
        </>
    );
}