# IT Asset Management System

A comprehensive web-based IT Asset Management System with role-based access control, designed to manage and track IT assets, software licenses, servers, network equipment, CCTV systems, and printers across multiple plants and departments.

## Features

### 🔐 User Authentication & Authorization
- **Three User Roles**: Admin, Deepak, and Shivaji
- **Role-based Permissions**:
  - **Admin**: Full CRUD access (Create, Read, Edit, Delete)
  - **Deepak & Shivaji**: Limited access (Create, Read, Edit - No Delete)

### 📊 Asset Management Modules
1. **Assets Details** - Laptops, desktops, and other IT equipment
2. **Software License Management** - Track MS Office, AutoCAD, Cero, and other software
3. **Server Management** - Separate tracking for SAP and Non-SAP servers
4. **Network Switches** - Network infrastructure management
5. **CCTV Systems** - Security camera tracking
6. **Printers** - Printer inventory and management

### 🏢 Multi-Location Support
- **Plant Management** - Support for multiple manufacturing plants
- **Department Tracking** - IT, HR, Finance, Production, etc.
- **Location-based Asset Tracking**

### 🔍 Advanced Search & Filtering
- Real-time search across all asset categories
- Plant and department-based filtering
- Quick search from dashboard cards

### 📈 Dashboard Features
- **Role-specific Dashboards** - Customized view based on user permissions
- **Quick Access Cards** - Direct access to different asset categories
- **Search Integration** - Search functionality in dashboard cards
- **Responsive Design** - Works on desktop, tablet, and mobile devices

## File Structure

```
it-asset-management/
├── index.html              # Login page
├── admin-dashboard.html    # Admin dashboard (full permissions)
├── deepak-dashboard.html   # Deepak dashboard (limited permissions)
├── shivaji-dashboard.html  # Shivaji dashboard (limited permissions)
├── styles.css             # Complete CSS styling
├── script.js              # JavaScript functionality
├── database.sql           # MySQL database schema
└── README.md              # Documentation
```

## Installation & Setup

### Prerequisites
- Web server (Apache, Nginx, or local development server)
- MySQL 5.7+ or MariaDB 10.2+
- Modern web browser

### Database Setup

1. **Create the database**:
   ```sql
   mysql -u root -p < database.sql
   ```

2. **The script will create**:
   - Database: `it_asset_management`
   - All required tables with sample data
   - Views for reporting
   - Stored procedures
   - Audit triggers

### Web Server Setup

1. **Deploy files** to your web server directory
2. **Ensure proper permissions** for web server access
3. **Access the application** via web browser

## Usage Guide

### Login Process
1. Open `index.html` in your browser
2. Select user from dropdown:
   - **admin** - Full access including delete operations
   - **deepak** - Create, read, and edit access
   - **shivaji** - Create, read, and edit access
3. Click "Login" to access the respective dashboard

### Dashboard Navigation
- **Dashboard Home**: Overview cards for all asset categories
- **Sidebar Navigation**: Access to specific asset management modules
- **Dropdown Menus**: Create new records in each category
- **Search Functionality**: Real-time search within each module

### Asset Management Workflow

#### Adding New Assets
1. Navigate to desired module from sidebar
2. Click on "Create [Asset Type] Details"
3. Fill in all required fields
4. Click "Save" to store the record
5. Success message will confirm the save operation

#### Editing Assets
1. Go to the asset list in any module
2. Click "Edit" button for the desired record
3. Modify the fields as needed
4. Click "Save" to update the record

#### Deleting Assets (Admin Only)
1. Navigate to asset list
2. Click "Delete" button for the record
3. Confirm deletion in the popup
4. Record will be permanently removed

#### Searching Assets
1. Use the search box in any module
2. Enter any text to search across all fields
3. Results filter in real-time
4. Clear search to show all records

## Technical Specifications

### Frontend Technologies
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox and Grid
- **Vanilla JavaScript** - No external dependencies
- **Responsive Design** - Mobile-first approach

### Backend Database
- **MySQL/MariaDB** - Relational database
- **Normalized Schema** - Proper relationships and constraints
- **Audit Logging** - Track all changes with timestamps
- **Sample Data** - Pre-loaded for testing

### Data Storage
- **localStorage** - Client-side data persistence
- **JSON Format** - Structured data storage
- **Automatic Sync** - Data saved on every operation

