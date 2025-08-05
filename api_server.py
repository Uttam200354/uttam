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
        
        # Get counts for different entities
        stats = {}
        
        # Assets count
        cursor.execute("SELECT COUNT(*) as count FROM assets")
        stats['assets'] = cursor.fetchone()['count']
        
        # Software licenses count
        cursor.execute("SELECT COUNT(*) as count FROM software_licenses")
        stats['software_licenses'] = cursor.fetchone()['count']
        
        # Servers count
        cursor.execute("SELECT COUNT(*) as count FROM sap_servers")
        sap_servers = cursor.fetchone()['count']
        cursor.execute("SELECT COUNT(*) as count FROM non_sap_servers")
        non_sap_servers = cursor.fetchone()['count']
        stats['servers'] = sap_servers + non_sap_servers
        
        # Switches count
        cursor.execute("SELECT COUNT(*) as count FROM network_switches")
        stats['switches'] = cursor.fetchone()['count']
        
        # CCTV count
        cursor.execute("SELECT COUNT(*) as count FROM cctv_cameras")
        stats['cctv'] = cursor.fetchone()['count']
        
        # Printers count
        cursor.execute("SELECT COUNT(*) as count FROM printers")
        stats['printers'] = cursor.fetchone()['count']
        
        # Plants count
        cursor.execute("SELECT COUNT(*) as count FROM plants")
        stats['plants'] = cursor.fetchone()['count']
        
        # Departments count
        cursor.execute("SELECT COUNT(*) as count FROM departments")
        stats['departments'] = cursor.fetchone()['count']
        
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
        cursor.execute("SELECT * FROM plants ORDER BY plant_name")
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
        cursor.execute("SELECT * FROM departments ORDER BY department_name")
        departments = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'departments': departments})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Assets API endpoints
