CREATE TYPE roluri AS ENUM('admin', 'moderator', 'comun');


CREATE TABLE IF NOT EXISTS utilizatori (
    id serial PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    nume VARCHAR(50) NOT NULL,
    prenume VARCHAR(50) NOT NULL,
    parola VARCHAR(50) NOT NULL,
    rol roluri NOT NULL DEFAULT 'comun',
    email VARCHAR(50) NOT NULL,
    culoare_chat VARCHAR(50) NOT NULL,
    data_adaugare TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cod_character VARCHAR(200),
    confimat_mail BOOLEAN DEFAULT False
);

CREATE TABLE IF NOT EXISTS accesari (
    id serial PRIMARY KEY,
    ip VARCHAR(100) NOT NULL,
    user_id INT NULL REFERENCES utilizatori(id),
    pagina VARCHAR(500) NOT NULL,
    data_accesare TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)