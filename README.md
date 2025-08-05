# ACGL Management System

A comprehensive asset management system for ACGL with role-based access control and dynamic data management.

## 🏭 Features

### Authentication & User Management
- **Three User Types**: Admin, Deepak, and Shivaji
- **Role-Based Access**: Different permissions for each user type
- **Secure Login**: Password-protected access with session management

### Asset Management
- **Plant Assets**: Manage assets by plant location (Plant 1, Plant 2, Dharwad, Jejuri)
- **General Assets**: Comprehensive asset tracking with auto-incrementing serial numbers
- **Software Licenses**: Track software licenses, keys, and installations
- **Server Management**: Separate tracking for SAP and Non-SAP servers
- **Network Infrastructure**: Switches, CCTV cameras, and printers management

### User Interface
- **Modern Design**: Beautiful gradient backgrounds and animations
- **Responsive Layout**: Works on desktop and mobile devices
- **Dynamic Content**: Real-time data updates and search functionality
- **Interactive Forms**: User-friendly data entry with validation

## 🚀 Quick Start

### Prerequisites
- Python 3.7 or higher
- MySQL 8.0 or higher
- Modern web browser

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd acgl-management-system
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up MySQL database**
   ```bash
   # Login to MySQL
   mysql -u root -p
   
   # Create database
   CREATE DATABASE acgl_management_system;
   USE acgl_management_system;
   
   # Import schema
   source database/acgl_schema.sql;
   ```

4. **Configure database connection**
   - Edit `server.py` (API server) and update the `DB_CONFIG`:
   ```python
   DB_CONFIG = {
       'host': 'localhost',
       'user': 'root',
       'password': 'your_mysql_password',  # Update this
       'database': 'acgl_management_system',
       'charset': 'utf8mb4',
       'autocommit': True
   }
   ```

### Running the System

1. **Start the API server** (Terminal 1)
   ```bash
   python server.py
   ```
   This starts the Flask API server on port 5000.

2. **Start the static file server** (Terminal 2)
   ```bash
   python static_server.py
   ```
   This serves the frontend files on port 8000.

3. **Access the application**
   - Open your browser and go to: `http://localhost:8000`
   - You'll see the login page with the ACGL Management System

## 👥 User Accounts

### Admin User
- **Username**: `admin123`
- **Password**: `admin@123`
- **Permissions**: Full access to all features including create, edit, and delete operations

### Deepak User
- **Username**: `deepak456`
- **Password**: `deepak@456`
- **Permissions**: Create and edit operations only (no delete access)

### Shivaji User
- **Username**: `shivaji789`
- **Password**: `shivaji@789`
- **Permissions**: Create and edit operations only (no delete access)

## 📊 System Features

### Dashboard Overview
- **Statistics Cards**: Real-time counts of plants, assets, departments, software licenses, servers, switches, CCTV, and printers
- **Search Functionality**: Search across all asset types
- **Dynamic Updates**: Real-time data refresh

### Asset Management
- **Auto-incrementing Serial Numbers**: Automatic ID generation for new entries
- **Plant-specific Assets**: Track assets by plant location
- **Department Assignment**: Organize assets by department
- **Device Tracking**: Comprehensive device information management

### Data Operations
- **Create**: Add new assets, licenses, servers, etc.
- **Edit**: Modify existing entries
- **Delete**: Remove entries (Admin only)
- **Search**: Find specific entries quickly
- **Export**: View data in organized tables

## 🛠️ Technical Architecture

### Frontend
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with gradients and animations
- **JavaScript (ES6+)**: Dynamic functionality and API integration
- **Responsive Design**: Mobile-friendly interface

### Backend
- **Python Flask**: RESTful API server
- **MySQL**: Relational database for data persistence
- **CORS Support**: Cross-origin resource sharing for development
- **Session Management**: Secure user authentication

### Database Schema
- **Users Table**: User authentication and role management
- **Plants Table**: Plant location management
- **Departments Table**: Department organization
- **Asset Tables**: Various asset type tracking
- **Audit Log**: Activity tracking and history

## 🔧 Configuration

### Database Configuration
Update the database connection in `server.py`:
```python
DB_CONFIG = {
    'host': 'localhost',
    'user': 'your_username',
    'password': 'your_password',
    'database': 'acgl_management_system',
    'charset': 'utf8mb4',
    'autocommit': True
}
```

### Port Configuration
- **API Server**: Port 5000 (configurable in `server.py`)
- **Static Server**: Port 8000 (configurable in `static_server.py`)

## 📁 Project Structure

```
acgl-management-system/
├── index.html                 # Login page
├── dashboard-admin.html       # Admin dashboard
├── dashboard-deepak.html      # Deepak dashboard
├── dashboard-shivaji.html     # Shivaji dashboard
├── server.py                  # Flask API server
├── static_server.py           # Static file server
├── requirements.txt           # Python dependencies
├── README.md                  # This file
├── assets/
│   └── acgl-logo.png         # Company logo
├── styles/
│   ├── login.css             # Login page styles
│   └── dashboard.css         # Dashboard styles
├── js/
│   ├── login.js              # Login functionality
│   ├── admin-dashboard.js    # Admin dashboard logic
│   ├── deepak-dashboard.js   # Deepak dashboard logic
│   └── shivaji-dashboard.js  # Shivaji dashboard logic
└── database/
    └── acgl_schema.sql       # Database schema
```

## 🔒 Security Features

- **Password Hashing**: Secure password storage using bcrypt
- **Session Management**: Secure user sessions
- **Role-Based Access**: Different permissions for different user types
- **Input Validation**: Server-side data validation
- **SQL Injection Protection**: Parameterized queries

## 🎨 UI/UX Features

- **Dynamic Background**: Animated floating shapes on login page
- **Gradient Design**: Modern color schemes throughout
- **Smooth Animations**: CSS transitions and hover effects
- **Responsive Layout**: Works on all screen sizes
- **Loading Indicators**: Visual feedback during operations
- **Success/Error Messages**: Clear user feedback

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Change the port number in the respective server file
   - Or stop the process using the port

2. **Database Connection Error**
   - Verify MySQL is running
   - Check database credentials in `server.py`
   - Ensure database and tables exist

3. **CORS Errors**
   - Ensure both servers are running
   - Check browser console for specific error messages

4. **Static Files Not Loading**
   - Verify static server is running on port 8000
   - Check file paths and permissions

### Debug Mode
To enable debug mode, modify the Flask app in `server.py`:
```python
app.run(debug=True, host='0.0.0.0', port=5000)
```

## 📞 Support

For technical support or questions:
- Check the browser console for error messages
- Verify all prerequisites are installed
- Ensure both servers are running
- Check database connectivity

## 🔄 Updates and Maintenance

### Adding New Asset Types
1. Create database table in `acgl_schema.sql`
2. Add API endpoints in `server.py`
3. Create frontend forms and JavaScript functions
4. Update dashboard HTML structure

### User Management
- Add new users in the database `users` table
- Update authentication logic in `server.py`
- Modify dashboard access controls

## 📄 License

This project is developed for ACGL Management System. All rights reserved.

---

**ACGL Management System** - Comprehensive Asset Management Solution