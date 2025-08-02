-- ACGL Management System Database Schema

CREATE DATABASE IF NOT EXISTS acgl_management;
USE acgl_management;

-- Users table for authentication
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'deepak', 'shivaji') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default users
INSERT INTO users (username, password, role) VALUES 
('admin', 'admin123', 'admin'),
('deepak', 'deepak123', 'deepak'),
('shivaji', 'shivaji123', 'shivaji');

-- Assets table
CREATE TABLE assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_number INT NOT NULL,
    assets_number VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    hostname VARCHAR(100),
    username VARCHAR(100),
    serial_number VARCHAR(100),
    device VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Software License table
CREATE TABLE software_licenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_number INT NOT NULL,
    software_key VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    hostname VARCHAR(100),
    username VARCHAR(100),
    ms_office BOOLEAN DEFAULT FALSE,
    autocad BOOLEAN DEFAULT FALSE,
    cero BOOLEAN DEFAULT FALSE,
    device VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- SAP Servers table
CREATE TABLE sap_servers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_number INT NOT NULL,
    server_brand VARCHAR(100) NOT NULL,
    serial_number VARCHAR(100) NOT NULL,
    model_number VARCHAR(100) NOT NULL,
    hard_disk VARCHAR(100),
    total_ram VARCHAR(100),
    total_cpu VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Non-SAP Servers table
CREATE TABLE non_sap_servers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_number INT NOT NULL,
    server_brand VARCHAR(100) NOT NULL,
    serial_number VARCHAR(100) NOT NULL,
    model_number VARCHAR(100) NOT NULL,
    hard_disk VARCHAR(100),
    total_ram VARCHAR(100),
    total_cpu VARCHAR(100),
    vm VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Switches table
CREATE TABLE switches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_number INT NOT NULL,
    switches_id VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    hostname VARCHAR(100),
    username VARCHAR(100),
    plant VARCHAR(100),
    device VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- CCTV table
CREATE TABLE cctv (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_number INT NOT NULL,
    switches_id VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    hostname VARCHAR(100),
    username VARCHAR(100),
    plant VARCHAR(100),
    device VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Printers table
CREATE TABLE printers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sr_number INT NOT NULL,
    switches_id VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    hostname VARCHAR(100),
    username VARCHAR(100),
    plant VARCHAR(100),
    device VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Plants table for dropdown options
CREATE TABLE plants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Departments table for dropdown options
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Insert sample plants and departments
INSERT INTO plants (name) VALUES ('Plant A'), ('Plant B'), ('Plant C');
INSERT INTO departments (name) VALUES ('IT Department'), ('HR Department'), ('Finance Department');