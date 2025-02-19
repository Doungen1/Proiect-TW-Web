const AccesBD = require("./accesBD");
const parole = require("./parole");

const { RolFactory } = require("./Roluri");
const crypto = require('crypto');
const nodemailer = require("nodemailer");

class Utilizator {
    static tipConexiune = "local";
    static tabel = "utilizatori";
    static parolaCriptare = "tehniciweb";
    static emailServer = "doungen@gmail.com";
    static lungimeCod = 64;
    static numeDomeniu = "http://localhost:8080";
    #eroare;

    constructor({ id, username, nume, prenume, email, parola, rol, culoare_chat = "black", poza } = {}) {
        this.id = id;

        // Optional: verifica username in constructor
        try {
            if (this.checkUsername(username))
                this.username = username;
        }
        catch (e) { this.#eroare = e.message }

        for (let prop in arguments[0]) {
            this[prop] = arguments[0][prop];
        }
        if (this.rol)
            this.rol = this.rol.cod ? RolFactory.creeazaRol(this.rol.cod) : RolFactory.creeazaRol(this.rol);
        console.log(this.rol);

        this.#eroare = "";
    }

    set setareNume(nume) {
        if (this.checkName(nume)) this.nume = nume
        else {
            throw new Error("Numele nu este valid");
        }
    }

    /*
     * Folosit doar la inregistrare si modificare profil
     */
    set setareUsername(username) {
        if (this.checkUsername(username)) this.username = username
        else {
            throw new Error("Username-ul nu este valid");
        }
    }

    checkUsername(username) {
        return username != "" && username.match(new RegExp("^[A-Za-z0-9#_./]+$"));
    }

    static criptareParola(parola) {
        return crypto.scryptSync(parola, Utilizator.parolaCriptare, Utilizator.lungimeCod).toString("hex");
    }

    salvareUtilizator() {
        let parolaCriptata = Utilizator.criptareParola(this.parola);
        let utiliz = this;
        let token = parole.genereazaToken(100);
        AccesBD.getInstanta(Utilizator.tipConexiune).insert({
            tabel: Utilizator.tabel, campuri: {
                username: this.username,
                nume: this.nume,
                prenume: this.prenume,
                email: this.email,
                parola: parolaCriptata,
                culoare_chat: this.culoare_chat,
                cod: token,
                poza: this.poza
            }
        }, function (err, rez) {
            if (err) {
                console.log(err);
            } else
                utiliz.trimiteMail("Te-ai inregistrat cu succes", "Username-ul tau este " + utiliz.username, `<h1>Salut!</h1><p style='color:blue'> Username-ul tau este ${utiliz.username}.</p>`);
        });
    }

    // TODO: aici pare sa fie parola de la email. Ar trebui sa fie stocata intr-un loc sigur.
    async trimiteMail(subiect, mesajText, mesajHtml, atasamente = []) {
        var transp = nodemailer.createTransport({
            service: "gmail",
            secure: false,
            auth: {
                user: Utilizator.emailServer,
                pass: "xjwasdasfdssd"
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Genereaza html

        await transp.sendMail({
            from: Utilizator.emailServer,
            to: this.email, // TODO: de inlocuit cu this.email
            subject: subiect,
            text: mesajText,
            html: mesajHtml,
            attachments: atasamente
        });
        console.log("trimis mail");
    }

    static async getUtilizatorDupaUsernameAsync(username) {
        if (!username) return null;
        try {
            let rezSelect = await AccesBD.getInstanta(Utilizator.tipConexiune).selectAsync({ tabel: Utilizator.tabel, campuri: ["*"], conditiiAnd: [`username='${username}'`] });
            if (rezSelect.rowCount != 0) {
                return new Utilizator(rezSelect.rows[0]);
            } else {
                console.log("getUtilizDupaUsernameAsync: nu exista utilizatorul");
                return null;
            }
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }

    static getUtilizaDupaUsername(username, obparam, proceseazaUtiliz) {
        if (!username) return null;
        let eroare = null;
        AccesBD.getInstanta(Utilizator.tipConexiune).select({ tabel: "utiliatori", campuri: ["*"], conditiiAnd: [`username='${username}'`] }, function (err, rezSelect) {
            if (err) {
                console.error("Utilizator:", err);
                eroare = -2;
            }
            else if (rezSelect.rowCount == 0) {
                eroare = -1;
            }
            let u = new Utilizator(rezSelect.rows[0]);
            proceseazaUtiliz(u, eroare, obparam);
        });
    }

    areDreptul(drept) {
        return this.rol.areDreptul(drept);
    }
}

module.exports = { Utilizator: Utilizator };
