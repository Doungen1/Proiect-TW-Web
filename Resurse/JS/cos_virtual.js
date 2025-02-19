window.addEventListener("load", function() {

    let prod_sel = localStorage.getItem("cos_virtual");

    if (prod_sel) {
        let vect_ids = prod_sel.split(",");
        fetch("/produse.cos", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({
                a: 10,
                b: 20,
                ids_prod: vect_ids
            })
        })
        .then(function(rasp) {
            console.log(rasp);
            let x = rasp.json(); 
            console.log(x);
            return x;
        })
        .then(function(objson) {
            console.log(objson); //objson is the array of products
            let main = document.getElementsByTagName("main")[0];
            let btn = document.getElementById("cumpara");

            for (let prod of objson) {
                let article = document.createElement("article");
                article.classList.add("cos-virtual");

                let h2 = document.createElement("h2");
                h2.innerHTML = prod.nume;
                article.appendChild(h2);

                let imagine = document.createElement("img");
                imagine.src = "/resurse/imagini/produse/" + prod.imagine;
                article.appendChild(imagine);

                let descriere = document.createElement("p");
                descriere.innerHTML = prod.descriere + " <b>Pret: " + prod.pret + " lei</b>";
                article.appendChild(descriere);
                main.insertBefore(article, btn);
            }
        })
        .catch(function(err) {
            console.log(err);
        });
    }

    document.getElementById("cumpara").onclick = function() {
        let prod_sel = localStorage.getItem("cos_virtual");
        if (prod_sel) {
            let vect_ids = prod_sel.split(",");
            fetch("/cumpara", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify({
                    ids_prod: vect_ids,
                    a: 10,
                    b: "abc"
                })
            })
            .then(function(rasp) {
                console.log(rasp);
                return rasp.text();
            })
            .then(function(raspunsText) {
                console.log(raspunsText);
                if (raspunsText) {
                    localStorage.removeItem("cos_virtual");
                    let p = document.createElement("p");
                    p.innerHTML = raspunsText;
                    document.getElementsByTagName("main")[0].appendChild(p);
                    document.getElementById("cumpara").style.display = "none";
                }
            });
        }
    }
});