## Database Schema Overview

### Core Tables
- `users` - User authentication and roles
- `plants` - Manufacturing plant locations
- `departments` - Organizational departments
- `assets` - IT equipment and devices
- `software_licenses` - Software licensing information
- `sap_servers` - SAP server infrastructure
- `non_sap_servers` - Non-SAP server infrastructure
- `switches` - Network switching equipment
- `cctv` - Security camera systems
- `printers` - Printing devices
- `audit_log` - Change tracking and auditing

### Key Features
- **Foreign Key Constraints** - Data integrity
- **Indexes** - Optimized query performance
- **Triggers** - Automatic audit logging
- **Views** - Simplified reporting queries
- **Stored Procedures** - Business logic encapsulation

## Security Features

### Access Control
- **Role-based Authentication** - Different permission levels
- **Session Management** - User state tracking
- **Input Validation** - Form data verification
- **SQL Injection Prevention** - Parameterized queries

### Data Protection
- **Audit Trail** - Complete change history
- **Data Validation** - Client and server-side checks
- **Backup Considerations** - Regular database backups recommended

## Browser Compatibility

### Supported Browsers
- **Chrome** 60+
- **Firefox** 55+
- **Safari** 12+
- **Edge** 79+
- **Opera** 47+

### Mobile Support
- **iOS Safari** 12+
- **Chrome Mobile** 60+
- **Samsung Internet** 8+

## Customization Options

### Adding New Asset Types
1. Add new table to `database.sql`
2. Create corresponding HTML form
3. Add JavaScript handlers
4. Update navigation menu

### Modifying User Roles
1. Update `userPermissions` object in `script.js`
2. Modify database `users` table enum values
3. Adjust UI elements based on permissions

### Styling Customization
- Modify CSS variables for color scheme
- Adjust layout in responsive breakpoints
- Update card designs and animations

## Performance Optimization

### Database Optimization
- **Indexes** on frequently queried columns
- **Query Optimization** for large datasets
- **Regular Maintenance** and cleanup

### Frontend Optimization
- **Minimal JavaScript** - No external libraries
- **CSS Optimization** - Efficient selectors
- **Image Optimization** - Compressed assets
- **Caching Strategy** - Browser caching headers

## Troubleshooting

### Common Issues

#### Login Problems
- Check JavaScript console for errors
- Verify file paths are correct
- Ensure web server is running

#### Data Not Saving
- Check browser localStorage capacity
- Verify form validation requirements
- Check JavaScript console for errors

#### Database Connection Issues
- Verify MySQL service is running
- Check database credentials
- Ensure proper permissions

#### Search Not Working
- Clear browser cache
- Check JavaScript console
- Verify data format in localStorage

## Development Guidelines

### Code Standards
- **Semantic HTML** - Proper element usage
- **CSS Methodology** - BEM-like naming
- **JavaScript ES6+** - Modern syntax
- **Comments** - Comprehensive documentation

### Testing Checklist
- [ ] All forms submit correctly
- [ ] Search functionality works
- [ ] Role-based permissions enforced
- [ ] Responsive design on all devices
- [ ] Database operations successful
- [ ] Error handling graceful

## Future Enhancements

### Planned Features
- **REST API** - Backend service integration
- **Advanced Reporting** - Charts and analytics
- **Export Functionality** - PDF and Excel exports
- **Email Notifications** - License expiry alerts
- **Barcode Integration** - Asset tracking
- **Multi-language Support** - Internationalization

### Scalability Considerations
- **Database Sharding** - For large datasets
- **Caching Layer** - Redis implementation
- **Load Balancing** - Multiple server instances
- **CDN Integration** - Static asset delivery

## Support & Maintenance

### Regular Maintenance Tasks
- **Database Backups** - Daily automated backups
- **Log Rotation** - Audit log cleanup
- **Performance Monitoring** - Query optimization
- **Security Updates** - Regular security patches

### Monitoring
- **Application Logs** - Error tracking
- **Performance Metrics** - Response time monitoring
- **User Activity** - Access pattern analysis
- **Resource Usage** - Server resource monitoring

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact Information

For technical support or questions:
- **Email**: support@itassetmanagement.com
- **Documentation**: See inline code comments
- **Issues**: Report via project repository

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Compatibility**: MySQL 5.7+, Modern Browsers