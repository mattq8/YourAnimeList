import styles from "./BottomPart.module.css";

export default function BottomPart({ children, slideUp, slideDown, animated, noSlide }) {
    let animationClass = "";

    if (slideUp) {
        animationClass = styles.slideUp;
    } else if (slideDown) {
        animationClass = styles.flex + " " + styles.slideDown; 
    } else if (animated) {
        animationClass = styles.flex + " " + styles.animated;
    } else if (noSlide) {
        animationClass = styles.noSlide;
    }


    return (
        <div className={`${styles.bottom} ${animationClass} bg-light-night-blue`}>
            {children}
        </div>
    );
}