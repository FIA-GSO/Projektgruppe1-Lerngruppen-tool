CREATE TABLE User (
	UID integer PRIMARY KEY AUTOINCREMENT,
	Passwort varchar,
	Vorname string,
	Nachname string,
	Mail varchar,
	Klasse varchar,
	Jahrgang integer
);

CREATE TABLE Gruppe (
	GID integer PRIMARY KEY AUTOINCREMENT,
	Titel varchar,
	Thema varchar,
	Erstellung date,
	Loeschung date,
	Jahrgang varchar,
	Max integer
);

CREATE TABLE Mitglieder (
	MID integer PRIMARY KEY AUTOINCREMENT,
	GID integer,
	UID integer
);

CREATE TABLE Termin (
	TID integer PRIMARY KEY AUTOINCREMENT,
	Termin datetime,
	GID integer,
	Dauer integer,
	Straße varchar,
	PLZ integer,
	Ort string
);

CREATE TABLE Admin (
	AID integer PRIMARY KEY AUTOINCREMENT,
	GID integer,
	UID integer
);






