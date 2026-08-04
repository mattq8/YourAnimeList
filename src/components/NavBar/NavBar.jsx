import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

export default function NavBar({ active }) {
    const isHomeActive = active === "Home" ? styles.isActive : styles.isNotActive;
    const isSearchActive = active === "Search" ? styles.isActive : styles.isNotActive;
    const isProfileActive = active === "Profile" ? styles.isActive : styles.isNotActive;




    return (
        <nav className={`${styles.navBar} bg-light-night-blue`}>
            <Link to="/home" className={`${styles.container} ${isHomeActive}`}>
                <svg
                    className={styles.navBarIcons}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                </svg>
                <span className={`${isHomeActive} fs-100 fw-500`}>Home</span>
            </Link>
            <Link to="/search" className={`${styles.container} ${isSearchActive}`}>
                <svg 
                    className={styles.navBarIcons} 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="1.5" 
                    stroke="currentColor"
                >
                    <path 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
                <span className={`${isSearchActive} fs-100 fw-500`}>Cerca</span>
            </Link>
            <Link to="/profile" className={`${styles.container} ${isProfileActive}`}>
                <svg
                    className={styles.navBarIcons}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                >
                    <path 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                </svg>
                <span className={`${isProfileActive} fs-100 fw-500`}>Profilo</span>
            </Link>
        </nav>
    );
}