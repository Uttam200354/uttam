# ACGL Management System

A comprehensive web-based management system for tracking and managing IT assets, software licenses, servers, network equipment, CCTV systems, and printers across multiple plants and departments.

## Features

### 🔐 Authentication System
- **Three User Types:**
  - **Admin**: Full CRUD (Create, Read, Update, Delete) access to all modules
  - **Deepak**: Create, Read, Update access (no delete permissions)
  - **Shivaji**: Create, Read, Update access (no delete permissions)

### 📱 Dynamic Animated Interface
- Beautiful gradient animated backgrounds
- Floating shape animations
- Smooth transitions and hover effects
- Responsive design for all devices
- Professional UI with modern aesthetics

### 🏭 Multi-Module Management

#### 1. Assets Management
- Track computer assets, devices, and equipment
- Fields: Sr. Number, Asset Number, Name, Department, Hostname, Username, Serial Number, Device
- Search and filter capabilities
- Department-wise categorization

#### 2. Software License Management
- Manage software licenses and installations
- Track MS Office, AutoCAD, and Cero licenses
- Monitor software distribution across departments
- License key management

#### 3. Server Management
- **SAP Servers**: Dedicated tracking for SAP infrastructure
- **Non-SAP Servers**: General server management with VM support
- Hardware specifications tracking (RAM, CPU, Storage)
- Brand and model information

#### 4. Network Infrastructure
- **Switches**: Network switch management with plant-wise tracking
- **CCTV Systems**: Security camera management across facilities
- **Printers**: Printer fleet management by department and plant

### 🏢 Multi-Plant & Department Support
- **Plants**: Plant 1, Plant 2, Plant 3
- **Departments**: IT, HR, Finance, Operations, Security
- Plant and department-based filtering and reporting

### 🔍 Advanced Search & Filtering
- Real-time search across all modules
- Department and plant-based filtering
- Table-level search functionality
- Global search capabilities

## User Credentials

| User Type | Username | Password | Permissions |
|-----------|----------|----------|-------------|
| Admin | `admin` | `admin123` | Full CRUD access |
| Deepak | `deepak` | `deepak123` | Create, Read, Update only |
| Shivaji | `shivaji` | `shivaji123` | Create, Read, Update only |

## Technology Stack

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Advanced animations, gradients, and responsive design
- **JavaScript (ES6+)**: Dynamic interactions and data management
- **Font Awesome**: Professional icons
- **Local Storage**: Client-side data persistence

### Backend Database
- **MySQL**: Comprehensive database schema
- **Stored Procedures**: Optimized data operations
- **Triggers**: Automatic activity logging
- **Views**: Pre-built reporting queries
- **Indexes**: Performance-optimized database design

## File Structure

```
acgl-management-system/
├── index.html              # Login page
├── admin-dashboard.html     # Admin dashboard with full permissions
├── deepak-dashboard.html    # Deepak user dashboard
├── shivaji-dashboard.html   # Shivaji user dashboard
├── styles.css              # Comprehensive styling and animations
├── script.js               # Login functionality
├── admin-script.js         # Admin dashboard logic
├── user-script.js          # User dashboard logic (Deepak & Shivaji)
├── database.sql            # MySQL database schema
├── README.md               # Project documentation
└── acgl-logo.png           # Company logo (optional)
```

## Installation & Setup

### 1. Web Server Setup
```bash
# Clone or download the project files
# Place all files in your web server directory (e.g., htdocs, www, public_html)

# For local development, you can use:
# - XAMPP (Windows/Mac/Linux)
# - WAMP (Windows)
# - MAMP (Mac)
# - Live Server (VS Code extension)
```

### 2. Database Setup
```sql
-- Import the database schema
mysql -u root -p < database.sql

-- Or execute the SQL file in phpMyAdmin/MySQL Workbench
```

### 3. Configuration
- Ensure all HTML, CSS, and JS files are in the same directory
- Verify Font Awesome CDN link is accessible
- Test the application by opening `index.html` in a web browser

## Usage Guide

### Login Process
1. Open `index.html` in your web browser
2. Select one of the three user types (Admin, Deepak, or Shivaji)
3. Enter the corresponding username and password
4. Click "Login" to access the dashboard

### Dashboard Navigation
- **Sidebar Menu**: Navigate between different modules
- **Dashboard Cards**: Quick access and search for each module
- **Content Panels**: Detailed management interfaces for each module

### Data Management
1. **Creating Records**: Click "Create [Module] Details" buttons
2. **Editing Records**: Click the "Edit" button in data tables
3. **Searching**: Use search boxes to filter data in real-time
4. **Deleting Records**: Admin only - click "Delete" button (requires confirmation)

### Permissions by User Type
- **Admin**: Can create, view, edit, and delete all records
- **Deepak**: Can create, view, and edit records (cannot delete)
- **Shivaji**: Can create, view, and edit records (cannot delete)

## Database Schema

### Core Tables
- `users` - User authentication and roles
- `assets` - IT assets and equipment
- `software_licenses` - Software license management
- `servers` - Server infrastructure (SAP and Non-SAP)
- `switches` - Network switches
- `cctv` - CCTV systems
- `printers` - Printer management

### Master Tables
- `plants` - Plant information
- `departments` - Department details
- `activity_logs` - User activity tracking

### Views & Procedures
- Summary views for reporting
- Stored procedures for common operations
- Triggers for automatic logging

## Features in Detail

### Animated Background
- Gradient color shifting animation
- Floating geometric shapes
- Smooth transitions and effects

### Responsive Design
- Mobile-friendly interface
- Adaptive layout for different screen sizes
- Touch-friendly buttons and controls

### Data Persistence
- Local storage for client-side data
- Session management for user authentication
- Automatic data saving and loading

### Security Features
- Role-based access control
- Session timeout (24 hours)
- Input validation and sanitization

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

### Planned Features
1. **Backend Integration**: PHP/Node.js API for database connectivity
2. **Advanced Reporting**: Charts and analytics dashboards
3. **Export Functionality**: Excel/PDF export capabilities
4. **Notification System**: Alerts and reminders
5. **Audit Trail**: Enhanced activity logging
6. **Multi-language Support**: Internationalization
7. **Mobile App**: Native mobile application

### Potential Integrations
- **LDAP/Active Directory**: Enterprise authentication
- **Email Notifications**: Automated alerts
- **Barcode/QR Code**: Asset tracking
- **API Integration**: Third-party system connectivity

## Troubleshooting

### Common Issues
1. **Login Problems**: Verify username/password combinations
2. **Animation Issues**: Ensure modern browser with CSS3 support
3. **Data Not Saving**: Check browser's local storage settings
4. **Responsive Issues**: Clear browser cache and refresh

### Support
For technical support or feature requests, please refer to the project documentation or contact the development team.

## License
This project is created for ACGL Management System. All rights reserved.

## Version History
- **v1.0.0**: Initial release with core functionality
- **v1.1.0**: Added animations and responsive design
- **v1.2.0**: Enhanced database schema and user permissions

---

**ACGL Management System** - Streamlining IT asset management across the organization.