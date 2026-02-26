"use strict"

let cards = document.querySelectorAll(".card");

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