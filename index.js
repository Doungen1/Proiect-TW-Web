import express from 'express';
import path from 'path';
import fs from 'fs';
import sass from 'sass';
import ejs from 'ejs';
import sharp from 'sharp';
import { Client } from 'pg';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let obGlobal = {
  erori:[],
  obImagini:[],
  folderScss: path.join(__dirname, 'resurse/scss'),
  folderCss: path.join(__dirname, 'resurse/css'),
  folderBackup: path.join(__dirname, 'backup'),
  optiuniMeniu:[]
}
// Etapa 4.17

const client = new Client({
  database: "Proiect_WEB",
  host: "localhost",
  user: "postgres",
  password: "Robert",
  port: 5433
});

console.log('pg.Client');
app.use(req, _res, next) => {
  console.log('Request for:', req.url);
  next();
}
client.connect();


// Etapa 4.6
app.use('/Resurse', express.static(path.join(__dirname, 'Resurse')));
app.use(express.static('resurse'));
app.use('/css', express.static(path.join(__dirname, 'resurse', 'css')));
app.use('/node_modules', express.static(path.join(__dirname, 'resurse', 'node_modules')));
app.use('/JS', express.static(path.join(__dirname, 'resurse', 'JS')));
app.get('/istoricfirma', (_req, res) => {
  res.render('istoricfirma');
});

app.get('/info', (_req, res) => {
  const dirName = __dirname;
  const fileName = __filename;
  const currentWorkingDir = process.cwd();

  res.send(`
      __dirname: ${dirName}<br>
      __filename: ${fileName}<br>
      process.cwd(): ${currentWorkingDir}
  `);
});
app.get('/galerie', (_req, res) => {
  res.render('galerie', { imagini: obGlobal.obImagini.imagini });
});

  res.send(`
      __dirname: ${dirName}<br>
      __filename: ${fileName}<br>
      process.cwd(): ${currentWorkingDir}
  `);
app.get('/galerie', (req, res) => {
  res.render('galerie', { imagini: obGlobal.obImagini.imagini });
});


app.listen(port, () => {
  console.log(`A pornit aplicatia pe portul ${port}`);
});
////////////////////// Etapa 4.13
function initErori() {
  let continut = fs.readFileSync(__dirname + "/resurse/JSON/erori.json").toString();
  let obJson = JSON.parse(continut);
  for (let eroare of obJson.info_erori) {
      eroare.imagine = obJson.cale_baza + "/" + eroare.imagine;
  }
  obGlobal.erori = obJson;
  obJson.eroare_default.imagine = obJson.cale_baza + "/" + obJson.eroare_default.imagine;
}

// Etapa 5.1
function initImagini() {
  let continut = fs.readFileSync(__dirname + "/resurse/JSON/galerie.json").toString("utf-8");
  for (let imag of vImagini) {
        let [numeFis, ext] = imag.fisier.match(/^(.+)\.(.+)$/).slice(1);
        let caleFisAbs = path.join(caleAbs, imag.fisier);
        let caleFisMediuAbs = path.join(caleAbsMediu, numeFis + ".webp");
        sharp(caleFisAbs).resize(300).toFile(caleFisMediuAbs, (err, _info) => {
          if(err) console.error("Error processing image:", imag.fisier, err);
      });    
      imag.fisier_mediu = path.join("/", obGlobal.obImagini.cale_galerie, "mediu", numeFis + ".webp");
      imag.fisier = path.join("/", obGlobal.obImagini.cale_galerie, imag.fisier);
        
    }
      [numeFis, ext] = imag.fisier.match(/^(.+)\.(.+)$/).slice(1);
      let caleFisAbs = path.join(caleAbs, imag.fisier);
      let caleFisMediuAbs = path.join(caleAbsMediu, numeFis + ".webp");
      sharp(caleFisAbs).resize(300).toFile(caleFisMediuAbs, (err, info) => {
        if(err) console.error("Error processing image:", imag.fisier, err);
    });    
    imag.fisier_mediu = path.join("/", obGlobal.obImagini.cale_galerie, "mediu", numeFis + ".webp");
    imag.fisier = path.join("/", obGlobal.obImagini.cale_galerie, imag.fisier);
app.get('/favicon.ico', (_req, res) => {
    res.sendFile(path.join(__dirname, 'resurse', 'ico', 'favicon.ico'));
});
}

