import { useEffect, useState } from "react";
import { supabase } from "../components/lib/supabaseClient";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Controlla l'utente corrente al primo avvio dell'app
        async function getInitialUser() {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user ?? null);
            setLoading(false);
        }

        getInitialUser();

        // 2. Ascolta i cambiamenti di stato dell'autenticazione (login, logout, refresh token)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}