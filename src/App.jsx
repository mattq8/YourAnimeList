// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from './pages/Welcome/Welcome';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';

export default function App() {
    const [hasSeenSplash, setHasSeenSplash] = useState(false);

    return (
        <BrowserRouter>
            {/* <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#333' }}>
                <Link to="/" style={{ color: 'white' }}>Home</Link>
                <Link to="/anime" style={{ color: 'white' }}>Dettaglio Anime</Link>
            </nav> */}

            <Routes>
                <Route path="/" element={<Welcome hasSeenSplash={hasSeenSplash} onSplashFinish={() => setHasSeenSplash(true)} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Welcome />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}