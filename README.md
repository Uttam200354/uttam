# ACGL Management System

A comprehensive web-based management system for ACGL (Asset Control and Governance Limited) with dynamic animations, modern UI, and full database integration.

## 🌟 Features

### 🔐 Authentication System
- **Three User Types**: Admin, Deepak, Shivaji
- **Secure Login**: Username/password authentication
- **Session Management**: Persistent login sessions
- **Dynamic Animations**: Floating shapes and smooth transitions

### 📊 Dashboard Features
- **Real-time Statistics**: Live counts for all assets and equipment
- **Interactive Cards**: Hover effects and dynamic content
- **Search Functionality**: Real-time search across all data
- **Responsive Design**: Works on all devices

### 🏭 Plant Management
- **Four Plants**: Plant 1, Plant 2, Dharwad, Jejuri
- **Plant-specific Assets**: Detailed asset tracking per plant
- **Auto-incrementing SR Numbers**: Automatic serial number generation
- **Search & Filter**: Advanced search capabilities

### 💻 Asset Management
- **Complete Asset Tracking**: Name, department, hostname, username, serial number, device type
- **CRUD Operations**: Create, Read, Update, Delete functionality
- **Search & Filter**: Real-time search across all fields
- **Database Integration**: Full MySQL backend

### 🔑 Software License Management
- **License Tracking**: Software keys, names, departments
- **Software Types**: MS Office, AutoCAD, Creo support
- **Device Association**: Link licenses to specific devices
- **Expiry Tracking**: License expiration monitoring

### 🖥️ Server Management
- **SAP Servers**: Dedicated SAP server tracking
- **Non-SAP Servers**: General server management with VM support
- **Hardware Details**: Brand, model, RAM, CPU, storage
- **Plant Assignment**: Server location tracking

### 🌐 Network Infrastructure
- **Network Switches**: Switch ID, brand, model, port count
- **CCTV Cameras**: Camera management with resolution and type
- **Printers**: Printer tracking with type and connection details
- **Location Tracking**: Plant and department assignment

### 🎨 Modern UI/UX
- **Dynamic Animations**: Floating shapes, smooth transitions
- **Gradient Backgrounds**: Beautiful color schemes
- **Responsive Design**: Mobile-friendly interface
- **Interactive Elements**: Hover effects and feedback

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- MySQL 8.0+
- Modern web browser

### Installation

1. **Clone the repository**
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
   mysql -u root -p < database/acgl_schema.sql
   ```

4. **Configure database connection**
   Edit `api_server.py` and update the `DB_CONFIG`:
   ```python
   DB_CONFIG = {
       'host': 'localhost',
       'user': 'root',
       'password': 'your_mysql_password',
       'database': 'acgl_management_system',
       'charset': 'utf8mb4',
       'autocommit': True
   }
   ```

5. **Start the API server**
   ```bash
   python api_server.py
   ```

6. **Start the web server**
   ```bash
   python server.py
   ```

7. **Access the application**
   Open your browser and navigate to: `http://localhost:8000`

## 👥 User Credentials

### Admin User
- **Username**: `admin123`
- **Password**: `admin@123`
- **Permissions**: Full access to all features including delete operations

### Deepak User
- **Username**: `deepak456`
- **Password**: `deepak@456`
- **Permissions**: Full access except delete operations

### Shivaji User
- **Username**: `shivaji789`
- **Password**: `shivaji@789`
- **Permissions**: Full access except delete operations

## 📋 Database Schema

### Core Tables
- **users**: User authentication and profiles
- **plants**: Plant locations and details
- **departments**: Department information
- **assets**: General asset tracking
- **software_licenses**: Software license management
- **sap_servers**: SAP server details
- **non_sap_servers**: Non-SAP server details
- **network_switches**: Network switch inventory
- **cctv_cameras**: CCTV camera management
- **printers**: Printer inventory
- **plant_assets**: Plant-specific asset details

### Features
- **Auto-incrementing SR Numbers**: Automatic serial number generation
- **Foreign Key Relationships**: Proper data integrity
- **Audit Logging**: Track all changes
- **Indexes**: Optimized query performance
- **Views**: Pre-built reports and summaries

## 🎯 Usage Guide

### Login Process
1. Select user type (Admin, Deepak, or Shivaji)
2. Enter username and password
3. Click "Login" to access dashboard

### Dashboard Navigation
- **Dashboard**: Overview with statistics
- **Assets Details**: Manage all assets
- **Software License**: Manage software licenses
- **Servers**: Manage SAP and Non-SAP servers
- **Switches**: Network switch management
- **CCTV**: Camera system management
- **Printers**: Printer inventory

### Plant Management
1. Select a plant from the dropdown
2. View plant-specific assets
3. Add new assets with auto-incrementing SR numbers
4. Search and filter plant assets

