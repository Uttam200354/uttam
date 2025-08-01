-- IT Asset Management System Database Schema
-- MySQL Database Creation Script

-- Create Database
CREATE DATABASE IF NOT EXISTS it_asset_management;
USE it_asset_management;

-- Users Table for Authentication
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'deepak', 'shivaji') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Plants Table
CREATE TABLE plants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plant_name VARCHAR(100) NOT NULL,
    location VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Departments Table
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Assets Details Table
CREATE TABLE assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_number VARCHAR(50) NOT NULL,
    assets_number VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    department VARCHAR(100) NOT NULL,
    hostname VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    serial_number VARCHAR(100) NOT NULL,
    device VARCHAR(100) NOT NULL,
    plant_id INT,
    department_id INT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_assets_number (assets_number),
    INDEX idx_hostname (hostname),
    INDEX idx_department (department)
);

-- Software License Details Table
CREATE TABLE software_licenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_number VARCHAR(50) NOT NULL,
    software_key VARCHAR(200) NOT NULL,
    name VARCHAR(200) NOT NULL,
    department VARCHAR(100) NOT NULL,
    hostname VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    ms_office ENUM('Yes', 'No') DEFAULT 'No',
    autocad ENUM('Yes', 'No') DEFAULT 'No',
    cero ENUM('Yes', 'No') DEFAULT 'No',
    device VARCHAR(100) NOT NULL,
    license_expiry_date DATE,
    purchase_date DATE,
    cost DECIMAL(10,2),
    vendor VARCHAR(100),
    plant_id INT,
    department_id INT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_software_key (software_key),
    INDEX idx_hostname_sw (hostname),
    INDEX idx_department_sw (department)
);

-- SAP Servers Table
CREATE TABLE sap_servers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_number VARCHAR(50) NOT NULL,
    server_brand VARCHAR(100) NOT NULL,
    serial_number VARCHAR(100) NOT NULL,
    model_number VARCHAR(100) NOT NULL,
    hard_disk VARCHAR(100) NOT NULL,
    total_ram VARCHAR(100) NOT NULL,
    total_cpu VARCHAR(100) NOT NULL,
    ip_address VARCHAR(45),
    server_location VARCHAR(200),
    purpose TEXT,
    os_version VARCHAR(100),
    sap_version VARCHAR(50),
    plant_id INT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_serial_sap (serial_number),
    INDEX idx_model_sap (model_number)
);

-- Non-SAP Servers Table
CREATE TABLE non_sap_servers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_number VARCHAR(50) NOT NULL,
    server_brand VARCHAR(100) NOT NULL,
    serial_number VARCHAR(100) NOT NULL,
    model_number VARCHAR(100) NOT NULL,
    hard_disk VARCHAR(100) NOT NULL,
    total_ram VARCHAR(100) NOT NULL,
    total_cpu VARCHAR(100) NOT NULL,
    vm VARCHAR(100) NOT NULL,
    ip_address VARCHAR(45),
    server_location VARCHAR(200),
    purpose TEXT,
    os_version VARCHAR(100),
    plant_id INT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_serial_nonsap (serial_number),
    INDEX idx_model_nonsap (model_number)
);

-- Switches Details Table
CREATE TABLE switches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_number VARCHAR(50) NOT NULL,
    switches_id VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    department VARCHAR(100) NOT NULL,
    hostname VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    plant VARCHAR(100) NOT NULL,
    device VARCHAR(100) NOT NULL,
    ip_address VARCHAR(45),
    mac_address VARCHAR(17),
    switch_model VARCHAR(100),
    port_count INT,
    location VARCHAR(200),
    plant_id INT,
    department_id INT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_switches_id (switches_id),
    INDEX idx_hostname_sw (hostname),
    INDEX idx_plant_sw (plant)
);

-- CCTV Details Table
CREATE TABLE cctv (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_number VARCHAR(50) NOT NULL,
    cctv_id VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    department VARCHAR(100) NOT NULL,
    hostname VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    plant VARCHAR(100) NOT NULL,
    device VARCHAR(100) NOT NULL,
    ip_address VARCHAR(45),
    camera_type VARCHAR(100),
    resolution VARCHAR(50),
    location VARCHAR(200),
    installation_date DATE,
    warranty_expiry DATE,
    plant_id INT,
    department_id INT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_cctv_id (cctv_id),
    INDEX idx_hostname_cctv (hostname),
    INDEX idx_plant_cctv (plant)
);

