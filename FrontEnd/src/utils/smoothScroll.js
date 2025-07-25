// Polyfill for browsers that don't support CSS scroll-behavior
export const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
};

// For smooth scrolling to top
export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};
