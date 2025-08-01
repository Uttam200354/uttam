-- ACGL Management System Database Schema
-- Created for MySQL

-- Create database
CREATE DATABASE IF NOT EXISTS acgl_management_system;
USE acgl_management_system;

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type ENUM('admin', 'deepak', 'shivaji') NOT NULL,
    role ENUM('admin', 'user') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Assets table
CREATE TABLE IF NOT EXISTS assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_number INT NOT NULL,
    asset_number VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    department ENUM('IT', 'HR', 'Finance', 'Operations', 'Security') NOT NULL,
    hostname VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL,
    serial_number VARCHAR(255) NOT NULL,
    device VARCHAR(255) NOT NULL,
    created_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_asset_number (asset_number),
    INDEX idx_department (department),
    INDEX idx_hostname (hostname)
);

-- Software License table
CREATE TABLE IF NOT EXISTS software_licenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_number INT NOT NULL,
    software_key VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    department ENUM('IT', 'HR', 'Finance', 'Operations', 'Security') NOT NULL,
    hostname VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL,
    ms_office ENUM('Yes', 'No') DEFAULT 'No',
    autocad ENUM('Yes', 'No') DEFAULT 'No',
    cero ENUM('Yes', 'No') DEFAULT 'No',
    device VARCHAR(255) NOT NULL,
    created_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_software_key (software_key),
    INDEX idx_department (department),
    INDEX idx_hostname (hostname)
);

-- Servers table
CREATE TABLE IF NOT EXISTS servers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_number INT NOT NULL,
    server_type ENUM('SAP', 'Non-SAP') NOT NULL,
    server_brand VARCHAR(255) NOT NULL,
    serial_number VARCHAR(255) NOT NULL,
    model_number VARCHAR(255) NOT NULL,
    hard_disk VARCHAR(100) NOT NULL,
    total_ram VARCHAR(100) NOT NULL,
    total_cpu VARCHAR(100) NOT NULL,
    vm VARCHAR(100) DEFAULT 'N/A',
    created_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_server_type (server_type),
    INDEX idx_serial_number (serial_number),
    INDEX idx_server_brand (server_brand)
);

-- Switches table
CREATE TABLE IF NOT EXISTS switches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_number INT NOT NULL,
    switches_id VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    department ENUM('IT', 'HR', 'Finance', 'Operations', 'Security') NOT NULL,
    hostname VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL,
    plant ENUM('Plant 1', 'Plant 2', 'Plant 3') NOT NULL,
    device VARCHAR(255) NOT NULL,
    created_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_switches_id (switches_id),
    INDEX idx_department (department),
    INDEX idx_plant (plant)
);

-- CCTV table
CREATE TABLE IF NOT EXISTS cctv (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_number INT NOT NULL,
    cctv_id VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    department ENUM('IT', 'HR', 'Finance', 'Operations', 'Security') NOT NULL,
    hostname VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL,
    plant ENUM('Plant 1', 'Plant 2', 'Plant 3') NOT NULL,
    device VARCHAR(255) NOT NULL,
    created_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_cctv_id (cctv_id),
    INDEX idx_department (department),
    INDEX idx_plant (plant)
);

-- Printers table
CREATE TABLE IF NOT EXISTS printers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_number INT NOT NULL,
    printer_id VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    department ENUM('IT', 'HR', 'Finance', 'Operations', 'Security') NOT NULL,
    hostname VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL,
    plant ENUM('Plant 1', 'Plant 2', 'Plant 3') NOT NULL,
    device VARCHAR(255) NOT NULL,
    created_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_printer_id (printer_id),
    INDEX idx_department (department),
    INDEX idx_plant (plant)
);

-- Plant master table
CREATE TABLE IF NOT EXISTS plants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plant_name VARCHAR(100) NOT NULL UNIQUE,
    plant_code VARCHAR(10) NOT NULL UNIQUE,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Department master table
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE,
    department_code VARCHAR(10) NOT NULL UNIQUE,
    head_of_department VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activity logs table for tracking changes
CREATE TABLE IF NOT EXISTS activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    action ENUM('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT') NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id INT,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_table_name (table_name),
    INDEX idx_created_at (created_at)
);

-- Insert default users
INSERT INTO users (username, password, user_type, role) VALUES
('admin', 'admin123', 'admin', 'admin'),
('deepak', 'deepak123', 'deepak', 'user'),
('shivaji', 'shivaji123', 'shivaji', 'user')
ON DUPLICATE KEY UPDATE 
    password = VALUES(password),
    user_type = VALUES(user_type),
    role = VALUES(role);

