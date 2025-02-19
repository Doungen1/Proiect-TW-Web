document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('#grid-galerie img');

    // Când se dă click pe o imagine din galerie
    images.forEach(img => {
        img.addEventListener('click', function() {
            // Creăm un div care va acoperi întreaga pagină
            const fullScreenDiv = document.createElement('div');
            fullScreenDiv.style.position = 'fixed';
            fullScreenDiv.style.top = '0';
            fullScreenDiv.style.right = '0';
            fullScreenDiv.style.bottom = '0';
            fullScreenDiv.style.left = '0';
            fullScreenDiv.style.zIndex = '9999';
            fullScreenDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            fullScreenDiv.style.display = 'flex';
            fullScreenDiv.style.alignItems = 'center';
            fullScreenDiv.style.justifyContent = 'center';

            // Creăm o copie a imaginii și o adăugăm în div-ul creat
            const imageClone = this.cloneNode(true);
            imageClone.style.maxWidth = '90%';
            imageClone.style.maxHeight = '90%';
            fullScreenDiv.appendChild(imageClone);

            // Adăugăm div-ul la finalul paginii
            document.body.appendChild(fullScreenDiv);

            // Când se dă click pe div-ul care acoperă întreaga pagină, acesta se închide
            fullScreenDiv.addEventListener('click', () => {
                fullScreenDiv.remove();
            });
        });
    });
});
