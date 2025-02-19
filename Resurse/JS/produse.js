document.addEventListener('DOMContentLoaded', () => {
    // Validare inputuri
    const textarea = document.getElementById('textareaInput');
    if(textarea) {
        textarea.addEventListener('input', function() {
            const isValid = this.value.length >= 5;
            this.classList.toggle('is-invalid', !isValid);
        });
    }

    // Switch tema
    const themeSwitch = document.getElementById('themeSwitch');
    if(themeSwitch) {
        themeSwitch.addEventListener('change', function() {
            document.body.classList.toggle('dark-theme', this.checked);
            localStorage.setItem('theme', this.checked ? 'dark' : 'light');
            
            // Schimbă iconița
            const icon = this.nextElementSibling.querySelector('i');
            icon.classList.toggle('bi-moon-stars');
            icon.classList.toggle('bi-sun');
        });
        
        // Inițializare tema
        const savedTheme = localStorage.getItem('theme');
        if(savedTheme === 'dark') {
            themeSwitch.checked = true;
            document.body.classList.add('dark-theme');
        }
    }

    // Toggle buttons
    document.querySelectorAll('.btn-check').forEach(btn => {
        btn.addEventListener('change', function() {
            const label = document.querySelector(`label[for="${this.id}"]`);
            label.classList.toggle('active', this.checked);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Pas 1: Inițializare produse
    const allProducts = JSON.parse(document.getElementById('products-data').dataset.products);
    const productContainer = document.getElementById('produse-container');
    const noProductsMsg = document.getElementById('no-products-message');

    // Pas 2: Funcție de randare
    const renderProducts = (products) => {
        productContainer.innerHTML = products.map(prod => `
            <div class="col">
                <article class="card h-100">
                    <img src="/resurse/imagini/produse/${prod.poza}" class="card-img-top" alt="${prod.nume}">
                    <div class="card-body">
                        <h3 class="card-title">${prod.nume}</h3>
                        <div class="card-text">
                            <p class="text-muted">Categorie: ${prod.categorie}</p>
                            <p>${prod.descriere}</p>
                            <p class="h4 text-primary">${prod.pret} RON</p>
                        </div>
                    </div>
                </article>
            </div>
        `).join('');

        noProductsMsg.style.display = products.length ? 'none' : 'block';
    };

    // Pas 3: Funcție de filtrare
    const applyFilters = () => {
        const nume = document.getElementById('inp-nume').value.toLowerCase();
        const pretMin = parseFloat(document.getElementById('inp-pret').value) || 0;
        const categorie = document.getElementById('inp-categorie').value;
        const sortType = document.querySelector('input[name="sortType"]:checked')?.value;

        let filtered = allProducts.filter(prod => 
            prod.nume.toLowerCase().includes(nume) &&
            prod.pret >= pretMin &&
            (categorie === 'toate' || prod.categorie === categorie)
        );

        // Sortare
        if (sortType === 'crescator') {
            filtered.sort((a, b) => a.pret - b.pret);
        } else if (sortType === 'descrescator') {
            filtered.sort((a, b) => b.pret - a.pret);
        }

        renderProducts(filtered);
    };

    // Pas 4: Ascultători evenimente
    document.querySelectorAll('input[type="text"], input[type="range"], input[type="radio"], select').forEach(input => {
        input.addEventListener('input', applyFilters);
        input.addEventListener('change', applyFilters);
    });

    // Inițializare
    applyFilters();
});

let textarea = document.getElementById('textareaInput');
            
            
textarea.addEventListener('input', function() {
if (textarea.value.length < 5) {  // For instance, if length is less than 5
textarea.classList.add('is-invalid');
} else {
textarea.classList.remove('is-invalid');
}
});
