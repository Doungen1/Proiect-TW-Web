let indexCurent = 0;
const imagini = document.querySelectorAll('.imagine-galerie-animata');

function schimbaImaginea() {
    imagini[indexCurent].style.opacity = 0;
    indexCurent = (indexCurent + 1) % imagini.length;
    imagini[indexCurent].style.opacity = 1;
}

const galerie = document.querySelector('.galerie-animata');

galerie.addEventListener('mouseenter', () => {
    // Pornim animația atunci când mouse-ul intră în div
    interval = setInterval(schimbaImaginea, 2000); // De exemplu, schimbăm imaginea la fiecare 2 secunde
});

galerie.addEventListener('mouseleave', () => {
    // Oprim animația atunci când mouse-ul părăsește div-ul
    clearInterval(interval);
});
