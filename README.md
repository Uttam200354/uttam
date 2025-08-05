# ACGL Management System

A comprehensive IT asset management system built with HTML, CSS, JavaScript, and localStorage (simulating MySQL database). This system provides role-based access control for managing various IT assets across multiple plants and departments.

## 🌟 Features

### 🔐 User Authentication
- **Three User Types**: Admin, Deepak, Shivaji
- **Role-based Access Control**: Different permissions for each user type
- **Secure Login**: Username/password authentication with session management

### 🎨 Dynamic UI
- **Animated Background**: Beautiful floating shapes with gradient animations
- **Modern Design**: Clean, responsive interface with hover effects
- **Interactive Cards**: Dashboard cards with search functionality
- **Smooth Transitions**: CSS animations throughout the application

### 📊 Dashboard Overview
- **Plant Management**: Four plant locations (Plant 1, Plant 2, Dharwad, Jejuri)
- **Department Management**: IT, HR, Finance departments
- **Real-time Statistics**: Live counts for all asset categories
- **Search Functionality**: Global search across all modules

### 💻 Asset Management Modules

#### 1. Assets Details
- Create, view, edit, and delete (admin only) IT assets
- Fields: Asset Number, Name, Department, Hostname, Username, Serial Number, Device
- Auto-incrementing serial numbers
- Search and filter capabilities

#### 2. Software License Management
- Track software licenses and keys
- Fields: Software Key, Name, Department, Hostname, Username, MS Office, AutoCAD, Cero, Device
- License compliance tracking

#### 3. Server Management
- **SAP Servers**: Brand, Serial Number, Model, Hard Disk, RAM, CPU
- **Non-SAP Servers**: Same as SAP + VM details
- Separate management for different server types

#### 4. Network Infrastructure
- **Switches**: ID, Name, Department, Hostname, Username, Plant, Device
- **CCTV Systems**: Camera management across all plants
- **Printers**: Printer inventory and management

### 🔒 User Permissions

#### Admin User
- **Full CRUD Access**: Create, Read, Update, Delete all records
- **Complete System Access**: All modules and features
- **Data Management**: Export, backup, and restore capabilities

#### Deepak & Shivaji Users
- **Read Access**: View all data and statistics
- **Edit Access**: Modify existing records
- **No Delete Access**: Cannot delete records (safety measure)

### 💾 Database Features
- **localStorage Simulation**: Mimics MySQL database operations
- **Data Persistence**: All data saved locally in browser
- **Auto-increment IDs**: Automatic serial number generation
- **CRUD Operations**: Full Create, Read, Update, Delete functionality
- **Export Capabilities**: CSV export for all data types
- **Backup System**: Complete database backup in JSON format

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in browser

### Installation
1. Download all files to a local directory
2. Open `index.html` in your web browser
3. Start using the system immediately

### Login Credentials

| User Type | Username | Password |
|-----------|----------|----------|
| Admin     | admin    | admin123 |
| Deepak    | deepak   | deepak123|
| Shivaji   | shivaji  | shivaji123|

## 📱 Usage Instructions

### 1. Login Process
1. Select your user type (Admin, Deepak, or Shivaji)
2. Enter your username and password
3. Click the "Login" button
4. You'll be redirected to your personalized dashboard

### 2. Navigation
- Use the sidebar menu to navigate between different modules
- Click on "Dashboard Overview" to see system statistics
- Each module has its own dedicated section

### 3. Adding New Records
1. Navigate to the desired module (Assets, Software, etc.)
2. Click the "Create [Module] Details" button
3. Fill in the required fields
4. Click "Save" to store the record
5. The record will appear in the data table below

### 4. Editing Records
1. Find the record in the data table
2. Click the "Edit" button for that record
3. The form will populate with existing data
4. Make your changes
5. Click "Save" to update the record

### 5. Deleting Records (Admin Only)
1. Only admin users can delete records
2. Click the "Delete" button for the record
3. Confirm the deletion in the popup
4. The record will be permanently removed

### 6. Searching Data
- Use the search boxes in dashboard cards for quick filtering
- Use the search box in each form to search within that module's data
- Search is case-insensitive and searches all fields

## 🏗️ System Architecture

### Frontend
- **HTML5**: Semantic markup for accessibility
- **CSS3**: Modern styling with animations and responsive design
- **Vanilla JavaScript**: No frameworks - pure JavaScript for performance

### Data Storage
- **localStorage**: Browser-based storage simulating MySQL
- **JSON Format**: All data stored in structured JSON format
- **Persistent Storage**: Data survives browser sessions

### Security Features
- **Session Management**: User sessions with automatic logout
- **Role-based Access**: Different UI elements based on user role
- **Input Validation**: Form validation for data integrity

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue gradient (#667eea to #764ba2)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Danger**: Red (#ef4444)
- **Background**: Light gray (#f8fafc)

### Animations
- **Floating Shapes**: Background animation with rotating elements
- **Hover Effects**: Interactive button and card animations
- **Transitions**: Smooth state changes throughout the UI
- **Loading States**: Visual feedback for user actions

## 📊 Data Structure

Each module stores data with the following common fields:
- `srNo`: Auto-incrementing serial number
- `createdBy`: Username of the creator
- `createdAt`: Timestamp of creation
- Module-specific fields as defined in the forms

## 🔧 Customization

### Adding New Plants
1. Edit the plant dropdown in `dashboard.html`
2. Add new plant options in the dropdown content
3. Update the `openPlantDetails()` function in `dashboard.js`

### Adding New Departments
1. Edit the department dropdown in `dashboard.html`
2. Add new department options
3. Update the `filterByDepartment()` function

### Modifying User Roles
1. Edit the `users` object in `login.js`
2. Add new users with their credentials and roles
3. Update the UI elements in `dashboard.html`

## 🚨 Troubleshooting

### Data Not Saving
- Check browser console for JavaScript errors
- Ensure localStorage is enabled in your browser
- Try clearing browser cache and reloading

### Login Issues
- Verify username and password are correct (case-sensitive)
- Clear browser localStorage and try again
- Check browser console for errors

### Display Issues
- Ensure browser supports CSS Grid and Flexbox
- Try zooming to 100% in browser
- Clear browser cache

## 📈 Future Enhancements

### Potential Features
- **Real MySQL Integration**: Replace localStorage with actual database
- **Advanced Reporting**: Charts and analytics dashboard
- **File Uploads**: Asset images and documentation
- **Email Notifications**: Alerts for license expiration
- **Mobile App**: Native mobile application
- **Multi-language Support**: Internationalization
- **Advanced Search**: Complex filtering and sorting
- **Audit Trail**: Track all changes to records

### Technical Improvements
- **API Integration**: RESTful API for data operations
- **Progressive Web App**: Offline functionality
- **Real-time Updates**: WebSocket integration
- **Enhanced Security**: JWT tokens, encryption
- **Performance Optimization**: Virtual scrolling for large datasets

## 📞 Support

For technical support or feature requests:
1. Check the troubleshooting section above
2. Review browser console for error messages
3. Verify all files are properly uploaded and accessible

## 📄 License

This project is created for ACGL Management System. All rights reserved.

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Compatibility**: All modern browsers supporting ES6+

## 🎯 System Requirements

- **Browser**: Chrome 70+, Firefox 65+, Safari 12+, Edge 80+
- **JavaScript**: ES6+ support required
- **Storage**: 10MB browser localStorage capacity
- **Resolution**: 1024x768 minimum (responsive design)

Enjoy using the ACGL Management System! 🚀