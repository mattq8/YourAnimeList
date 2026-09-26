import { useEffect } from 'react';
import styles from './FiltersMenu.module.css';
import { Form } from '@inertiajs/react';
import Button from '../Button/Button';

export default function FiltersMenu({ isVisible, onClose, genres, score }) {
    // console.log("Genres", genres);


    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className={styles.backdrop}>
            <div className={`${styles.filtersMenu} bg-light-light-night-blue`}>
                <button className={`${styles.closeBtn} bg-night-blue`} onClick={onClose}></button>
                <span className={`${styles.margin} clr-white fs-300 fw-600`}>Filter anime based on</span>

                <Form action="/search" method="get" className={styles.gap}>

                    {
                        score ?
                            <div>

                            </div>
                            : ""
                    }

                    <div className={styles.yearWrap}>
                        <span className="clr-dates fs-200 fw-600">Year:</span>
                        <div className={styles.years}>
                            <div className={styles.singleYear}>
                                <label className="clr-dates fs-200 fw-600" htmlFor="yearFrom">From:</label>
                                <input
                                    className="clr-dates fs-200 fw-600"
                                    type="number"
                                    id="yearFrom"
                                    name="yearFrom"
                                    min="1960"
                                    max={new Date().getFullYear()}
                                    placeholder="1960"
                                />
                            </div>
                            <div className={styles.singleYear}>
                                <label className="clr-dates fs-200 fw-600" htmlFor="yearTo">To:</label>
                                <input
                                    className="clr-dates fs-200 fw-600"
                                    type="number"
                                    id="yearTo"
                                    name="yearTo"
                                    min="1960"
                                    max={new Date().getFullYear()}
                                    placeholder="2026"
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.genresWrap}>
                        <span className="clr-dates fs-200 fw-600">Genres:</span>
                        <div className={styles.genres}>
                            {
                                genres.map((genre) => (
                                    <label className={`${styles.checkboxLabel} clr-dates fs-200 fw-600`} key={genre.id}>
                                        <input type="checkbox" name="genres[]" value={genre.name} key={genre.id} />
                                        {genre.name}
                                    </label>
                                ))
                            }
                        </div>
                    </div>
                    
                    <div className={styles.btnDiv}>
                        <Button title="Next" accent={true} fs="fs-200" />
                    </div>
                    
                </Form>
            </div>
        </div >
    )
}