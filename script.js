"use strict"

let cards = document.querySelectorAll(".card");
let styleSheet = document.createElement("style");
console.log(cards.length)

for (let i = 2; i <= cards.length; i++) {
    // Detect number of slides:
    let numberOfSlides = `
        .slider .wrapper:has(.card:nth-child(${i})) {
            --tot-s: ${i};
        }
    `
    styleSheet.textContent += numberOfSlides
    document.head.appendChild(styleSheet)
}

for (let i = 1; i <= cards.length; i++) {
    // Detect current slide
    let currentSlide = `
        .slider .wrapper:has(.card:nth-child(${i}):focus) {
            --curr-s: ${i};
        }
    `
    styleSheet.textContent += currentSlide
    document.head.appendChild(styleSheet)
}

cards.forEach(card => {
    card.addEventListener('click', function() {
        this.focus();
    });
});

document.querySelector('.slider').addEventListener('click', function(e) {
    if (!e.target.closest('.card')) {
        document.activeElement?.blur();
    }
});

cards.forEach(card => {
    const timeElement = card.querySelector("time");
    const date = new Date(timeElement.getAttribute("datetime"));
    if (date > Date.now()) {
        updateCountdown(timeElement, date);
        setInterval(() => updateCountdown(timeElement, date), 1000);
    }
});

function updateCountdown(el, eventDate) {
    const diff = eventDate - Date.now();

    if (diff <= 0) {
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    el.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}