-- Printers Details Table
CREATE TABLE printers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_number VARCHAR(50) NOT NULL,
    printer_id VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    department VARCHAR(100) NOT NULL,
    hostname VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    plant VARCHAR(100) NOT NULL,
    device VARCHAR(100) NOT NULL,
    ip_address VARCHAR(45),
    printer_model VARCHAR(100),
    printer_type ENUM('Laser', 'Inkjet', 'Dot Matrix', 'Thermal', 'Other') DEFAULT 'Laser',
    location VARCHAR(200),
    installation_date DATE,
    warranty_expiry DATE,
    toner_cartridge VARCHAR(100),
    monthly_page_count INT DEFAULT 0,
    plant_id INT,
    department_id INT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_printer_id (printer_id),
    INDEX idx_hostname_printer (hostname),
    INDEX idx_plant_printer (plant)
);

-- Audit Log Table for tracking changes
CREATE TABLE audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    record_id INT NOT NULL,
    action ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    old_values JSON,
    new_values JSON,
    user_id INT,
    action_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_table_record (table_name, record_id),
    INDEX idx_timestamp (action_timestamp)
);

-- Insert Default Data

-- Insert Default Users
INSERT INTO users (username, full_name, role) VALUES
('admin', 'System Administrator', 'admin'),
('deepak', 'Deepak Kumar', 'deepak'),
('shivaji', 'Shivaji Rao', 'shivaji');

-- Insert Default Plants
INSERT INTO plants (plant_name, location) VALUES
('Plant 1', 'Manufacturing Unit - North'),
('Plant 2', 'Manufacturing Unit - South'),
('Plant 3', 'Manufacturing Unit - East');

-- Insert Default Departments
INSERT INTO departments (department_name, description) VALUES
('IT Department', 'Information Technology Department'),
('HR Department', 'Human Resources Department'),
('Finance Department', 'Finance and Accounts Department'),
('Production', 'Production Department'),
('Quality Control', 'Quality Control Department'),
('Maintenance', 'Maintenance Department');

-- Insert Sample Assets Data
INSERT INTO assets (sr_number, assets_number, name, department, hostname, username, serial_number, device, plant_id, department_id, created_by) VALUES
('A001', 'AST001', 'Dell Laptop Inspiron 15', 'IT Department', 'DELL-001', 'john.doe', 'DL12345', 'Laptop', 1, 1, 1),
('A002', 'AST002', 'HP Desktop Pro', 'Finance Department', 'HP-002', 'jane.smith', 'HP67890', 'Desktop', 1, 3, 1),
('A003', 'AST003', 'Lenovo ThinkPad', 'HR Department', 'LEN-003', 'bob.wilson', 'LN54321', 'Laptop', 2, 2, 1);

-- Insert Sample Software License Data
INSERT INTO software_licenses (sr_number, software_key, name, department, hostname, username, ms_office, autocad, cero, device, plant_id, department_id, created_by) VALUES
('S001', 'SW12345-OFFICE', 'Microsoft Office 365', 'IT Department', 'DELL-001', 'john.doe', 'Yes', 'No', 'No', 'Laptop', 1, 1, 1),
('S002', 'SW67890-CAD', 'AutoCAD 2023', 'Production', 'HP-002', 'jane.smith', 'Yes', 'Yes', 'No', 'Desktop', 1, 4, 1),
('S003', 'SW54321-CERO', 'Cero Parametric 8.0', 'Production', 'LEN-003', 'bob.wilson', 'No', 'No', 'Yes', 'Laptop', 2, 4, 1);

-- Insert Sample SAP Server Data
INSERT INTO sap_servers (sr_number, server_brand, serial_number, model_number, hard_disk, total_ram, total_cpu, ip_address, server_location, sap_version, plant_id, created_by) VALUES
('SAP001', 'Dell PowerEdge', 'DEL-SVR-001', 'R740', '2TB SSD', '64GB', '16 Core Xeon', '192.168.1.100', 'Server Room A', 'SAP ECC 6.0', 1, 1),
('SAP002', 'HP ProLiant', 'HP-SVR-002', 'DL380', '4TB HDD', '128GB', '20 Core Xeon', '192.168.1.101', 'Server Room B', 'SAP S/4HANA', 2, 1);

