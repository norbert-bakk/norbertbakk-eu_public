const carousel = document.querySelector(".project-carousel-container");
const arrowButtons = document.querySelectorAll(".project-carousel-wrapper i");
const firstCardWidth = carousel.querySelector(".project-card").offsetWidth;

// variables to keep track of the dragging state
// startX records the initial position of the mouse
// startScrollLeft records the initial scrollLeft property of the carousel
let isDragging = false, startX, startScrollLeft;

// add event listeners to the arrow buttons
// when the left arrow is clicked, scroll the carousel to the left with the value of the first card width
// when the right arrow is clicked, scroll the carousel to the right with the value of the first card width
arrowButtons.forEach(button => {
    button.addEventListener("click", () => {
        carousel.scrollLeft += button.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // record the initial position of the mouse
    // startX = e.pageX; // e.pageX is the horizontal position of the mouse pointer
    // startScrollLeft = carousel.scrollLeft; // scrollLeft property of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
};
const dragging = (e) => {
    if(!isDragging) return; // if not dragging, do nothing (return from the same line)
    // updates the scrollLeft property of the carousel
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);