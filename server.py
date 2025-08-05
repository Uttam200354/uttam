#!/usr/bin/env python3
"""
ACGL Management System API Server
Flask-based REST API with MySQL database integration
"""

from flask import Flask, request, jsonify, session
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import json
import os
from datetime import datetime
import hashlib
import secrets

app = Flask(__name__)
app.secret_key = 'acgl_management_system_secret_key_2024'
CORS(app)

# Database configuration
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '',  # Set your MySQL password here
    'database': 'acgl_management_system',
    'charset': 'utf8mb4',
    'autocommit': True
}

def get_db_connection():
    """Create and return database connection"""
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

def hash_password(password):
    """Hash password using SHA-256"""
    return hashlib.sha256(password.encode()).hexdigest()

@app.route('/api/login', methods=['POST'])
def login():
    """User login endpoint"""
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        # Check user credentials
        query = "SELECT id, username, user_type, full_name FROM users WHERE username = %s AND password = %s AND is_active = 1"
        cursor.execute(query, (username, password))
        user = cursor.fetchone()
        
        cursor.close()
        connection.close()
        
        if user:
            session['user_id'] = user['id']
            session['user_type'] = user['user_type']
            session['username'] = user['username']
            
            return jsonify({
                'success': True,
                'user': {
                    'id': user['id'],
                    'username': user['username'],
                    'user_type': user['user_type'],
                    'full_name': user['full_name']
                }
            })
        else:
            return jsonify({'error': 'Invalid credentials'}), 401
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/logout', methods=['POST'])
def logout():
    """User logout endpoint"""
    session.clear()
    return jsonify({'success': True})

@app.route('/api/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    """Get dashboard statistics"""
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        # Get counts for different asset types
        stats = {}
        
        # Plants count
        cursor.execute("SELECT COUNT(*) as count FROM plants WHERE is_active = 1")
        stats['plants'] = cursor.fetchone()['count']
        
        # Assets count
        cursor.execute("SELECT COUNT(*) as count FROM assets WHERE is_active = 1")
        stats['assets'] = cursor.fetchone()['count']
        
        # Departments count
        cursor.execute("SELECT COUNT(*) as count FROM departments WHERE is_active = 1")
        stats['departments'] = cursor.fetchone()['count']
        
        # Software licenses count
        cursor.execute("SELECT COUNT(*) as count FROM software_licenses WHERE is_active = 1")
        stats['software_licenses'] = cursor.fetchone()['count']
        
        # SAP servers count
        cursor.execute("SELECT COUNT(*) as count FROM sap_servers WHERE is_active = 1")
        stats['sap_servers'] = cursor.fetchone()['count']
        
        # Non-SAP servers count
        cursor.execute("SELECT COUNT(*) as count FROM non_sap_servers WHERE is_active = 1")
        stats['non_sap_servers'] = cursor.fetchone()['count']
        
        # Switches count
        cursor.execute("SELECT COUNT(*) as count FROM network_switches WHERE is_active = 1")
        stats['switches'] = cursor.fetchone()['count']
        
        # CCTV count
        cursor.execute("SELECT COUNT(*) as count FROM cctv_cameras WHERE is_active = 1")
        stats['cctv'] = cursor.fetchone()['count']
        
        # Printers count
        cursor.execute("SELECT COUNT(*) as count FROM printers WHERE is_active = 1")
        stats['printers'] = cursor.fetchone()['count']
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'stats': stats})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/plants', methods=['GET'])
def get_plants():
    """Get all plants"""
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT id, name FROM plants WHERE is_active = 1 ORDER BY name")
        plants = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'plants': plants})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/departments', methods=['GET'])
def get_departments():
    """Get all departments"""
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT id, name FROM departments WHERE is_active = 1 ORDER BY name")
        departments = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'departments': departments})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Assets endpoints
