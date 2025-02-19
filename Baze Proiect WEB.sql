DROP TYPE IF EXISTS categ_cutite;
DROP TYPE IF EXISTS categ_accesorii;
DROP TYPE IF EXISTS categ_seturi;
DROP TYPE IF EXISTS categ_ascutire;

CREATE TYPE categ_cutite AS ENUM('Cutite Bucatarie', 'Cutite Vanatoare', 'Accesorii', 'Seturi', 'Ascutire');

CREATE TABLE IF NOT EXISTS "Cutitul Bucatarului" (
    id SERIAL PRIMARY KEY,
    nume VARCHAR(50) UNIQUE NOT NULL,
    pret DECIMAL(10, 2) NOT NULL,
    categorie categ_cutite DEFAULT 'Cutite Bucatarie',
    profesional BOOLEAN NOT NULL DEFAULT TRUE,
    material_lama VARCHAR(50) NOT NULL,
    producator VARCHAR(50) NOT NULL,
    garantie VARCHAR(50) NOT NULL,
    descriere VARCHAR(500) NOT NULL,
    imagine VARCHAR(500) NOT NULL,
    lungime_lama INT NOT NULL CHECK (lungime_lama > 0),
    data_adaugare TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Cutite Santoku" (
    id SERIAL PRIMARY KEY,
    nume VARCHAR(50) UNIQUE NOT NULL,
    pret DECIMAL(10, 2) NOT NULL,
    categorie categ_cutite DEFAULT 'Cutite Bucatarie',
    profesional BOOLEAN NOT NULL DEFAULT TRUE,
    material_lama VARCHAR(50) NOT NULL,
    producator VARCHAR(50) NOT NULL,
    garantie VARCHAR(50) NOT NULL,
    descriere VARCHAR(500) NOT NULL,
    imagine VARCHAR(500) NOT NULL,
    lungime_lama INT NOT NULL CHECK (lungime_lama > 0),
    grosime_lama INT NOT NULL CHECK (grosime_lama > 0),
    greutate INT NOT NULL CHECK (greutate > 0),
    data_adaugare TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Cutite Utilitare" (
    id SERIAL PRIMARY KEY,
    nume VARCHAR(50) UNIQUE NOT NULL,
    pret DECIMAL(10, 2) NOT NULL,
    categorie categ_cutite DEFAULT 'Cutite Bucatarie',
    profesional BOOLEAN NOT NULL DEFAULT TRUE,
    material_lama VARCHAR(50) NOT NULL,
    producator VARCHAR(50) NOT NULL,
    garantie VARCHAR(50) NOT NULL,
    descriere VARCHAR(500) NOT NULL,
    imagine VARCHAR(500) NOT NULL,
    lungime_lama INT NOT NULL CHECK (lungime_lama > 0),
    grosime_lama INT NOT NULL CHECK (grosime_lama > 0),
    greutate INT NOT NULL CHECK (greutate > 0),
    data_adaugare TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Cutite Paine" (
    id SERIAL PRIMARY KEY,
    nume VARCHAR(50) UNIQUE NOT NULL,
    pret DECIMAL(10, 2) NOT NULL,
    categorie categ_cutite DEFAULT 'Cutite Bucatarie',
    profesional BOOLEAN NOT NULL DEFAULT TRUE,
    material_lama VARCHAR(50) NOT NULL,
    producator VARCHAR(50) NOT NULL,
    garantie VARCHAR(50) NOT NULL,
    descriere VARCHAR(500) NOT NULL,
    imagine VARCHAR(500) NOT NULL,
    lungime_lama INT NOT NULL CHECK (lungime_lama > 0),
    grosime_lama INT NOT NULL CHECK (grosime_lama > 0),
    greutate INT NOT NULL CHECK (greutate > 0),
    data_adaugare TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Cutite Satar" (
    id SERIAL PRIMARY KEY,
    nume VARCHAR(50) UNIQUE NOT NULL,
    pret DECIMAL(10, 2) NOT NULL,
    categorie categ_cutite DEFAULT 'Cutite Bucatarie',
    profesional BOOLEAN NOT NULL DEFAULT TRUE,
    material_lama VARCHAR(50) NOT NULL,
    producator VARCHAR(50) NOT NULL,
    garantie VARCHAR(50) NOT NULL,
    descriere VARCHAR(500) NOT NULL,
    imagine VARCHAR(500) NOT NULL,
    lungime_lama INT NOT NULL CHECK (lungime_lama > 0),
    grosime_lama INT NOT NULL CHECK (grosime_lama > 0),
    greutate INT NOT NULL CHECK (greutate > 0),
    data_adaugare TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Cutite Filetat" (
    id SERIAL PRIMARY KEY,
    nume VARCHAR(50) UNIQUE NOT NULL,
    pret DECIMAL(10, 2) NOT NULL,
    categorie categ_cutite DEFAULT 'Cutite Bucatarie',
    profesional BOOLEAN NOT NULL DEFAULT TRUE,
    material_lama VARCHAR(50) NOT NULL,
    producator VARCHAR(50) NOT NULL,
    garantie VARCHAR(50) NOT NULL,
    descriere VARCHAR(500) NOT NULL,
    imagine VARCHAR(500) NOT NULL,
    lungime_lama INT NOT NULL CHECK (lungime_lama > 0),
    grosime_lama INT NOT NULL CHECK (grosime_lama > 0),
    greutate INT NOT NULL CHECK (greutate > 0),
    data_adaugare TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Cutite Vanatoare" (
    id SERIAL PRIMARY KEY,
    nume VARCHAR(50) UNIQUE NOT NULL,
    pret DECIMAL(10, 2) NOT NULL,
    categorie categ_cutite DEFAULT 'Cutite Vanatoare',
    blocare BOOLEAN NOT NULL DEFAULT TRUE,
    material_lama VARCHAR(50) NOT NULL,
    producator VARCHAR(50) NOT NULL,
    garantie VARCHAR(50) NOT NULL,
    descriere VARCHAR(500) NOT NULL,
    imagine VARCHAR(500) NOT NULL,
    lungime_lama INT NOT NULL CHECK (lungime_lama > 0),
    grosime_lama INT NOT NULL CHECK (grosime_lama > 0),
    greutate INT NOT NULL CHECK (greutate > 0),
    tip VARCHAR(50) NOT NULL,
    data_adaugare TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Trusa Transport"(
    id SERIAL PRIMARY KEY,
    nume VARCHAR(50) UNIQUE NOT NULL,
    pret DECIMAL(10, 2) NOT NULL,
    capacitate_transport VARCHAR(50) NOT NULL,
    tip VARCHAR (25) NOT NULL,
    categorie categ_cutite DEFAULT 'Accesorii',
    material VARCHAR(50) NOT NULL,
    producator VARCHAR(50) NOT NULL,
    garantie VARCHAR(50) NOT NULL,
    descriere VARCHAR(500) NOT NULL,
    imagine VARCHAR(500) NOT NULL,
    data_adaugare TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Foarfeca Bucatarie" (
    id SERIAL PRIMARY KEY,
    nume VARCHAR(50) UNIQUE NOT NULL,
    pret DECIMAL(10, 2) NOT NULL,
    categorie categ_cutite DEFAULT 'Accesorii',
    material VARCHAR(50) NOT NULL,
    producator VARCHAR(50) NOT NULL,
    garantie VARCHAR(50) NOT NULL,
    descriere VARCHAR(500) NOT NULL,
    caracteristici VARCHAR(500) NOT NULL,
    imagine VARCHAR(500) NOT NULL,
    data_adaugare TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Suport Cutite" (
    id SERIAL PRIMARY KEY,
    nume VARCHAR(50) UNIQUE NOT NULL,
    pret DECIMAL(10, 2) NOT NULL,
    categorie categ_cutite DEFAULT 'Accesorii',
    material VARCHAR(50) NOT NULL,
    producator VARCHAR(50) NOT NULL,
    garantie VARCHAR(50) NOT NULL,
    descriere VARCHAR(500) NOT NULL,
    caracteristici VARCHAR(500) NOT NULL,
    imagine VARCHAR(500) NOT NULL,
    data_adaugare TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Tacator" (
    id SERIAL PRIMARY KEY,
    nume VARCHAR(50) UNIQUE NOT NULL,
    pret DECIMAL(10, 2) NOT NULL,
    categorie categ_cutite DEFAULT 'Accesorii',
    material VARCHAR(50) NOT NULL,
    producator VARCHAR(50) NOT NULL,
    garantie VARCHAR(50) NOT NULL,
    descriere VARCHAR(500) NOT NULL,
    caracteristici VARCHAR(500) NOT NULL,
    imagine VARCHAR(500) NOT NULL,
    data_adaugare TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Masat" (
    id SERIAL PRIMARY KEY,
    nume VARCHAR(50) UNIQUE NOT NULL,
    pret DECIMAL(10, 2) NOT NULL,
    categorie categ_cutite DEFAULT 'Accesorii',
    material VARCHAR(50) NOT NULL,
    producator VARCHAR(50) NOT NULL,
    garantie VARCHAR(50) NOT NULL,
    descriere VARCHAR(500) NOT NULL,
    caracteristici VARCHAR(500) NOT NULL,
    imagine VARCHAR(500) NOT NULL,
    greutate INT NOT NULL CHECK (greutate > 0),
    lungime_totala INT NOT NULL CHECK (lungime_totala > 0),
    material_masat VARCHAR(50) NOT NULL,
    materia_maner VARCHAR(50) NOT NULL,
    data_adaugare TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Piatra Ascutire" (
    id SERIAL PRIMARY KEY,
    nume VARCHAR(50) UNIQUE NOT NULL,
    pret DECIMAL(10, 2) NOT NULL,
    categorie categ_cutite DEFAULT 'Accesorii',
    producator VARCHAR(50) NOT NULL,
    descriere VARCHAR(500) NOT NULL,
    caracteristici VARCHAR(500) NOT NULL,
    imagine VARCHAR(500) NOT NULL,
    greutate INT NOT NULL CHECK (greutate > 0),
    data_adaugare TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Seturi SharpMasters" (
    id SERIAL PRIMARY KEY,
    nume VARCHAR(50) UNIQUE NOT NULL,
    pret DECIMAL(10, 2) NOT NULL,
    categorie categ_cutite DEFAULT 'Seturi',
    producator VARCHAR(50) NOT NULL,
    garantie VARCHAR(50) NOT NULL,
    descriere VARCHAR(500) NOT NULL,
    caracteristici VARCHAR(500) NOT NULL,
    material VARCHAR(50) NOT NULL,
    imagine VARCHAR(500) NOT NULL,
    data_adaugare TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Seturi Invincible" (
    id SERIAL PRIMARY KEY,
    nume VARCHAR(50) UNIQUE NOT NULL,
    pret DECIMAL(10, 2) NOT NULL,
    categorie categ_cutite DEFAULT 'Seturi',
    producator VARCHAR(50) NOT NULL,
    garantie VARCHAR(50) NOT NULL,
    descriere VARCHAR(500) NOT NULL,
    caracteristici VARCHAR(500) NOT NULL,
    material VARCHAR(50) NOT NULL,
    imagine VARCHAR(500) NOT NULL,
    data_adaugare TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Seturi BestChef" (
    id SERIAL PRIMARY KEY,
    nume VARCHAR(50) UNIQUE NOT NULL,
    pret DECIMAL(10, 2) NOT NULL,
    categorie categ_cutite DEFAULT 'Seturi',
    producator VARCHAR(50) NOT NULL,
    garantie VARCHAR(50) NOT NULL,
    descriere VARCHAR(500) NOT NULL,
    caracteristici VARCHAR(500) NOT NULL,
    material VARCHAR(50) NOT NULL,
    imagine VARCHAR(500) NOT NULL,
    data_adaugare TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creează baza de date
CREATE DATABASE magazin_cutite;

-- Conectează-te la baza de date
\c magazin_cutite

-- Creează tabela produse
CREATE TABLE produse (
    id SERIAL PRIMARY KEY,
    nume VARCHAR(100) NOT NULL,
    pret DECIMAL(10,2) NOT NULL,
    categorie VARCHAR(50),
    descriere TEXT,
    poza VARCHAR(255)
);

-- Inserează date de test
INSERT INTO produse (nume, pret, categorie, descriere, poza) 
VALUES 
('Cuțit Chef', 250.99, 'bucatarie', 'Cuțit profesional pentru bucătărie', 'cutit1.jpg'),
('Cuțit Vânătoare', 399.50, 'vanatoare', 'Cuțit rezistent pentru vânătoare', 'cutit2.jpg');