@app.route('/api/assets', methods=['GET'])
def get_assets():
    """Get all assets with optional filtering"""
    try:
        search = request.args.get('search', '')
        plant_id = request.args.get('plant_id')
        department_id = request.args.get('department_id')
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT a.*, p.plant_name, d.department_name 
            FROM assets a 
            LEFT JOIN plants p ON a.plant_id = p.id 
            LEFT JOIN departments d ON a.department_id = d.id 
            WHERE 1=1
        """
        params = []
        
        if search:
            query += " AND (a.asset_name LIKE %s OR a.asset_number LIKE %s OR a.hostname LIKE %s)"
            params.extend([f'%{search}%', f'%{search}%', f'%{search}%'])
        
        if plant_id:
            query += " AND a.plant_id = %s"
            params.append(plant_id)
        
        if department_id:
            query += " AND a.department_id = %s"
            params.append(department_id)
        
        query += " ORDER BY a.sr_no DESC"
        
        cursor.execute(query, params)
        assets = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'assets': assets})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/assets', methods=['POST'])
def create_asset():
    """Create new asset"""
    try:
        data = request.get_json()
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        # Get next SR number
        cursor.execute("SELECT MAX(sr_no) as max_sr FROM assets")
        result = cursor.fetchone()
        next_sr = (result['max_sr'] or 0) + 1
        
        query = """
            INSERT INTO assets (sr_no, asset_number, asset_name, department_id, plant_id, 
                              hostname, username, serial_number, device_type, created_by)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        
        values = (
            next_sr,
            data['asset_number'],
            data['asset_name'],
            data.get('department_id'),
            data.get('plant_id'),
            data.get('hostname'),
            data.get('username'),
            data.get('serial_number'),
            data.get('device_type'),
            session.get('user_id')
        )
        
        cursor.execute(query, values)
        asset_id = cursor.lastrowid
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'message': 'Asset created successfully', 'asset_id': asset_id})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/assets/<int:asset_id>', methods=['PUT'])
def update_asset(asset_id):
    """Update asset"""
    try:
        data = request.get_json()
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        query = """
            UPDATE assets SET 
                asset_number = %s, asset_name = %s, department_id = %s, plant_id = %s,
                hostname = %s, username = %s, serial_number = %s, device_type = %s
            WHERE id = %s
        """
        
        values = (
            data['asset_number'],
            data['asset_name'],
            data.get('department_id'),
            data.get('plant_id'),
            data.get('hostname'),
            data.get('username'),
            data.get('serial_number'),
            data.get('device_type'),
            asset_id
        )
        
        cursor.execute(query, values)
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'message': 'Asset updated successfully'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/assets/<int:asset_id>', methods=['DELETE'])
def delete_asset(asset_id):
    """Delete asset"""
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        cursor.execute("DELETE FROM assets WHERE id = %s", (asset_id,))
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'message': 'Asset deleted successfully'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Software Licenses API endpoints
@app.route('/api/software-licenses', methods=['GET'])
def get_software_licenses():
    """Get all software licenses"""
    try:
        search = request.args.get('search', '')
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT sl.*, p.plant_name, d.department_name 
            FROM software_licenses sl 
            LEFT JOIN plants p ON sl.plant_id = p.id 
            LEFT JOIN departments d ON sl.department_id = d.id 
            WHERE 1=1
        """
        params = []
        
        if search:
            query += " AND (sl.software_name LIKE %s OR sl.software_key LIKE %s OR sl.hostname LIKE %s)"
            params.extend([f'%{search}%', f'%{search}%', f'%{search}%'])
        
        query += " ORDER BY sl.sr_no DESC"
        
        cursor.execute(query, params)
        licenses = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'licenses': licenses})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/software-licenses', methods=['POST'])
def create_software_license():
    """Create new software license"""
    try:
        data = request.get_json()
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        # Get next SR number
        cursor.execute("SELECT MAX(sr_no) as max_sr FROM software_licenses")
        result = cursor.fetchone()
        next_sr = (result['max_sr'] or 0) + 1
        
        query = """
            INSERT INTO software_licenses (sr_no, software_key, software_name, department_id, plant_id,
                                        hostname, username, ms_office, autocad, creo, device_type, created_by)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        
        values = (
            next_sr,
            data['software_key'],
            data['software_name'],
            data.get('department_id'),
            data.get('plant_id'),
            data.get('hostname'),
            data.get('username'),
            data.get('ms_office', False),
            data.get('autocad', False),
            data.get('creo', False),
            data.get('device_type'),
            session.get('user_id')
        )
        
        cursor.execute(query, values)
        license_id = cursor.lastrowid
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'message': 'Software license created successfully', 'license_id': license_id})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Server API endpoints
@app.route('/api/servers/sap', methods=['GET'])
def get_sap_servers():
    """Get all SAP servers"""
    try:
        search = request.args.get('search', '')
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT ss.*, p.plant_name, d.department_name 
            FROM sap_servers ss 
            LEFT JOIN plants p ON ss.plant_id = p.id 
            LEFT JOIN departments d ON ss.department_id = d.id 
            WHERE 1=1
        """
        params = []
        
        if search:
            query += " AND (ss.server_brand LIKE %s OR ss.serial_number LIKE %s OR ss.model_number LIKE %s)"
            params.extend([f'%{search}%', f'%{search}%', f'%{search}%'])
        
        query += " ORDER BY ss.sr_no DESC"
        
        cursor.execute(query, params)
        servers = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'servers': servers})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/servers/non-sap', methods=['GET'])
def get_non_sap_servers():
    """Get all Non-SAP servers"""
    try:
        search = request.args.get('search', '')
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT nss.*, p.plant_name, d.department_name 
            FROM non_sap_servers nss 
            LEFT JOIN plants p ON nss.plant_id = p.id 
            LEFT JOIN departments d ON nss.department_id = d.id 
            WHERE 1=1
        """
        params = []
        
        if search:
            query += " AND (nss.server_brand LIKE %s OR nss.serial_number LIKE %s OR nss.model_number LIKE %s)"
            params.extend([f'%{search}%', f'%{search}%', f'%{search}%'])
        
        query += " ORDER BY nss.sr_no DESC"
        
        cursor.execute(query, params)
        servers = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'servers': servers})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Switches API endpoints
@app.route('/api/switches', methods=['GET'])
def get_switches():
    """Get all network switches"""
    try:
        search = request.args.get('search', '')
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT ns.*, p.plant_name, d.department_name 
            FROM network_switches ns 
            LEFT JOIN plants p ON ns.plant_id = p.id 
            LEFT JOIN departments d ON ns.department_id = d.id 
            WHERE 1=1
        """
        params = []
        
        if search:
            query += " AND (ns.switch_name LIKE %s OR ns.switch_id LIKE %s OR ns.hostname LIKE %s)"
            params.extend([f'%{search}%', f'%{search}%', f'%{search}%'])
        
        query += " ORDER BY ns.sr_no DESC"
        
        cursor.execute(query, params)
        switches = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'switches': switches})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# CCTV API endpoints
@app.route('/api/cctv', methods=['GET'])
def get_cctv():
    """Get all CCTV cameras"""
    try:
        search = request.args.get('search', '')
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT cc.*, p.plant_name, d.department_name 
            FROM cctv_cameras cc 
            LEFT JOIN plants p ON cc.plant_id = p.id 
            LEFT JOIN departments d ON cc.department_id = d.id 
            WHERE 1=1
        """
        params = []
        
        if search:
            query += " AND (cc.camera_name LIKE %s OR cc.camera_id LIKE %s OR cc.hostname LIKE %s)"
            params.extend([f'%{search}%', f'%{search}%', f'%{search}%'])
        
        query += " ORDER BY cc.sr_no DESC"
        
        cursor.execute(query, params)
        cameras = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'cameras': cameras})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Printers API endpoints