@app.route('/api/assets', methods=['GET'])
def get_assets():
    """Get all assets"""
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT a.*, d.name as department_name, p.name as plant_name
            FROM assets a
            LEFT JOIN departments d ON a.department_id = d.id
            LEFT JOIN plants p ON a.plant_id = p.id
            WHERE a.is_active = 1
            ORDER BY a.sr_no
        """
        cursor.execute(query)
        assets = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'assets': assets})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/assets', methods=['POST'])
def create_asset():
    """Create a new asset"""
    try:
        data = request.get_json()
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        # Get the next sr_no
        cursor.execute("SELECT MAX(sr_no) as max_sr FROM assets")
        result = cursor.fetchone()
        next_sr_no = (result['max_sr'] or 0) + 1
        
        # Insert new asset
        query = """
            INSERT INTO assets (sr_no, asset_number, asset_name, department_id, plant_id, 
                              hostname, username, serial_number, device_type, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())
        """
        values = (
            next_sr_no,
            data.get('asset_number'),
            data.get('asset_name'),
            data.get('department_id'),
            data.get('plant_id'),
            data.get('hostname'),
            data.get('username'),
            data.get('serial_number'),
            data.get('device_type')
        )
        
        cursor.execute(query, values)
        connection.commit()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'message': 'Asset created successfully'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/assets/<int:asset_id>', methods=['PUT'])
def update_asset(asset_id):
    """Update an asset"""
    try:
        data = request.get_json()
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor()
        
        query = """
            UPDATE assets 
            SET asset_number = %s, asset_name = %s, department_id = %s, plant_id = %s,
                hostname = %s, username = %s, serial_number = %s, device_type = %s,
                updated_at = NOW()
            WHERE id = %s
        """
        values = (
            data.get('asset_number'),
            data.get('asset_name'),
            data.get('department_id'),
            data.get('plant_id'),
            data.get('hostname'),
            data.get('username'),
            data.get('serial_number'),
            data.get('device_type'),
            asset_id
        )
        
        cursor.execute(query, values)
        connection.commit()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'message': 'Asset updated successfully'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/assets/<int:asset_id>', methods=['DELETE'])
def delete_asset(asset_id):
    """Delete an asset (soft delete)"""
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor()
        
        query = "UPDATE assets SET is_active = 0, updated_at = NOW() WHERE id = %s"
        cursor.execute(query, (asset_id,))
        connection.commit()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'message': 'Asset deleted successfully'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Software Licenses endpoints
@app.route('/api/software-licenses', methods=['GET'])
def get_software_licenses():
    """Get all software licenses"""
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT sl.*, d.name as department_name
            FROM software_licenses sl
            LEFT JOIN departments d ON sl.department_id = d.id
            WHERE sl.is_active = 1
            ORDER BY sl.sr_no
        """
        cursor.execute(query)
        licenses = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'licenses': licenses})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/software-licenses', methods=['POST'])
def create_software_license():
    """Create a new software license"""
    try:
        data = request.get_json()
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        # Get the next sr_no
        cursor.execute("SELECT MAX(sr_no) as max_sr FROM software_licenses")
        result = cursor.fetchone()
        next_sr_no = (result['max_sr'] or 0) + 1
        
        # Insert new software license
        query = """
            INSERT INTO software_licenses (sr_no, software_key, name, department_id, 
                                         hostname, username, ms_office, autocad, cero, 
                                         device, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())
        """
        values = (
            next_sr_no,
            data.get('software_key'),
            data.get('name'),
            data.get('department_id'),
            data.get('hostname'),
            data.get('username'),
            data.get('ms_office'),
            data.get('autocad'),
            data.get('cero'),
            data.get('device')
        )
        
        cursor.execute(query, values)
        connection.commit()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'message': 'Software license created successfully'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# SAP Servers endpoints
