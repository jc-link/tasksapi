--authentication method table--
CREATE TABLE auth_method (
    auth_method_id INT AUTO_INCREMENT NOT NULL,
    authentication_type VARCHAR(30) NOT NULL,
    PRIMARY KEY (auth_method_id)
);
------------------------------------------------

-- user table --
CREATE TABLE user (
    user_id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(45) NOT NULL,
    user_mail VARCHAR(45) NOT NULL,
    auth_method_id INT NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id),
    CONSTRAINT fk_user_auth_method
        FOREIGN KEY (auth_method_id)
        REFERENCES auth_method (auth_method_id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
);
-----------------------------------------------

-- task table --
CREATE TABLE task (
    task_id INT AUTO_INCREMENT NOT NULL,
    task_name VARCHAR(30) NOT NULL,
    user_id INT NOT NULL,
    creation_date TIMESTAMP,
    PRIMARY KEY (task_id),
    CONSTRAINT fk_task_user
        FOREIGN KEY (user_id)
        REFERENCES user (user_id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
);

-- task schedule table --
CREATE TABLE task_schedule (
    task_schedule_id INT AUTO_INCREMENT NOT NULL,
    task_id INT NOT NULL,
    task_date TIMESTAMP NOT NULL,
    completed BOOLEAN NOT NULL,
    completed_date TIMESTAMP,
    PRIMARY KEY (task_schedule_id),
    CONSTRAINT fk_task_schedule_task
        FOREIGN KEY (task_id)
        REFERENCES task (task_id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
);

--- STORE PROCEDURES ---
CREATE PROCEDURE userAdd (IN user_id INT, IN username VARCHAR(45),IN user_email VARCHAR(45),IN auth_method_id INT,IN password VARCHAR(50))
BEGIN
    IF user_id = 0 THEN
        INSERT INTO user (username, user_email, auth_method_id)
        VALUES (username, user_email, auth_method_id);
    ELSE
        UPDATE user
        SET username = username,
        user_email = user_email,
        auth_method_id = auth_method_id
        WHERE id = user_id;
    END IF;
    SELECT user_id AS id
END;