-- Insert Sample Non-SAP Server Data
INSERT INTO non_sap_servers (sr_number, server_brand, serial_number, model_number, hard_disk, total_ram, total_cpu, vm, ip_address, server_location, plant_id, created_by) VALUES
('NSAP001', 'IBM System x', 'IBM-SVR-001', 'x3650 M5', '1TB SSD', '32GB', '8 Core Xeon', 'VMware vSphere', '192.168.1.200', 'Server Room A', 1, 1),
('NSAP002', 'Lenovo ThinkServer', 'LEN-SVR-002', 'RD650', '2TB HDD', '64GB', '12 Core Xeon', 'Hyper-V', '192.168.1.201', 'Server Room C', 3, 1);

-- Insert Sample Switches Data
INSERT INTO switches (sr_number, switches_id, name, department, hostname, username, plant, device, ip_address, switch_model, port_count, location, plant_id, department_id, created_by) VALUES
('SW001', 'CISCO-SW-001', 'Cisco Catalyst 2960', 'IT Department', 'CISCO-001', 'admin', 'Plant 1', 'Network Switch', '192.168.1.10', 'Catalyst 2960-24TC', 24, 'Network Room 1', 1, 1, 1),
('SW002', 'HP-SW-002', 'HP ProCurve 2824', 'IT Department', 'HP-SW-002', 'admin', 'Plant 2', 'Network Switch', '192.168.2.10', 'ProCurve 2824', 24, 'Network Room 2', 2, 1, 1);

-- Insert Sample CCTV Data
INSERT INTO cctv (sr_number, cctv_id, name, department, hostname, username, plant, device, ip_address, camera_type, resolution, location, plant_id, department_id, created_by) VALUES
('CC001', 'HIKVISION-001', 'Hikvision DS-2CD2143G0', 'Security', 'CAM-001', 'security', 'Plant 1', 'IP Camera', '192.168.1.50', 'Dome Camera', '4MP', 'Main Entrance', 1, 1, 1),
('CC002', 'DAHUA-002', 'Dahua IPC-HDBW4431R', 'Security', 'CAM-002', 'security', 'Plant 2', 'IP Camera', '192.168.2.50', 'Bullet Camera', '4MP', 'Parking Area', 2, 1, 1);

-- Insert Sample Printer Data
INSERT INTO printers (sr_number, printer_id, name, department, hostname, username, plant, device, ip_address, printer_model, printer_type, location, plant_id, department_id, created_by) VALUES
('PR001', 'HP-LASER-001', 'HP LaserJet Pro M404dn', 'IT Department', 'HP-PR-001', 'print_admin', 'Plant 1', 'Network Printer', '192.168.1.30', 'LaserJet Pro M404dn', 'Laser', 'IT Office Floor 1', 1, 1, 1),
('PR002', 'CANON-INK-002', 'Canon PIXMA G6020', 'HR Department', 'CANON-PR-002', 'hr_admin', 'Plant 2', 'Network Printer', '192.168.2.30', 'PIXMA G6020', 'Inkjet', 'HR Office Floor 2', 2, 2, 1);

-- Create Views for Reporting

-- Assets Summary View
CREATE VIEW assets_summary AS
SELECT 
    a.id,
    a.sr_number,
    a.assets_number,
    a.name,
    a.hostname,
    a.device,
    p.plant_name,
    d.department_name,
    u.full_name as created_by_name,
    a.created_at
FROM assets a
LEFT JOIN plants p ON a.plant_id = p.id
LEFT JOIN departments d ON a.department_id = d.id
LEFT JOIN users u ON a.created_by = u.id;

-- Software Licenses Summary View
CREATE VIEW software_summary AS
SELECT 
    s.id,
    s.sr_number,
    s.software_key,
    s.name,
    s.hostname,
    s.ms_office,
    s.autocad,
    s.cero,
    p.plant_name,
    d.department_name,
    u.full_name as created_by_name,
    s.created_at