@app.route('/api/servers/sap', methods=['GET'])
def get_sap_servers():
    """Get all SAP servers"""
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT * FROM sap_servers 
            WHERE is_active = 1 
            ORDER BY sr_no
        """
        cursor.execute(query)
        servers = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'servers': servers})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/servers/sap', methods=['POST'])
def create_sap_server():
    """Create a new SAP server"""
    try:
        data = request.get_json()
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        # Get the next sr_no
        cursor.execute("SELECT MAX(sr_no) as max_sr FROM sap_servers")
        result = cursor.fetchone()
        next_sr_no = (result['max_sr'] or 0) + 1
        
        # Insert new SAP server
        query = """
            INSERT INTO sap_servers (sr_no, server_brand, serial_number, model_number,
                                   hard_disk, total_ram, total_cpu, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, NOW())
        """
        values = (
            next_sr_no,
            data.get('server_brand'),
            data.get('serial_number'),
            data.get('model_number'),
            data.get('hard_disk'),
            data.get('total_ram'),
            data.get('total_cpu')
        )
        
        cursor.execute(query, values)
        connection.commit()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'message': 'SAP server created successfully'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Non-SAP Servers endpoints
@app.route('/api/servers/non-sap', methods=['GET'])
def get_non_sap_servers():
    """Get all non-SAP servers"""
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT * FROM non_sap_servers 
            WHERE is_active = 1 
            ORDER BY sr_no
        """
        cursor.execute(query)
        servers = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'servers': servers})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/servers/non-sap', methods=['POST'])
def create_non_sap_server():
    """Create a new non-SAP server"""
    try:
        data = request.get_json()
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        # Get the next sr_no
        cursor.execute("SELECT MAX(sr_no) as max_sr FROM non_sap_servers")
        result = cursor.fetchone()
        next_sr_no = (result['max_sr'] or 0) + 1
        
        # Insert new non-SAP server
        query = """
            INSERT INTO non_sap_servers (sr_no, server_brand, serial_number, model_number,
                                       hard_disk, total_ram, total_cpu, vm, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW())
        """
        values = (
            next_sr_no,
            data.get('server_brand'),
            data.get('serial_number'),
            data.get('model_number'),
            data.get('hard_disk'),
            data.get('total_ram'),
            data.get('total_cpu'),
            data.get('vm')
        )
        
        cursor.execute(query, values)
        connection.commit()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'message': 'Non-SAP server created successfully'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Switches endpoints
@app.route('/api/switches', methods=['GET'])
def get_switches():
    """Get all network switches"""
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT ns.*, d.name as department_name, p.name as plant_name
            FROM network_switches ns
            LEFT JOIN departments d ON ns.department_id = d.id
            LEFT JOIN plants p ON ns.plant_id = p.id
            WHERE ns.is_active = 1
            ORDER BY ns.sr_no
        """
        cursor.execute(query)
        switches = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'switches': switches})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/switches', methods=['POST'])
def create_switch():
    """Create a new network switch"""
    try:
        data = request.get_json()
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        # Get the next sr_no
        cursor.execute("SELECT MAX(sr_no) as max_sr FROM network_switches")
        result = cursor.fetchone()
        next_sr_no = (result['max_sr'] or 0) + 1
        
        # Insert new switch
        query = """
            INSERT INTO network_switches (sr_no, switch_id, name, department_id, 
                                        hostname, username, plant_id, device, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW())
        """
        values = (
            next_sr_no,
            data.get('switch_id'),
            data.get('name'),
            data.get('department_id'),
            data.get('hostname'),
            data.get('username'),
            data.get('plant_id'),
            data.get('device')
        )
        
        cursor.execute(query, values)
        connection.commit()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'message': 'Switch created successfully'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# CCTV endpoints
@app.route('/api/cctv', methods=['GET'])
def get_cctv():
    """Get all CCTV cameras"""
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT c.*, d.name as department_name, p.name as plant_name
            FROM cctv_cameras c
            LEFT JOIN departments d ON c.department_id = d.id
            LEFT JOIN plants p ON c.plant_id = p.id
            WHERE c.is_active = 1
            ORDER BY c.sr_no
        """
        cursor.execute(query)
        cameras = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'cameras': cameras})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/cctv', methods=['POST'])