### Asset Management
1. Click "Create Asset Details"
2. Fill in all required fields
3. Save the asset
4. View in the database table
5. Edit or delete as needed

### Search Functionality
- Real-time search across all fields
- Filter by plant, department, or asset type
- Search by name, serial number, or hostname

## 🔧 API Endpoints

### Authentication
- `POST /api/login` - User authentication
- `POST /api/logout` - User logout

### Dashboard
- `GET /api/dashboard/stats` - Dashboard statistics

### Assets
- `GET /api/assets` - Get all assets
- `POST /api/assets` - Create new asset
- `PUT /api/assets/{id}` - Update asset
- `DELETE /api/assets/{id}` - Delete asset

### Software Licenses
- `GET /api/software-licenses` - Get all licenses
- `POST /api/software-licenses` - Create new license

### Servers
- `GET /api/servers/sap` - Get SAP servers
- `GET /api/servers/non-sap` - Get Non-SAP servers

### Infrastructure
- `GET /api/switches` - Get network switches
- `GET /api/cctv` - Get CCTV cameras
- `GET /api/printers` - Get printers

### Plant Assets
- `GET /api/plant-assets/{plant_id}` - Get plant assets
- `POST /api/plant-assets/{plant_id}` - Create plant asset

## 🎨 UI Features

### Login Page
- **Dynamic Background**: Animated floating shapes
- **Gradient Colors**: Beautiful purple-blue gradient
- **User Selection**: Three user type buttons
- **Form Validation**: Real-time input validation
- **Loading Animations**: Smooth transitions

### Dashboard
- **Sidebar Navigation**: Collapsible menu
- **Statistics Cards**: Live data with animations
- **Search Bars**: Real-time search functionality
- **Data Tables**: Sortable and filterable tables
- **Action Buttons**: Edit, delete, save operations

### Color Scheme
- **Primary**: Purple gradient (#667eea to #764ba2)
- **Secondary**: Blue accent (#3498db)
- **Success**: Green (#27ae60)
- **Danger**: Red (#e74c3c)
- **Warning**: Orange (#f39c12)

## 📱 Responsive Design

### Desktop (1024px+)
- Full sidebar navigation
- Multi-column layouts
- Hover effects and animations

### Tablet (768px - 1024px)
- Collapsible sidebar
- Adjusted grid layouts
- Touch-friendly buttons

### Mobile (480px - 768px)
- Mobile-first design
- Stacked layouts
- Swipe gestures

## 🔒 Security Features

### Authentication
- Session-based authentication
- Secure password handling
- User role permissions

### Data Protection
- SQL injection prevention
- XSS protection
- CSRF protection

### Access Control
- Role-based permissions
- User-specific dashboards
- Secure API endpoints

## 🚀 Performance

### Frontend
- Optimized CSS animations
- Efficient JavaScript
- Lazy loading
- Caching strategies

### Backend
- Database indexing
- Query optimization
- Connection pooling
- Response caching

## 🛠️ Development

### File Structure
```
acgl-management-system/
├── index.html              # Login page
├── dashboard-admin.html    # Admin dashboard
├── dashboard-deepak.html   # Deepak dashboard
├── dashboard-shivaji.html  # Shivaji dashboard
├── api_server.py          # Flask API server
├── server.py              # Static file server
├── requirements.txt       # Python dependencies
├── database/
│   └── acgl_schema.sql   # Database schema
├── styles/
│   ├── login.css         # Login page styles
│   └── dashboard.css     # Dashboard styles
├── js/
│   ├── login.js          # Login functionality
│   ├── admin-dashboard.js # Admin dashboard
│   ├── deepak-dashboard.js # Deepak dashboard
│   └── shivaji-dashboard.js # Shivaji dashboard
└── assets/
    └── acgl-logo.png     # Company logo
```

### Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Python Flask
- **Database**: MySQL 8.0
- **Styling**: Custom CSS with gradients and animations
- **Icons**: Font Awesome 6.0

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check MySQL service is running
   - Verify database credentials in `api_server.py`
   - Ensure database exists: `acgl_management_system`

2. **API Server Not Starting**
   - Check if port 5000 is available
   - Install required dependencies: `pip install -r requirements.txt`
   - Verify Python version: 3.7+

3. **Web Server Not Starting**
   - Check if port 8000 is available
   - Ensure all files are in the correct directory
   - Verify `index.html` exists

4. **Login Issues**
   - Verify user credentials
   - Check browser console for errors
   - Ensure API server is running

### Debug Mode
Enable debug mode in `api_server.py`:
```python
app.run(debug=True, host='0.0.0.0', port=5000)
```

## 📞 Support

For technical support or questions:
- Check the troubleshooting section
- Review the API documentation
- Verify database connectivity
- Test with different browsers

## 📄 License

This project is proprietary software for ACGL (Asset Control and Governance Limited).

---

**ACGL Management System** - Comprehensive asset and infrastructure management solution with modern UI and full database integration.