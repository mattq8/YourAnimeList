// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Welcome from './pages/Welcome/Welcome';

export default function App() {
    return (
        <BrowserRouter>
            {/* <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#333' }}>
                <Link to="/" style={{ color: 'white' }}>Home</Link>
                <Link to="/anime" style={{ color: 'white' }}>Dettaglio Anime</Link>
            </nav> */}

            <Routes>
                <Route path="/" element={<Welcome/>} />
                <Route path="/signup" element={<Welcome/>} />
                <Route path="/signin" element={<Welcome/>} />
                <Route path="/home" element={<Home/>} />
            </Routes>
        </BrowserRouter>
    );
}