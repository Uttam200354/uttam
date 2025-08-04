-- ACGL Management System Database Schema
-- Created for comprehensive asset and infrastructure management

-- Create database
CREATE DATABASE IF NOT EXISTS acgl_management_system;
USE acgl_management_system;

-- Users table for authentication
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type ENUM('admin', 'deepak', 'shivaji') NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Plants table
CREATE TABLE plants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plant_code VARCHAR(20) UNIQUE NOT NULL,
    plant_name VARCHAR(100) NOT NULL,
    location VARCHAR(200),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Departments table
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_code VARCHAR(20) UNIQUE NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    plant_id INT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE SET NULL
);

-- Assets table
CREATE TABLE assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_no INT AUTO_INCREMENT,
    asset_number VARCHAR(50) UNIQUE NOT NULL,
    asset_name VARCHAR(100) NOT NULL,
    department_id INT,
    plant_id INT,
    hostname VARCHAR(100),
    username VARCHAR(50),
    serial_number VARCHAR(100),
    device_type VARCHAR(50),
    status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active',
    purchase_date DATE,
    warranty_expiry DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Software licenses table
CREATE TABLE software_licenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_no INT AUTO_INCREMENT,
    software_key VARCHAR(255) UNIQUE NOT NULL,
    software_name VARCHAR(100) NOT NULL,
    department_id INT,
    plant_id INT,
    hostname VARCHAR(100),
    username VARCHAR(50),
    ms_office BOOLEAN DEFAULT FALSE,
    autocad BOOLEAN DEFAULT FALSE,
    creo BOOLEAN DEFAULT FALSE,
    device_type VARCHAR(50),
    license_type ENUM('perpetual', 'subscription', 'trial') DEFAULT 'perpetual',
    purchase_date DATE,
    expiry_date DATE,
    max_users INT DEFAULT 1,
    current_users INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- SAP servers table
CREATE TABLE sap_servers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_no INT AUTO_INCREMENT,
    server_brand VARCHAR(50),
    serial_number VARCHAR(100) UNIQUE,
    model_number VARCHAR(100),
    hard_disk_capacity VARCHAR(50),
    total_ram VARCHAR(50),
    total_cpu VARCHAR(50),
    operating_system VARCHAR(100),
    sap_version VARCHAR(50),
    plant_id INT,
    department_id INT,
    status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active',
    installation_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Non-SAP servers table
CREATE TABLE non_sap_servers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_no INT AUTO_INCREMENT,
    server_brand VARCHAR(50),
    serial_number VARCHAR(100) UNIQUE,
    model_number VARCHAR(100),
    hard_disk_capacity VARCHAR(50),
    total_ram VARCHAR(50),
    total_cpu VARCHAR(50),
    vm_count INT DEFAULT 0,
    operating_system VARCHAR(100),
    server_purpose VARCHAR(200),
    plant_id INT,
    department_id INT,
    status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active',
    installation_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Network switches table
CREATE TABLE network_switches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_no INT AUTO_INCREMENT,
    switch_id VARCHAR(50) UNIQUE NOT NULL,
    switch_name VARCHAR(100),
    department_id INT,
    plant_id INT,
    hostname VARCHAR(100),
    username VARCHAR(50),
    switch_brand VARCHAR(50),
    model_number VARCHAR(100),
    port_count INT,
    switch_type ENUM('managed', 'unmanaged', 'smart') DEFAULT 'managed',
    location VARCHAR(200),
    status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active',
    installation_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- CCTV cameras table
CREATE TABLE cctv_cameras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_no INT AUTO_INCREMENT,
    camera_id VARCHAR(50) UNIQUE NOT NULL,
    camera_name VARCHAR(100),
    department_id INT,
    plant_id INT,
    hostname VARCHAR(100),
    username VARCHAR(50),
    camera_brand VARCHAR(50),
    model_number VARCHAR(100),
    resolution VARCHAR(20),
    camera_type ENUM('dome', 'bullet', 'ptz', 'fisheye') DEFAULT 'dome',
    location VARCHAR(200),
    recording_enabled BOOLEAN DEFAULT TRUE,
    night_vision BOOLEAN DEFAULT FALSE,
    motion_detection BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active',
    installation_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Printers table
CREATE TABLE printers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_no INT AUTO_INCREMENT,
    printer_id VARCHAR(50) UNIQUE NOT NULL,
    printer_name VARCHAR(100),
    department_id INT,
    plant_id INT,
    hostname VARCHAR(100),
    username VARCHAR(50),
    printer_brand VARCHAR(50),
    model_number VARCHAR(100),
    printer_type ENUM('inkjet', 'laser', 'dot_matrix', 'thermal') DEFAULT 'laser',
    connection_type ENUM('usb', 'network', 'wireless') DEFAULT 'network',
    color_support BOOLEAN DEFAULT FALSE,
    duplex_support BOOLEAN DEFAULT FALSE,
    location VARCHAR(200),
    status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active',
    installation_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Plant assets table for detailed plant-specific asset tracking
