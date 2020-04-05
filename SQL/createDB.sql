CREATE DATABASE seurantadb;

CREATE TABLE tuotteet (
tuotenro INTEGER NOT NULL,
tuotenimi VARCHAR(50) NOT NULL,
tuntitavoite INTEGER NOT NULL,
PRIMARY KEY (tuotenro)
);

CREATE TABLE linjat (
id SERIAL NOT NULL,
nimi VARCHAR(50) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE tyovuorot (
id SERIAL NOT NULL,
tyovuoro VARCHAR(5) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE hairiot (
id SERIAL NOT NULL,
hairio VARCHAR(50) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE toteumat (
id SERIAL NOT NULL,
pvm DATE NOT NULL DEFAULT CURRENT_DATE,
vuoro_id INTEGER NOT NULL REFERENCES tyovuorot (id),
tuotenro INTEGER NOT NULL REFERENCES tuotteet (tuotenro),
linja_id INTEGER NOT NULL REFERENCES linjat (id),
tehtytunnit DECIMAL,
tehdytkappaleet INTEGER,
viesti VARCHAR(255),
PRIMARY KEY (id)
);

ALTER TABLE toteumat ADD CONSTRAINT pvm CHECK (
   pvm <= CURRENT_DATE 
);

CREATE TABLE tot_hai (
id SERIAL NOT NULL,
tot_id INTEGER NOT NULL REFERENCES toteumat (id),
hair_id INTEGER NOT NULL REFERENCES hairiot (id),
hairiokesto DECIMAL NOT NULL,
PRIMARY KEY (id)
);

