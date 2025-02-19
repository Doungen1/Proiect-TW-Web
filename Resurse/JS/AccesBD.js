const { Client, Pool } = require('pg');

class AccesBD {
    static #instanta = null;
    static #initializat = false;

    constructor() {
        if (AccesBD.#instanta) {
            throw new Error("Deja a fost instantiat");
        }
        if (!AccesBD.#initializat) {
            throw new Error("Trebuie apelat doar din getInstanta; fara sa fi aruncat vreo eroare");
        }
    }

    initLocal() {
        this.client = new Client({
            database: "proiect", 
            user: "postgres",
            password: "1234",
            host: "localhost",
            port: 5432
        });
        this.client.connect();
    }  //this.client2= new Pool({database:"proiect",}),
        //user:"postgres",
        //password:"1234",
        //host:"localhost",
        //port:5432});

        getClient() {
            if (!AccesBD.#instanta) {
                throw new Error("Nu a fost instantiata clasa");
            }
            return this.client;
        }
    

    /**
     * @typedef {object} ObiectConexiune - obiect primit de functiile care realizeaza un query
     * @property {string} init - tipul de conexiune {"init, "render", etc.}
     */

    /**
     * Returneaza instanta unica a clasei
     * 
     * @param {ObiectConexiune} init obiect cu datele pentru query 
     * @return {AccesBD}
     */
    static getInstanta({ init = "local" } = {}) {
        if (!this.#instanta) {
            this.#initializat = true;
            this.#instanta = new AccesBD();
            if (init === "local") {
                this.#instanta.initLocal();
            }
        }
        return this.#instanta;
    }


    /**
     * @typedef {object} ObiectQuerySelect - obiect primit de functiile care realizeaza un query
     * @property {string} tabel - numele tabelului
     * @property {string[]} campuri - numele coloanelor
     * @property {string} conditiiAnd - lista de stringuri cu conditii pentru where
     */

    /**
     * callback pentru queryuri
     * @callback QueryCallBack
     * @param {Error} err Eventuala eroare in urma queryului
     * @param {Object} rez Rezultatul query-ului
     */

    /**
     * Selecteaza inregistrari din baza de date
     * @param {ObiectQuerySelect} obj - un obiect cu datele pentru query
     * @param {function} callback - o functie callback cu 2 parametri: eroare si rezultatul query-ului
     */
    select({ tabel = "", campuri = [], conditiiAnd = [], callback, parametriQuery = [] } = {}) {
        let conditiiWhere = conditiiAnd.length > 0 ? `WHERE ${conditiiAnd.join(" AND ")}` : "";
        let comanda = `SELECT ${campuri.join(",")} FROM ${tabel} ${conditiiWhere}`;
        this.client.query(comanda, parametriQuery, callback);
    }
        /*
        comanda=`select id, nume, prenume from utilizatori where id=$1 and nume=$2`;
        this.client.query(comanda, [1, "Popescu"], function(err, rez){*/
        
    async selectAsync({ tabel = "", campuri = [], conditiiAnd = [] } = {}) {
        let conditieWhere = "";
        if (conditiiAnd.length > 0) {
            conditieWhere = `WHERE ${conditiiAnd.join(" AND ")}`;
        }
        let comanda = `SELECT ${campuri.join(",")} FROM ${tabel} ${conditieWhere}`;
        console.error("selectAsync", comanda);
        try {
            let rez = await this.client.query(comanda);
            console.log("selectasync: ", rez);
            return rez;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    insert({ tabel = "", campuri = {} } = {}, callback) {
        console.log("---------------------------");
        console.log(Object.keys(campuri).join(","));
        console.log(Object.values(campuri).join(","));
        let comanda = `INSERT INTO ${tabel} (${Object.keys(campuri).join(",")}) VALUES (${Object.values(campuri).map((x) => `'${x}'`).join(",")})`;
        console.log(comanda);
        this.client.query(comanda, callback);
    }

/**
 * @typedef {object} ObiectQuerySelect - obiect primit de functiile care realizeaza un query
 * @property {string} tabel - numele tabelului
 * @property {string[]} campuri - numele coloanelor
 * @property {string[]} conditiiAnd - lista de stringuri cu conditii pentru where
//  */

update({ tabel = "", campuri = {}, conditiiAnd = [] } = {}, callback) {
    let campuriActualizate = [];
    for (let prop in campuri) {
        campuriActualizate.push(`${prop}='${campuri[prop]}'`);
    }
    let conditiiWhere = "";
    if (conditiiAnd.length > 0) {
        conditiiWhere = `WHERE ${conditiiAnd.join(" AND ")}`;
    }
    let comanda = `UPDATE ${tabel} SET ${campuriActualizate.join(",")} ${conditiiWhere}`;
    console.log(comanda);
    this.client.query(comanda, callback);
}

updateParametrizat ({tabel="", campuri=[], conditiiAnd=[]}={}, callback, parametriQuery) {
    if(campuri.length !== parametriQuery.length) {
        throw new Error("Numărul de campuri nu corespunde cu numărul de valori");
    }
    let campuriActualizate = [];
    for (let i = 0; i < campuri.length; i++) {
        campuriActualizate.push(`${campuri[i]}=$${i+1}`);
    }
    let conditieWhere = "";
    if (conditiiAnd.length > 0) {
        conditieWhere = `WHERE ${conditiiAnd.join(" AND ")}`;
    }
    let comanda = `UPDATE ${tabel} SET ${campuriActualizate.join(",")} ${conditieWhere}`;
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", comanda);
    this.client.query(comanda, parametriQuery, callback);
}


//to do

// updateParametrizat({tabel="", campuri={}, conditiiAnd=[]}={}, callback, parametriQuery){
    //let campuriActualizate=[];
    //for(let prop in campuri)
    //campuriActualizate.push(`${prop}=$${campuri[prop]}`);
    // let conditiiWhere="";
    // if(conditiiAnd.length>0)
    // conditiiWhere=`WHERE ${conditiiAnd.join(" AND ")}`;
    // let comanda = `UPDATE ${tabel} SET ${campuriActualizate.join(",")} ${conditiiWhere}`;
    //this.client.query(comanda, valori, callback);


    delete({tabel="", conditiiAnd=[]}={}, callback) {
        let conditieWhere = "";
        if (conditiiAnd.length > 0) {
            conditieWhere = `WHERE ${conditiiAnd.join(" AND ")}`;
        }
        let comanda = `DELETE FROM ${tabel} ${conditieWhere}`;
        console.log(comanda);
        this.client.query(comanda, callback);
    }

    query(comanda, callback) {
        this.client.query(comanda, callback);
    }
}

module.exports = AccesBD;
