-- Connect to MySQL first (usually: mysql -u root -p)
CREATE DATABASE ashapura_roadlines;
USE ashapura_roadlines;

CREATE TABLE recruitment_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    driver_name VARCHAR(100) NOT NULL,
    wot_id VARCHAR(100) NOT NULL,
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pending', 'Verified', 'Rejected') DEFAULT 'Pending'
);