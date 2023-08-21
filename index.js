const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 8080;
const rutaindex = ['/', '/index', '/home'];

app.use(express.static('resurse'));
app.use('/css', express.static(path.join(__dirname, 'resurse', 'css')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'pagini'));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

for (let ruta of rutaindex) {
  app.get(ruta, (req, res) => {
    res.render('index', { ip:req.ip, titlu: 'Pagina principală' });
  });
}
app.get('/istoricfirma', (req, res) => {
  res.render('istoricfirma');
});

app.get('/info', (req, res) => {
  const dirName = __dirname;
  const fileName = __filename;
  const currentWorkingDir = process.cwd();

  res.send(`
      __dirname: ${dirName}<br>
      __filename: ${fileName}<br>
      process.cwd(): ${currentWorkingDir}
  `);
});
// Alte setări ale aplicației...
app.get('/galerie', (req, res) => {
  const dirPath = path.join(__dirname, 'resurse', 'imagini');
  fs.readdir(dirPath, (err, files) => {
      if (err) {
          console.error("A apărut o eroare în timpul citirii directorului:", err);
          afiseazaEroare(res, 500);
          return;
      }

      // Filtrăm doar fișierele cu extensia .jpg sau .png
      const imagini = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'));

      res.render('galerie', { imagini: imagini });
  });
});
app.use('/imagini', express.static('C:/Users/doung/OneDrive/Desktop/Proiect Tehnici Web/Resurse/Imagini'));

app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'resurse', 'ico', 'favicon.ico'));
});
app.get('*.ejs', (req, res) => {
  afiseazaEroare(res, 400);
});



// Funcție pentru a încărca datele din JSON în memorie
function incarcaEroriDinJSON(filepath) {
  try {
    const rawData = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error("A apărut o eroare în timpul citirii fișierului JSON:", error);
    return null;
  }
}

// Încărcăm erorile în memorie
const erori = incarcaEroriDinJSON('./erori.json');

// Funcție de afișare a erorilor
function afiseazaEroare(res, identificator = null, titlu = null, text = null, imagine = null) {
  let eroare = {};

  if (identificator) {
    eroare = erori.info_erori.find(e => e.identificator === identificator);
  }

  if (!eroare) {
    eroare = erori.eroare_default;
  }

  titlu = titlu || eroare.titlu;
  text = text || eroare.text;
  imagine = imagine || (erori.cale_baza + eroare.imagine);

  res.status(identificator || 200).render('eroare', { // folosim "eroare" în loc de "eroare404"
    titlu: titlu,
    text: text,
    imagine: imagine
  });
}


app.use('/resurse/*', (req, res, next) => {
  const cale = req.path;

  // Verifică dacă calea se termină cu / (indică un folder)
  if (cale.endsWith('/')) {
      afiseazaEroare(res, 403);
  } else {
      next(); // treci mai departe, dacă este un fișier
  }
});



app.get('/*', (req, res) => {
  const pagina = req.path.substring(1);

  res.render(pagina, function(err, rezultatRandare) {
    if (err) {
      if (err.message.startsWith("Failed to lookup view")) {
        afiseazaEroare(res, 404);
      } else {
        afiseazaEroare(res);
      }
    } else {
      res.send(rezultatRandare);
    }
  });
});

// Vectorul cu foldere de creat
const foldereDeCreat = ['temp', 'temp1']; // 'temp1' e doar pentru testare, îl puteți șterge ulterior

foldereDeCreat.forEach((folder) => {
    const caleFolder = path.join(__dirname, folder); // Îmbinăm calea curentă cu numele folderului

    // Verificăm dacă folderul există
    if (!fs.existsSync(caleFolder)) {
        // Dacă nu există, îl creăm
        fs.mkdirSync(caleFolder, { recursive: true }); // Opțiunea { recursive: true } permite crearea de subfoldere dacă este cazul
        console.log(`Folderul ${folder} a fost creat.`);
    } else {
        console.log(`Folderul ${folder} deja există.`);
    }
});



