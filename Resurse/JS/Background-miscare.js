let imagini = ['imagini/aneta-voborilova-XDM22yShI78-unsplash.jpg', 'imagini/elena-kloppenburg-jw9F8vNZDSo-unsplash.jpg'];
let indexCurent = 0;

setInterval(function() {
    indexCurent = (indexCurent + 1) % imagini.length;
    document.body.style.backgroundImage = `url('${imagini[indexCurent]}')`;
}, 5000); // Aici 5000 reprezintă 5 secunde. Poți să ajustezi această valoare.