app.get('*.ejs', (_req, res) => {
  afiseazaEroare(res, 400);
});

// Etapa 4.18
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'resurse', 'ico', 'favicon.ico'));
});

// Etapa 4.19
app.get('*.ejs', (req, res) => {
  afiseazaEroare(res, 400);
});

// Etapa 4.13
function incarcaEroriDinJSON(cale) {
  try {
    const rawData = fs.readFileSync(cale, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error("A apărut o eroare în timpul citirii fișierului JSON:", error);
    return null;
  }
}

// Apelarea funcției cu calea fișierului ca argument
const erori = incarcaEroriDinJSON("./resurse/JSON/erori.json");


// Funcție de afișare a erorilor

// Etapa 4.14
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


function compileazaScss(caleScss, caleCss) {
    //console.log("cale:", caleCss);
    if (!caleCss) {
        let numeFisExt = path.basename(caleScss);
        let numeFis = numeFisExt.split(".")[0]; 
        caleCss = numeFis + ".css";
    }

    if (!path.isAbsolute(caleScss)) {
        caleScss = path.join(obGlobal.folderScss, caleScss);
        if (!path.isAbsolute(caleCss)) {
            caleCss = path.join(obGlobal.folderCss, caleCss);
        }
    }

    let caleBackup = path.join(obGlobal.folderBackup, "resurse/css");
    if (!fs.existsSync(caleBackup)) {
        fs.mkdirSync(caleBackup, { recursive: true });
    }

    let numeFisCss = path.basename(caleCss);
    if (fs.existsSync(caleCss)) {
        fs.copyFileSync(caleCss, path.join(obGlobal.folderBackup, "resurse/css", numeFisCss)); 
    }
    let rez = sass.compile(caleScss, { "sourceMap": true });
    fs.writeFileSync(caleCss, rez.css);
}

compileazaScss("a.scss");

let vFisiere = fs.readdirSync(obGlobal.folderScss);
for (let numeFis of vFisiere) {
    if (path.extname(numeFis) === ".scss") {
        compileazaScss(numeFis);
    }
}

// d) Compilare inițială la pornirea serverului
function compileazaToateScss() {
  function parcurgeDirector(dir) {
    const continut = fs.readdirSync(dir);
    
    continut.forEach(fis => {
      const caleCompleta = path.join(dir, fis);
      const stat = fs.statSync(caleCompleta);
      
      if (stat.isDirectory()) {
        parcurgeDirector(caleCompleta); // recursivitate pentru subfoldere
      } 
      else if (path.extname(fis) === '.scss') {
        const caleRelativa = path.relative(obGlobal.folderScss, caleCompleta);
        compileazaScss(caleRelativa);
      }
    });
  }

  parcurgeDirector(obGlobal.folderScss);
}

// Apelăm compilarea inițială
compileazaToateScss();

// e) Monitorizare modificări în timp real
function watchScss() {
  const watcher = fs.watch(obGlobal.folderScss, { recursive: true }, (event, fisier) => {
    if (path.extname(fisier) !== '.scss') return;

    const caleScss = path.join(obGlobal.folderScss, fisier);
    
    // Verificăm existența fișierului pentru evenimente de ștergere
    if (!fs.existsSync(caleScss)) return;

    // Compilare cu întârziere pentru evitarea erorilor de lock
    setTimeout(() => {
      try {
        compileazaScss(fisier);
        console.log(`Fișier recompilat: ${fisier}`);
      } catch (err) {
        console.error(`Eroare la recompilare ${fisier}:`, err);
      }
    }, 100);
  });

  console.log('Monitorizare modificări SCSS activată...');
  return watcher;
}

watchScss();

app.get("*/galerie-animata.css", function(req, res){
  var sirScss=fs.readFileSync("./resurse/scss/galerie-animata.scss").toString("utf-8");
  var culori = ["navy", "black", "purple", "gray"];
  var indiceAleator = Math.floor(Math.random() * culori.length);
  var culoareAleatoare = culori[indiceAleator];
  var rezScss = ejs.render(sirScss, {culoare:culoareAleatoare});

  try {
    let rezcompilare = sass.renderSync({data: rezScss, sourceMap: true});
    res.setHeader("Content-Type", "text/css");
    res.send(rezcompilare.css);
  } catch (error) {
    //console.log(err);
    res.send("eroare");
  }
});


router.get('/produse', async (req, res) => {
  try {
      console.log('Încep să preiau produsele...'); // Debug 1
  
      const result = await pool.query(`
          SELECT * FROM "Cutitul Bucatarului"
          UNION ALL
          SELECT * FROM "Cutite Vanatoare"
          UNION ALL
          SELECT * FROM "Cutite Santoku"
          UNION ALL
          SELECT * FROM "Cutite Filetat"
          UNION ALL
          SELECT * FROM "Cutite Paine"
          UNION ALL
          SELECT * FROM "Cutite Utilitare"
          UNION ALL
      `);
      
      console.log('Produse găsite:', result.rows); // Debug 2
      
      res.render('produse', {
          title: 'Produse',
          produse: result.rows
      });
  } catch (err) {
      console.error('Eroare la preluarea produselor:', err); // Debug 3
      res.status(500).send('Eroare server');
  }
});

app.get('/produse', (req, res) => {
  let restComanda = "where 1=1";
  if(req.query.tip){
    restComanda+= `and tip_produs='${req.query.tip}'`;
  }
  client.query(`select * from "Cutite Santoku" ${restComanda}`, function(err, rez){
    if (err) {
      console.error(err);
      res.status(500).send("A apărut o eroare la interogarea bazei de date.");
      return;
    }
    res.render('produse', {produse: rez.rows, optiuni:[]}); 
   });
});

  app.get('/produs.ejs/:id', (req, res) => {
    console.log(req.params);
    client.query('select * from "Cutite Santoku" where id=$1', [req.params.id], function(err, rez){
      if(err || !rez.rows.length) {
        console.error(err);
        afiseazaEroare(res, 404, "Produsul nu a fost găsit");
        return;
      }
      res.render('produs', {produs: rez.rows[0]}); 
     });
  });
  
/*app.post("/inregistrare", function(req, res){
  var unsername;
  console.log("ceva");
  var formular = new formidable.IncomingForm();
  formular.parse(req, function(err, campuriText, campuriFisier){
    console.log("Inregistrare:", campuriText);

    console.log("campuriFisier");
    var eroare = "";
    var utilizNou = new Utilizator();
    try{
      utilizNou.setareNume = campuriText.nume;
      utilizNou.username = campuriText.username;
      utilizNou.parola = campuriText.parola;
      utilizNou.email = campuriText.email;
      utilizNou.prenume = campuriText.prenume;
      utilizNou.culoare_chat = campuriText.culoare_chat;
      utilizNou.poza = campuriFisier.poza.originalFilename;
      Utilizator.getUtilizatorDupaUsername(campuriText.username ,{}, function (u, parametru, eroareUser));
        if (eroareUser==-1){
          utilizNou.salvareUtilizator();
        }
        else{
          eroare = "Username-ul exista deja";
        }
        if(!eroare){
          res.render("/pagini/inregistrare", {raspuns:"Inregistrarrea a fost realizata cu succes"});
        }
        else
          res.render("/pagini/inregistrare", {err:"Eroare:"+eroare});
      })}
      catch(err){
        console.log(e.message);
        eroare+= "Eroare Site; reveniti mai tarziu";
        console.log(eroare);
        res.render("/pagini/inregistrare", {err:"Eroare:"+eroare})}
      });

      formular.on("field", function(nume, val){
        console.log(`---${nume}=${val}`);

        if(nume=="username")
          unsername=val;
      })
      formular.on("fileBegin", function(nume,fisier){
        console.log("fileBegin");
      })
*/


app.use('/resurse/*', (req, res, next) => {
  const cale = req.path;

  // Verifică dacă calea se termină cu / (indică un folder)
  if (cale.endsWith('/')) {
      afiseazaEroare(res, 403);
  } else {
      next(); 
  }
});


// Etapa 4.9
app.get('/*', (req, res) => {
  const pagina = req.path.substring(1);
  console.log("Afișare eroare:", { titlu, text, imagine });

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

// Etapa 4.20
const foldereDeCreat = ['temp', 'temp1', 'backup']; // 'temp1' e doar pentru testare, îl puteți șterge ulterior

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
})