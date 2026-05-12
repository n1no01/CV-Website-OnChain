const track = document.querySelector(".carousel-track");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

function getSlideWidth() {

    const slide = document.querySelector(".project-slide");

    const slideStyle = window.getComputedStyle(slide);

    const gap =
        parseInt(slideStyle.marginRight) || 25;

    return slide.offsetWidth + gap;
}

/* NEXT */

nextBtn.addEventListener("click", () => {

    track.scrollBy({
        left: getSlideWidth(),
        behavior: "smooth"
    });

});

/* PREVIOUS */

prevBtn.addEventListener("click", () => {

    track.scrollBy({
        left: -getSlideWidth(),
        behavior: "smooth"
    });

});

/* AUTOPLAY */

setInterval(() => {

    const maxScrollLeft =
        track.scrollWidth - track.clientWidth;

    if (track.scrollLeft >= maxScrollLeft - 10) {

        track.scrollTo({
            left: 0,
            behavior: "smooth"
        });

    } else {

        track.scrollBy({
            left: getSlideWidth(),
            behavior: "smooth"
        });

    }

}, 4000);