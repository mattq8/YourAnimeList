import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from './pages/Welcome/Welcome';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Signin from "./pages/Signin/Signin";
import Search from "./pages/Search/Search";
import AnimeDetails from "./pages/AnimeDetails/AnimeDetails";

export default function App() {
    const [hasSeenSplash, setHasSeenSplash] = useState(false);

    return (
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Welcome hasSeenSplash={hasSeenSplash} onSplashFinish={() => setHasSeenSplash(true)} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/home" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/anime/:animeId" element={<AnimeDetails/>}/>
            </Routes>
        </BrowserRouter>
    );
}