FROM software_licenses s
LEFT JOIN plants p ON s.plant_id = p.id
LEFT JOIN departments d ON s.department_id = d.id
LEFT JOIN users u ON s.created_by = u.id;

-- Create Stored Procedures

DELIMITER //

-- Procedure to get asset count by department
CREATE PROCEDURE GetAssetCountByDepartment()
BEGIN
    SELECT 
        d.department_name,
        COUNT(a.id) as asset_count
    FROM departments d
    LEFT JOIN assets a ON d.id = a.department_id
    GROUP BY d.id, d.department_name
    ORDER BY asset_count DESC;
END //

-- Procedure to get software license expiry report
CREATE PROCEDURE GetSoftwareLicenseExpiryReport(IN days_ahead INT)
BEGIN
    SELECT 
        sl.name,
        sl.software_key,
        sl.license_expiry_date,
        DATEDIFF(sl.license_expiry_date, CURDATE()) as days_until_expiry,
        p.plant_name,
        d.department_name
    FROM software_licenses sl
    LEFT JOIN plants p ON sl.plant_id = p.id
    LEFT JOIN departments d ON sl.department_id = d.id
    WHERE sl.license_expiry_date IS NOT NULL 
    AND sl.license_expiry_date <= DATE_ADD(CURDATE(), INTERVAL days_ahead DAY)
    ORDER BY sl.license_expiry_date ASC;
END //

DELIMITER ;

-- Create Triggers for Audit Logging

DELIMITER //

-- Trigger for Assets table
CREATE TRIGGER assets_audit_insert AFTER INSERT ON assets
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (table_name, record_id, action, new_values, user_id)
    VALUES ('assets', NEW.id, 'INSERT', JSON_OBJECT(
        'sr_number', NEW.sr_number,
        'assets_number', NEW.assets_number,
        'name', NEW.name,
        'department', NEW.department,
        'hostname', NEW.hostname,
        'username', NEW.username,
        'serial_number', NEW.serial_number,
        'device', NEW.device
    ), NEW.created_by);
END //

CREATE TRIGGER assets_audit_update AFTER UPDATE ON assets
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (table_name, record_id, action, old_values, new_values, user_id)
    VALUES ('assets', NEW.id, 'UPDATE', 
        JSON_OBJECT(
            'sr_number', OLD.sr_number,
            'assets_number', OLD.assets_number,
            'name', OLD.name,
            'department', OLD.department,
            'hostname', OLD.hostname,
            'username', OLD.username,
            'serial_number', OLD.serial_number,
            'device', OLD.device
        ),
        JSON_OBJECT(
            'sr_number', NEW.sr_number,
            'assets_number', NEW.assets_number,
            'name', NEW.name,
            'department', NEW.department,
            'hostname', NEW.hostname,
            'username', NEW.username,
            'serial_number', NEW.serial_number,
            'device', NEW.device
        ), NEW.created_by);
END //

CREATE TRIGGER assets_audit_delete AFTER DELETE ON assets
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (table_name, record_id, action, old_values)
    VALUES ('assets', OLD.id, 'DELETE', JSON_OBJECT(
        'sr_number', OLD.sr_number,
        'assets_number', OLD.assets_number,
        'name', OLD.name,
        'department', OLD.department,
        'hostname', OLD.hostname,
        'username', OLD.username,
        'serial_number', OLD.serial_number,
        'device', OLD.device
    ));
END //

DELIMITER ;

-- Grant appropriate permissions (adjust as needed for your setup)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON it_asset_management.* TO 'it_admin'@'localhost';
-- GRANT SELECT, INSERT, UPDATE ON it_asset_management.* TO 'it_user'@'localhost';
-- GRANT SELECT ON it_asset_management.* TO 'it_readonly'@'localhost';

-- Optimize tables
OPTIMIZE TABLE assets, software_licenses, sap_servers, non_sap_servers, switches, cctv, printers;

-- Show database structure
SHOW TABLES;

-- Display table information
SELECT 
    TABLE_NAME,
    TABLE_ROWS,
    DATA_LENGTH,
    INDEX_LENGTH,
    CREATE_TIME
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'it_asset_management'
ORDER BY TABLE_NAME;