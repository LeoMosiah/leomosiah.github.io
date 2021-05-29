function onLoad() {
    const images = document.querySelectorAll('img[data-src]');
    const handleLoadImage = (image) => {
        image.setAttribute('src', image.getAttribute('data-src'))
        image.onload = () => {
            image.removeAttribute('data-src')
        };
    }
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((items, observer) => {
            items.forEach((item) => {
                if(item.isIntersecting) {
                    handleLoadImage(item.target);
                    observer.unobserve(item.target);
                }
            });
        });
        images.forEach((img) => {
            observer.observe(img);
        });
        return
    }
    images.forEach(handleLoadImage)
}

onLoad()