def create_cctv():
    """Create a new CCTV camera"""
    try:
        data = request.get_json()
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        # Get the next sr_no
        cursor.execute("SELECT MAX(sr_no) as max_sr FROM cctv_cameras")
        result = cursor.fetchone()
        next_sr_no = (result['max_sr'] or 0) + 1
        
        # Insert new CCTV camera
        query = """
            INSERT INTO cctv_cameras (sr_no, camera_id, name, department_id, 
                                     hostname, username, plant_id, device, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW())
        """
        values = (
            next_sr_no,
            data.get('camera_id'),
            data.get('name'),
            data.get('department_id'),
            data.get('hostname'),
            data.get('username'),
            data.get('plant_id'),
            data.get('device')
        )
        
        cursor.execute(query, values)
        connection.commit()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'message': 'CCTV camera created successfully'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Printers endpoints
@app.route('/api/printers', methods=['GET'])
def get_printers():
    """Get all printers"""
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT p.*, d.name as department_name, pl.name as plant_name
            FROM printers p
            LEFT JOIN departments d ON p.department_id = d.id
            LEFT JOIN plants pl ON p.plant_id = pl.id
            WHERE p.is_active = 1
            ORDER BY p.sr_no
        """
        cursor.execute(query)
        printers = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'printers': printers})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/printers', methods=['POST'])
def create_printer():
    """Create a new printer"""
    try:
        data = request.get_json()
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        # Get the next sr_no
        cursor.execute("SELECT MAX(sr_no) as max_sr FROM printers")
        result = cursor.fetchone()
        next_sr_no = (result['max_sr'] or 0) + 1
        
        # Insert new printer
        query = """
            INSERT INTO printers (sr_no, printer_id, name, department_id, 
                                hostname, username, plant_id, device, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW())
        """
        values = (
            next_sr_no,
            data.get('printer_id'),
            data.get('name'),
            data.get('department_id'),
            data.get('hostname'),
            data.get('username'),
            data.get('plant_id'),
            data.get('device')
        )
        
        cursor.execute(query, values)
        connection.commit()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'message': 'Printer created successfully'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Plant Assets endpoints
@app.route('/api/plant-assets/<int:plant_id>', methods=['GET'])
def get_plant_assets(plant_id):
    """Get assets for a specific plant"""
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT pa.*, d.name as department_name, p.name as plant_name
            FROM plant_assets pa
            LEFT JOIN departments d ON pa.department_id = d.id
            LEFT JOIN plants p ON pa.plant_id = p.id
            WHERE pa.plant_id = %s AND pa.is_active = 1
            ORDER BY pa.sr_no
        """
        cursor.execute(query, (plant_id,))
        assets = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'assets': assets})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/plant-assets/<int:plant_id>', methods=['POST'])
def create_plant_asset(plant_id):
    """Create a new plant asset"""
    try:
        data = request.get_json()
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        # Get the next sr_no for this plant
        cursor.execute("SELECT MAX(sr_no) as max_sr FROM plant_assets WHERE plant_id = %s", (plant_id,))
        result = cursor.fetchone()
        next_sr_no = (result['max_sr'] or 0) + 1
        
        # Insert new plant asset
        query = """
            INSERT INTO plant_assets (sr_no, plant_id, asset_name, name, department_id,
                                    username, serial_number, device, hostname, last_name, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())
        """
        values = (
            next_sr_no,
            plant_id,
            data.get('asset_name'),
            data.get('name'),
            data.get('department_id'),
            data.get('username'),
            data.get('serial_number'),
            data.get('device'),
            data.get('hostname'),
            data.get('last_name')
        )
        
        cursor.execute(query, values)
        connection.commit()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'message': 'Plant asset created successfully'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)