-- Insert default plants
INSERT INTO plants (plant_name, plant_code, location) VALUES
('Plant 1', 'P1', 'Location A'),
('Plant 2', 'P2', 'Location B'),
('Plant 3', 'P3', 'Location C')
ON DUPLICATE KEY UPDATE 
    location = VALUES(location);

-- Insert default departments
INSERT INTO departments (department_name, department_code, head_of_department) VALUES
('Information Technology', 'IT', 'IT Manager'),
('Human Resources', 'HR', 'HR Manager'),
('Finance', 'FIN', 'Finance Manager'),
('Operations', 'OPS', 'Operations Manager'),
('Security', 'SEC', 'Security Manager')
ON DUPLICATE KEY UPDATE 
    head_of_department = VALUES(head_of_department);

-- Create views for reporting
CREATE OR REPLACE VIEW assets_summary AS
SELECT 
    department,
    COUNT(*) as total_assets,
    COUNT(DISTINCT device) as unique_devices
FROM assets 
GROUP BY department;

CREATE OR REPLACE VIEW software_summary AS
SELECT 
    department,
    COUNT(*) as total_licenses,
    SUM(CASE WHEN ms_office = 'Yes' THEN 1 ELSE 0 END) as ms_office_count,
    SUM(CASE WHEN autocad = 'Yes' THEN 1 ELSE 0 END) as autocad_count,
    SUM(CASE WHEN cero = 'Yes' THEN 1 ELSE 0 END) as cero_count
FROM software_licenses 
GROUP BY department;

CREATE OR REPLACE VIEW servers_summary AS
SELECT 
    server_type,
    COUNT(*) as total_servers,
    COUNT(DISTINCT server_brand) as unique_brands
FROM servers 
GROUP BY server_type;

CREATE OR REPLACE VIEW infrastructure_by_plant AS
SELECT 
    s.plant,
    COUNT(DISTINCT s.id) as switches_count,
    COUNT(DISTINCT c.id) as cctv_count,
    COUNT(DISTINCT p.id) as printers_count
FROM switches s
LEFT JOIN cctv c ON s.plant = c.plant
LEFT JOIN printers p ON s.plant = p.plant
GROUP BY s.plant;

-- Stored procedures for common operations

-- Procedure to get asset details by department
DELIMITER //
CREATE PROCEDURE GetAssetsByDepartment(IN dept VARCHAR(50))
BEGIN
    SELECT * FROM assets WHERE department = dept ORDER BY sr_number;
END //
DELIMITER ;

-- Procedure to get user activity summary
DELIMITER //
CREATE PROCEDURE GetUserActivitySummary(IN username VARCHAR(50), IN days INT)
BEGIN
    SELECT 
        action,
        table_name,
        COUNT(*) as action_count,
        MAX(created_at) as last_action
    FROM activity_logs 
    WHERE user_id = username 
        AND created_at >= DATE_SUB(NOW(), INTERVAL days DAY)
    GROUP BY action, table_name
    ORDER BY last_action DESC;
END //
DELIMITER ;

-- Function to generate next serial number
DELIMITER //
CREATE FUNCTION GetNextSerialNumber(table_prefix VARCHAR(10)) 
RETURNS INT
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE next_sr INT DEFAULT 1;
    
    CASE table_prefix
        WHEN 'ASSET' THEN
            SELECT COALESCE(MAX(sr_number), 0) + 1 INTO next_sr FROM assets;
        WHEN 'SOFTWARE' THEN
            SELECT COALESCE(MAX(sr_number), 0) + 1 INTO next_sr FROM software_licenses;
        WHEN 'SERVER' THEN
            SELECT COALESCE(MAX(sr_number), 0) + 1 INTO next_sr FROM servers;
        WHEN 'SWITCH' THEN
            SELECT COALESCE(MAX(sr_number), 0) + 1 INTO next_sr FROM switches;
        WHEN 'CCTV' THEN
            SELECT COALESCE(MAX(sr_number), 0) + 1 INTO next_sr FROM cctv;
        WHEN 'PRINTER' THEN
            SELECT COALESCE(MAX(sr_number), 0) + 1 INTO next_sr FROM printers;
    END CASE;
    
    RETURN next_sr;
