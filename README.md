# ACGL Management System

A comprehensive web-based management system for ACGL (Asset, Computer, and General Logistics) designed to manage assets, software licenses, servers, network switches, CCTV systems, and printers across multiple plants and departments.

## Features

### 🔐 **Role-Based Authentication**
- **Admin**: Full CRUD operations (Create, Read, Update, Delete)
- **Deepak**: Create, Read, Update operations (no delete)
- **Shivaji**: Create, Read, Update operations (no delete)

### 🏭 **Multi-Plant Support**
- Plant 1, Plant 2, Dharwad, Jejuri
- Plant-specific asset tracking and management
- Department-wise organization

### 📊 **Comprehensive Asset Management**
- **Assets Details**: Computer hardware, devices, and equipment
- **Software Licenses**: MS Office, AutoCAD, Creo, and other software
- **Server Management**: SAP and Non-SAP servers with detailed specifications
- **Network Infrastructure**: Switches and network equipment
- **Security Systems**: CCTV cameras and surveillance equipment
- **Printing Solutions**: Network and local printers

### 🎨 **Modern UI/UX**
- Responsive design with attractive gradient themes
- Animated background with floating elements
- Card-based dashboard layout
- Real-time date/time display
- Search functionality across all modules
- Modal-based forms for detailed data entry

### 🔍 **Advanced Features**
- Auto-incrementing serial numbers
- Real-time search and filtering
- Data validation and error handling
- Success/error message notifications
- Local storage for data persistence
- Export capabilities (planned)

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with modern design patterns
- **Icons**: Font Awesome 6.0
- **Data Storage**: LocalStorage (Frontend), MySQL (Backend planned)
- **Database**: MySQL with comprehensive schema

## Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd acgl-management-system
```

### 2. Setup Database (Optional)
```bash
# Import the MySQL schema
mysql -u your_username -p < database/acgl_schema.sql
```

### 3. Launch the Application
```bash
# Option 1: Simple HTTP Server (Python)
python -m http.server 8000

# Option 2: Node.js HTTP Server
npx http-server

# Option 3: Open directly in browser
# Simply open index.html in your web browser
```

### 4. Access the Application
Open your browser and navigate to:
- `http://localhost:8000` (if using server)
- Or open `index.html` directly in your browser

## User Credentials

| User Type | Username | Password |
|-----------|----------|----------|
| Admin | `admin123` | `admin@123` |
| Deepak | `deepak456` | `deepak@456` |
| Shivaji | `shivaji789` | `shivaji@789` |

## File Structure

```
acgl-management-system/
├── index.html                 # Login page
├── dashboard-admin.html       # Admin dashboard
├── dashboard-deepak.html      # Deepak user dashboard
├── dashboard-shivaji.html     # Shivaji user dashboard
├── styles/
│   ├── login.css             # Login page styles
│   └── dashboard.css         # Dashboard styles
├── js/
│   ├── login.js              # Login functionality
│   ├── dashboard-common.js   # Common dashboard functions
│   ├── admin-dashboard.js    # Admin-specific functions
│   ├── deepak-dashboard.js   # Deepak user functions
│   └── shivaji-dashboard.js  # Shivaji user functions
├── assets/
│   └── acgl-logo.png         # Company logo
├── database/
│   └── acgl_schema.sql       # MySQL database schema
└── README.md                 # This file
```

## Module Overview

### 1. **Assets Management**
- Track computer hardware and equipment
- Department and plant assignment
- Serial number and hostname tracking
- Status monitoring (Active/Inactive/Maintenance)

### 2. **Software License Management**
- License key management
- Software type tracking (MS Office, AutoCAD, Creo)
- Expiry date monitoring
- User assignment tracking

### 3. **Server Management**
- **SAP Servers**: SAP-specific server management
- **Non-SAP Servers**: General purpose servers with VM support
- Hardware specifications tracking
- Performance monitoring capabilities

### 4. **Network Infrastructure**
- Switch configuration management
- Port and connection tracking
- Network topology visualization (planned)

### 5. **Security Systems**
- CCTV camera management
- Location and coverage tracking
- Recording status monitoring

### 6. **Printer Management**
- Network and local printer tracking
- Usage statistics (planned)
- Maintenance scheduling (planned)

## Usage Guide

### Login Process
1. Open the application in your browser
2. Select user type (Admin, Deepak, or Shivaji)
3. Enter the corresponding username and password
4. Click "Login" to access the dashboard

### Dashboard Navigation
- **Sidebar**: Navigate between different modules
- **Cards**: Quick overview and actions for each module
- **Search**: Real-time search within each module
- **Forms**: Add/edit data with validation

### Adding New Assets
1. Click on "Assets Details" in the sidebar
2. Select "Create Assets Details" from the dropdown
3. Fill in the required information
4. Click "Save" to store the data
5. Use the search bar to find specific assets

### Plant Management
1. Select a plant from the Plant card dropdown
2. Modal opens with plant-specific data entry
3. Add asset details specific to that plant
4. Search and manage plant-specific records

## Database Schema

The system uses a comprehensive MySQL database with the following main tables:

- `users` - User authentication and roles
- `plants` - Plant locations and details
- `departments` - Department organization
- `assets` - Asset management
- `software_licenses` - Software license tracking
- `sap_servers` / `non_sap_servers` - Server management
- `network_switches` - Network infrastructure
- `cctv_cameras` - Security systems
- `printers` - Printing solutions
- `plant_assets` - Plant-specific asset tracking
- `audit_log` - Change tracking and auditing

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] Advanced reporting and analytics
- [ ] Barcode/QR code scanning
- [ ] Mobile application
- [ ] Export to Excel/PDF
- [ ] Advanced user management
- [ ] Audit trail and logging
- [ ] Integration with existing ERP systems

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact:
- Email: support@acgl.com
- Phone: +91-XXXX-XXXX-XX

## Version History

- **v1.0.0** - Initial release with core functionality
- **v1.1.0** - Added plant-specific management (planned)
- **v1.2.0** - Backend integration (planned)

---

**ACGL Management System** - Streamlining asset and infrastructure management across multiple locations.