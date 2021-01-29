CREATE DATABASE IF NOT EXISTS bookings
		DEFAULT CHARACTER SET utf8mb4 
		DEFAULT COLLATE utf8mb4_bin;

USE bookings;

CREATE TABLE IF NOT EXISTS company
(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    logo_img_path VARCHAR(85) NOT NULL,
    /* main color in the app as CSS hexadecimal code (rrggbb from #rrggbb) */
    app_base_color VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS staff
(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    email_address VARCHAR(320) UNIQUE NOT NULL,
    username VARCHAR(30) UNIQUE,
    /* hashes to be stored are 60 chars long */
    password VARCHAR(60),
    /* path (wrt project root) where the headshot is stored in the filesystem */
    headshot_path VARCHAR(85),
    is_active BOOL NOT NULL default 1,
    company_id INT UNSIGNED NOT NULL,  
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS service
(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    duration_minutes INT NOT NULL,
    price_euros FLOAT NOT NULL,
    company_id INT UNSIGNED NOT NULL, 
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE ON UPDATE CASCADE    
);

CREATE TABLE IF NOT EXISTS staff_service
(
    staff_id INT UNSIGNED NOT NULL,
    service_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (service_id) REFERENCES service(id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (staff_id, service_id)
);

CREATE TABLE IF NOT EXISTS client
(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    /* 20 in length to allow VAT numbers from any country */
    nif VARCHAR(20),
    /* 'YYYY-MM-DD' format */
    birthdate DATE,
    email_address VARCHAR(320),
    phone_number VARCHAR(20),
    service_provider INT UNSIGNED NOT NULL,
    notes VARCHAR(255), 
    FOREIGN KEY (service_provider) REFERENCES company(id) ON DELETE CASCADE ON UPDATE CASCADE  
);

CREATE TABLE IF NOT EXISTS booking
(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    /* 'YYYY-MM-DD hh:mm:ss' format */
    service_date_time DATETIME NOT NULL,
    client_id INT UNSIGNED NOT NULL,
    service_id INT UNSIGNED NOT NULL,
    staff_id INT UNSIGNED NOT NULL,
    notes VARCHAR(255),     
    FOREIGN KEY (client_id) REFERENCES client(id) ON DELETE CASCADE ON UPDATE CASCADE,   
    FOREIGN KEY (service_id, staff_id) REFERENCES staff_service(service_id, staff_id) ON DELETE CASCADE ON UPDATE CASCADE
);