END //
DELIMITER ;

-- Triggers for activity logging
DELIMITER //
CREATE TRIGGER assets_insert_log AFTER INSERT ON assets
FOR EACH ROW
BEGIN
    INSERT INTO activity_logs (user_id, action, table_name, record_id, new_values)
    VALUES (NEW.created_by, 'CREATE', 'assets', NEW.id, JSON_OBJECT(
        'sr_number', NEW.sr_number,
        'asset_number', NEW.asset_number,
        'name', NEW.name,
        'department', NEW.department,
        'hostname', NEW.hostname,
        'username', NEW.username,
        'serial_number', NEW.serial_number,
        'device', NEW.device
    ));
END //

CREATE TRIGGER assets_update_log AFTER UPDATE ON assets
FOR EACH ROW
BEGIN
    INSERT INTO activity_logs (user_id, action, table_name, record_id, old_values, new_values)
    VALUES (NEW.created_by, 'UPDATE', 'assets', NEW.id, 
        JSON_OBJECT(
            'sr_number', OLD.sr_number,
            'asset_number', OLD.asset_number,
            'name', OLD.name,
            'department', OLD.department,
            'hostname', OLD.hostname,
            'username', OLD.username,
            'serial_number', OLD.serial_number,
            'device', OLD.device
        ),
        JSON_OBJECT(
            'sr_number', NEW.sr_number,
            'asset_number', NEW.asset_number,
            'name', NEW.name,
            'department', NEW.department,
            'hostname', NEW.hostname,
            'username', NEW.username,
            'serial_number', NEW.serial_number,
            'device', NEW.device
        )
    );
END //

CREATE TRIGGER assets_delete_log AFTER DELETE ON assets
FOR EACH ROW
BEGIN
    INSERT INTO activity_logs (user_id, action, table_name, record_id, old_values)
    VALUES (OLD.created_by, 'DELETE', 'assets', OLD.id, JSON_OBJECT(
        'sr_number', OLD.sr_number,
        'asset_number', OLD.asset_number,
        'name', OLD.name,
        'department', OLD.department,
        'hostname', OLD.hostname,
        'username', OLD.username,
        'serial_number', OLD.serial_number,
        'device', OLD.device
    ));
END //
DELIMITER ;

-- Grant permissions (adjust as needed for your environment)
-- CREATE USER 'acgl_user'@'localhost' IDENTIFIED BY 'secure_password';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON acgl_management_system.* TO 'acgl_user'@'localhost';
-- FLUSH PRIVILEGES;

-- Add some sample data for testing
INSERT INTO assets (sr_number, asset_number, name, department, hostname, username, serial_number, device, created_by) VALUES
(1, 'ASSET001', 'Dell Laptop', 'IT', 'IT-LAPTOP-001', 'john.doe', 'DL123456', 'Laptop', 'admin'),
(2, 'ASSET002', 'HP Printer', 'HR', 'HR-PRINTER-001', 'jane.smith', 'HP789012', 'Printer', 'admin'),
(3, 'ASSET003', 'Network Switch', 'IT', 'IT-SWITCH-001', 'tech.admin', 'NS345678', 'Switch', 'admin');

INSERT INTO software_licenses (sr_number, software_key, name, department, hostname, username, ms_office, autocad, cero, device, created_by) VALUES
(1, 'MS-OFFICE-2023-001', 'Microsoft Office 2023', 'IT', 'IT-LAPTOP-001', 'john.doe', 'Yes', 'No', 'No', 'Laptop', 'admin'),
(2, 'AUTOCAD-2023-001', 'AutoCAD 2023', 'Operations', 'OPS-WORKSTATION-001', 'design.user', 'Yes', 'Yes', 'No', 'Workstation', 'admin');

INSERT INTO servers (sr_number, server_type, server_brand, serial_number, model_number, hard_disk, total_ram, total_cpu, vm, created_by) VALUES
(1, 'SAP', 'Dell PowerEdge', 'PE123456', 'R740', '2TB SSD', '64GB', '16 Cores', 'N/A', 'admin'),
(2, 'Non-SAP', 'HP ProLiant', 'PL789012', 'DL380', '1TB SSD', '32GB', '8 Cores', 'VMware vSphere', 'admin');

-- Show table structure for verification
SHOW TABLES;
DESCRIBE users;
DESCRIBE assets;
DESCRIBE software_licenses;
DESCRIBE servers;