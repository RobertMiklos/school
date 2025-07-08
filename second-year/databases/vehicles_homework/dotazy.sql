-- Active: 1740388381771@@127.0.0.1@3306@vehicles
SELECT * FROM owners ORDER BY last_name ASC;

SELECT * FROM owners WHERE LEFT(birthday, 4) > 1980;

SELECT * FROM owners WHERE city LIKE "P%";

SELECT COUNT(DISTINCT model_name) FROM models;

SELECT vin_code FROM vehicles;