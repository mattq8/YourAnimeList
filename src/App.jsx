// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import DettaglioAnime from "./pages/AnimeDetails/AnimeDetails";

export default function App() {
    return (
        <BrowserRouter>
            {/* <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#333' }}>
                <Link to="/" style={{ color: 'white' }}>Home</Link>
                <Link to="/anime" style={{ color: 'white' }}>Dettaglio Anime</Link>
            </nav> */}

            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/anime" element={<DettaglioAnime />} />
            </Routes>
        </BrowserRouter>
    );
}