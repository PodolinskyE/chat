CREATE DATABASE chat
	WITH OWNER = "chatCreator"
		 TEMPLATE template0
		 ENCODING = 'UTF8'
		 TABLESPACE = pg_default
		 --LC_COLLATE = 'Russian_Russia.1251'
		 --LC_CTYPE = 'Russian_Russia.1251'
		 CONNECTION LIMIT = -1;

\connect chat

-- Создаем схему main и вложенные таблицы, виды
Create Schema main AUTHORIZATION "chatCreator"


-- тестовая - книги
Create Table main.books(
	id serial Primary Key,
	title text,
	author text,
	language text,
	quantity integer,
	rented integer,
	del boolean DEFAULT false,
	dtc timestamp Default now(),
	uc text
)
