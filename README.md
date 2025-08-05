# ACGL Management System

A comprehensive asset management system for ACGL with role-based access control and dynamic dashboards.

## Features

- **Role-Based Access Control**: Three user types (Admin, Deepak, Shivaji) with different permissions
- **Dynamic Login System**: Animated login page with user selection
- **Comprehensive Asset Management**: Manage assets, software licenses, servers, switches, CCTV, and printers
- **Plant-Specific Asset Tracking**: Track assets by plant location
- **Search and Filter**: Search functionality across all asset types
- **Modern UI/UX**: Beautiful, responsive design with animations
- **MySQL Database**: Robust data storage with proper relationships

## System Requirements

- Python 3.7+
- MySQL 8.0+
- Modern web browser

## Installation

### 1. Clone or Download the Project

```bash
git clone <repository-url>
cd acgl-management-system
```

### 2. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 3. Set Up MySQL Database

1. **Create MySQL Database**:
   ```sql
   CREATE DATABASE acgl_management_system;
   USE acgl_management_system;
   ```

2. **Import Database Schema**:
   ```bash
   mysql -u root -p acgl_management_system < database/acgl_schema.sql
   ```

3. **Configure Database Connection**:
   Edit `server.py` and update the `DB_CONFIG`:
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

## Running the Application

### Option 1: Run Both Servers (Recommended)

1. **Start the Flask API Server** (Terminal 1):
   ```bash
   python server.py
   ```
   This starts the API server on port 5000.

2. **Start the Static File Server** (Terminal 2):
   ```bash
   python static_server.py
   ```
   This starts the static file server on port 8000.

3. **Access the Application**:
   Open your browser and go to: `http://localhost:8000`

### Option 2: Run Only Static Server (Development)

If you only want to test the frontend:
```bash
python static_server.py
```
Then access: `http://localhost:8000`

## User Accounts

The system comes with three pre-configured user accounts:

| User Type | Username | Password | Permissions |
|-----------|----------|----------|-------------|
| Admin | admin | admin123 | Full access (Create, Edit, Delete) |
| Deepak | deepak | deepak123 | Limited access (Create, Edit only) |
| Shivaji | shivaji | shivaji123 | Limited access (Create, Edit only) |

## Dashboard Features

### Admin Dashboard
- **Full CRUD Operations**: Create, Read, Update, Delete all asset types
- **Plant Management**: Manage assets by plant location
- **Department Management**: Organize assets by department
- **Comprehensive Reporting**: View all asset statistics

### Deepak & Shivaji Dashboards
- **Limited Operations**: Create and Edit only (no Delete)
- **Same Interface**: Identical UI to admin dashboard
- **Restricted Permissions**: Cannot delete any assets

## Asset Types

### 1. Assets
- Asset Number, Name, Department, Plant
- Hostname, Username, Serial Number, Device Type

### 2. Software Licenses
- Software Key, Name, Department
- MS Office, AutoCAD, Cero licenses
- Hostname, Username, Device

### 3. Servers
- **SAP Servers**: Brand, Serial Number, Model, Hard Disk, RAM, CPU
- **Non-SAP Servers**: Same as SAP + VM information

### 4. Network Switches
- Switch ID, Name, Department, Plant
- Hostname, Username, Device

### 5. CCTV Cameras
- Camera ID, Name, Department, Plant
- Hostname, Username, Device

### 6. Printers
- Printer ID, Name, Department, Plant
- Hostname, Username, Device

## Plant Locations

The system supports four plant locations:
- Plant 1
- Plant 2
- Dharwad
- Jejuri

## API Endpoints

The Flask server provides RESTful API endpoints:

- `POST /api/login` - User authentication
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/plants` - Get all plants
- `GET /api/departments` - Get all departments
- `POST /api/assets` - Create asset
- `GET /api/assets` - Get all assets
- `PUT /api/assets/{id}` - Update asset
- `DELETE /api/assets/{id}` - Delete asset
- Similar endpoints for software licenses, servers, switches, CCTV, and printers

## File Structure

```
acgl-management-system/
├── index.html                 # Login page
├── dashboard-admin.html       # Admin dashboard
├── dashboard-deepak.html      # Deepak dashboard
├── dashboard-shivaji.html     # Shivaji dashboard
├── server.py                  # Flask API server
├── static_server.py           # Static file server
├── requirements.txt           # Python dependencies
├── README.md                 # This file
├── assets/
│   └── acgl-logo.png        # Company logo
├── styles/
│   ├── login.css            # Login page styles
│   └── dashboard.css        # Dashboard styles
├── js/
│   ├── login.js            # Login functionality
│   ├── admin-dashboard.js  # Admin dashboard logic
│   ├── deepak-dashboard.js # Deepak dashboard logic
│   └── shivaji-dashboard.js # Shivaji dashboard logic
└── database/
    └── acgl_schema.sql     # Database schema
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**:
   - Change the port numbers in the server files
   - Kill existing processes using the ports

2. **Database Connection Error**:
   - Verify MySQL is running
   - Check database credentials in `server.py`
   - Ensure database exists and schema is imported

3. **CORS Errors**:
   - Both servers include CORS headers
   - Ensure both servers are running

4. **Static Files Not Loading**:
   - Check file paths
   - Ensure static server is running on port 8000

### Database Issues

If you need to reset the database:
```sql
DROP DATABASE acgl_management_system;
CREATE DATABASE acgl_management_system;
USE acgl_management_system;
SOURCE database/acgl_schema.sql;
```

## Development

### Adding New Asset Types

1. Add table to database schema
2. Create API endpoints in `server.py`
3. Add frontend functions in dashboard JS files
4. Update dashboard HTML structure

### Customizing Styles

- Edit `styles/login.css` for login page styling
- Edit `styles/dashboard.css` for dashboard styling
- All styles use modern CSS with gradients and animations

## Security Notes

- Change default passwords in production
- Use HTTPS in production
- Implement proper session management
- Add input validation and sanitization
- Use environment variables for sensitive data

## License

This project is developed for ACGL Management System.

## Support

For technical support or questions, please contact the development team.