@app.route('/api/printers', methods=['GET'])
def get_printers():
    """Get all printers"""
    try:
        search = request.args.get('search', '')
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT pr.*, p.plant_name, d.department_name 
            FROM printers pr 
            LEFT JOIN plants p ON pr.plant_id = p.id 
            LEFT JOIN departments d ON pr.department_id = d.id 
            WHERE 1=1
        """
        params = []
        
        if search:
            query += " AND (pr.printer_name LIKE %s OR pr.printer_id LIKE %s OR pr.hostname LIKE %s)"
            params.extend([f'%{search}%', f'%{search}%', f'%{search}%'])
        
        query += " ORDER BY pr.sr_no DESC"
        
        cursor.execute(query, params)
        printers = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'printers': printers})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Plant Assets API endpoints
@app.route('/api/plant-assets/<int:plant_id>', methods=['GET'])
def get_plant_assets(plant_id):
    """Get assets for specific plant"""
    try:
        search = request.args.get('search', '')
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT pa.*, p.plant_name, d.department_name 
            FROM plant_assets pa 
            LEFT JOIN plants p ON pa.plant_id = p.id 
            LEFT JOIN departments d ON pa.department_id = d.id 
            WHERE pa.plant_id = %s
        """
        params = [plant_id]
        
        if search:
            query += " AND (pa.asset_name LIKE %s OR pa.employee_name LIKE %s OR pa.hostname LIKE %s)"
            params.extend([f'%{search}%', f'%{search}%', f'%{search}%'])
        
        query += " ORDER BY pa.sr_no DESC"
        
        cursor.execute(query, params)
        assets = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'assets': assets})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/plant-assets/<int:plant_id>', methods=['POST'])
def create_plant_asset(plant_id):
    """Create new plant asset"""
    try:
        data = request.get_json()
        
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        # Get next SR number for this plant
        cursor.execute("SELECT MAX(sr_no) as max_sr FROM plant_assets WHERE plant_id = %s", (plant_id,))
        result = cursor.fetchone()
        next_sr = (result['max_sr'] or 0) + 1
        
        query = """
            INSERT INTO plant_assets (sr_no, plant_id, asset_name, employee_name, department_id,
                                   username, serial_number, device_type, hostname, last_name, created_by)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        
        values = (
            next_sr,
            plant_id,
            data['asset_name'],
            data.get('employee_name'),
            data.get('department_id'),
            data.get('username'),
            data.get('serial_number'),
            data.get('device_type'),
            data.get('hostname'),
            data.get('last_name'),
            session.get('user_id')
        )
        
        cursor.execute(query, values)
        asset_id = cursor.lastrowid
        
        cursor.close()
        connection.close()
        
        return jsonify({'success': True, 'message': 'Plant asset created successfully', 'asset_id': asset_id})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("=" * 60)
    print("🏭 ACGL Management System API Server")
    print("=" * 60)
    print("🌐 API Server running at: http://localhost:5000")
    print("📊 Available endpoints:")
    print("   POST /api/login - User authentication")
    print("   GET  /api/dashboard/stats - Dashboard statistics")
    print("   GET  /api/assets - Get all assets")
    print("   POST /api/assets - Create new asset")
    print("   GET  /api/software-licenses - Get software licenses")
    print("   GET  /api/servers/sap - Get SAP servers")
    print("   GET  /api/servers/non-sap - Get Non-SAP servers")
    print("   GET  /api/switches - Get network switches")
    print("   GET  /api/cctv - Get CCTV cameras")
    print("   GET  /api/printers - Get printers")
    print("   GET  /api/plant-assets/<plant_id> - Get plant assets")
    print("=" * 60)
    print("Press Ctrl+C to stop the server")
    print("=" * 60)
    
    app.run(debug=True, host='0.0.0.0', port=5000)