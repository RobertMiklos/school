CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    model VARCHAR(30) NOT NULL,
    speed INT NOT NULL,
    horse_power INT NOT NULL
);

DELIMITER $$

CREATE PROCEDURE insert_vehicles (
    IN p_model VARCHAR(30),
    IN p_speed INT,
    IN p_horse_power INT
)

BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN 
        ROLLBACK;
        SELECT "Chyba při vkládání záznamu" AS zprava;
    END;

    START TRANSACTION;
        INSERT INTO vehicles (model, speed, horse_power)
        VALUES (p_model, p_speed, p_horse_power);
    COMMIT;
END $$

DELIMITER ;


CALL insert_vehicles("BMW X6", 250, 200);
CALL insert_vehicles("Velorex", NULL, 16);