CREATE TABLE plant_assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_no INT AUTO_INCREMENT,
    plant_id INT NOT NULL,
    asset_name VARCHAR(100) NOT NULL,
    employee_name VARCHAR(100),
    department_id INT,
    username VARCHAR(50),
    serial_number VARCHAR(100),
    device_type VARCHAR(50),
    hostname VARCHAR(100),
    last_name VARCHAR(100), -- Additional field as per requirements
    asset_category VARCHAR(50),
    status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Audit log table for tracking all changes
CREATE TABLE audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    record_id INT NOT NULL,
    action ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    old_values JSON,
    new_values JSON,
    changed_by INT,
    change_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Insert default users
INSERT INTO users (username, password, user_type, full_name, email) VALUES
('admin123', 'admin@123', 'admin', 'System Administrator', 'admin@acgl.com'),
('deepak456', 'deepak@456', 'deepak', 'Deepak Kumar', 'deepak@acgl.com'),
('shivaji789', 'shivaji@789', 'shivaji', 'Shivaji Patil', 'shivaji@acgl.com');

-- Insert default plants
INSERT INTO plants (plant_code, plant_name, location, description) VALUES
('PLT001', 'Plant 1', 'Industrial Area Phase 1', 'Main manufacturing plant'),
('PLT002', 'Plant 2', 'Industrial Area Phase 2', 'Secondary manufacturing plant'),
('PLT003', 'Dharwad', 'Dharwad, Karnataka', 'Regional office and small manufacturing unit'),
('PLT004', 'Jejuri', 'Jejuri, Maharashtra', 'Quality control and testing facility');

-- Insert default departments
INSERT INTO departments (department_code, department_name, plant_id, description) VALUES
('IT001', 'IT Department', 1, 'Information Technology'),
('HR001', 'HR Department', 1, 'Human Resources'),
('FIN001', 'Finance Department', 1, 'Finance and Accounting'),
('OPS001', 'Operations', 2, 'Manufacturing Operations'),
('MAINT001', 'Maintenance', 2, 'Equipment Maintenance'),
('QC001', 'Quality Control', 4, 'Quality Assurance and Testing');

-- Create indexes for better performance
CREATE INDEX idx_assets_asset_number ON assets(asset_number);
CREATE INDEX idx_assets_department ON assets(department_id);
CREATE INDEX idx_assets_plant ON assets(plant_id);
CREATE INDEX idx_software_licenses_software_key ON software_licenses(software_key);
CREATE INDEX idx_software_licenses_department ON software_licenses(department_id);
CREATE INDEX idx_sap_servers_serial ON sap_servers(serial_number);
CREATE INDEX idx_non_sap_servers_serial ON non_sap_servers(serial_number);
CREATE INDEX idx_switches_switch_id ON network_switches(switch_id);
CREATE INDEX idx_cctv_camera_id ON cctv_cameras(camera_id);
CREATE INDEX idx_printers_printer_id ON printers(printer_id);
CREATE INDEX idx_plant_assets_plant ON plant_assets(plant_id);
CREATE INDEX idx_audit_log_table_record ON audit_log(table_name, record_id);
CREATE INDEX idx_audit_log_timestamp ON audit_log(change_timestamp);

-- Create views for easy reporting
CREATE VIEW asset_summary AS
SELECT 
    p.plant_name,
    d.department_name,
    COUNT(a.id) as total_assets,
    COUNT(CASE WHEN a.status = 'active' THEN 1 END) as active_assets,
    COUNT(CASE WHEN a.status = 'inactive' THEN 1 END) as inactive_assets,
    COUNT(CASE WHEN a.status = 'maintenance' THEN 1 END) as maintenance_assets
FROM plants p
LEFT JOIN departments d ON p.id = d.plant_id
LEFT JOIN assets a ON d.id = a.department_id
GROUP BY p.id, d.id;

CREATE VIEW software_license_summary AS
SELECT 
    p.plant_name,
    d.department_name,
    COUNT(sl.id) as total_licenses,
    COUNT(CASE WHEN sl.license_type = 'perpetual' THEN 1 END) as perpetual_licenses,
    COUNT(CASE WHEN sl.license_type = 'subscription' THEN 1 END) as subscription_licenses,
    COUNT(CASE WHEN sl.expiry_date < CURDATE() THEN 1 END) as expired_licenses
FROM plants p
LEFT JOIN departments d ON p.id = d.plant_id
LEFT JOIN software_licenses sl ON d.id = sl.department_id
GROUP BY p.id, d.id;

CREATE VIEW infrastructure_summary AS
SELECT 
    p.plant_name,
    COUNT(DISTINCT ss.id) as sap_servers,
    COUNT(DISTINCT nss.id) as non_sap_servers,
    COUNT(DISTINCT ns.id) as network_switches,
    COUNT(DISTINCT cc.id) as cctv_cameras,
    COUNT(DISTINCT pr.id) as printers
FROM plants p
LEFT JOIN sap_servers ss ON p.id = ss.plant_id
LEFT JOIN non_sap_servers nss ON p.id = nss.plant_id
LEFT JOIN network_switches ns ON p.id = ns.plant_id
LEFT JOIN cctv_cameras cc ON p.id = cc.plant_id
LEFT JOIN printers pr ON p.id = pr.plant_id
GROUP BY p.id;