# ACGL Management System

A comprehensive web-based management system built with React, Node.js, Express, and MySQL. Features role-based access control, dynamic animations, and full CRUD operations for managing IT assets, software licenses, servers, and network devices.

## 🌟 Features

### Core Functionality
- **Role-Based Authentication**: Three user roles (Admin, Deepak, Shivaji) with different permissions
- **Dynamic Dashboard**: Interactive cards with real-time data visualization
- **Full CRUD Operations**: Create, Read, Update, Delete functionality (Admin only)
- **Edit-Only Access**: Deepak and Shivaji can create and edit but not delete
- **Search & Filter**: Advanced search capabilities across all data tables
- **Responsive Design**: Mobile-friendly interface with smooth animations

### Management Modules
- **Assets Management**: Track computer hardware, devices, and equipment
- **Software License Management**: Monitor software keys and licenses (MS Office, AutoCAD, Cero)
- **Server Management**: Separate modules for SAP and Non-SAP servers
- **Network Devices**: Manage switches, CCTV systems, and printers
- **Plant & Department Management**: Dropdown-based organization system

### User Interface
- **Animated Login Page**: Dynamic background with user selection
- **Gradient Themes**: Beautiful gradient colors throughout the application
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Interactive Elements**: Hover effects, loading states, and transitions

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd acgl-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MySQL Database**
   - Create a MySQL database named `acgl_management`
   - Import the database schema:
   ```bash
   mysql -u root -p acgl_management < server/database.sql
   ```
   - Update database credentials in `server/index.js` if needed

4. **Start the backend server**
   ```bash
   npm run server
   ```

5. **Start the frontend development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   Open http://localhost:3000 in your browser

## 👥 User Accounts

The system comes with three pre-configured user accounts:

| User | Username | Password | Permissions |
|------|----------|----------|------------|
| Admin | admin | admin123 | Full CRUD access |
| Deepak | deepak | deepak123 | Create & Edit only |
| Shivaji | shivaji | shivaji123 | Create & Edit only |

## 🗂️ Database Schema

### Main Tables
- `users` - User authentication and roles
- `assets` - IT assets and equipment
- `software_licenses` - Software licensing information
- `sap_servers` - SAP server details
- `non_sap_servers` - Non-SAP server details
- `switches` - Network switches
- `cctv` - CCTV systems
- `printers` - Printer devices
- `plants` - Plant locations
- `departments` - Department information

## 📱 Application Structure

```
src/
├── components/
│   ├── AdminDashboard.jsx     # Admin dashboard with full permissions
│   ├── DeepakDashboard.jsx    # Deepak dashboard (edit-only)
│   ├── ShivajiDashboard.jsx   # Shivaji dashboard (edit-only)
│   ├── LoginPage.jsx          # Animated login page
│   ├── Sidebar.jsx            # Navigation sidebar
│   ├── DataTable.jsx          # Reusable data table component
│   ├── DataForm.jsx           # Reusable form component
│   ├── DashboardCards.jsx     # Dashboard cards with statistics
│   └── ProtectedRoute.jsx     # Route protection component
├── App.jsx                    # Main application component
├── main.jsx                   # React entry point
└── index.css                  # Global styles and animations

server/
├── index.js                   # Express server and API endpoints
└── database.sql               # MySQL database schema
```

## 🎨 Design Features

### Animations
- **Framer Motion**: Smooth page transitions and micro-interactions
- **CSS Keyframes**: Custom animations for backgrounds and elements
- **Loading States**: Interactive loading indicators
- **Hover Effects**: Enhanced user feedback

### Color Scheme
- **Gradient Backgrounds**: Dynamic animated gradients
- **Glass Morphism**: Semi-transparent panels with backdrop blur
- **Color-Coded Sections**: Different gradients for various modules
- **High Contrast**: Accessible text and button combinations

## 🔧 API Endpoints

### Authentication
- `POST /api/login` - User authentication

### Data Management (for each module)
- `GET /api/{table}` - Fetch all records
- `GET /api/{table}/:id` - Fetch single record
- `POST /api/{table}` - Create new record
- `PUT /api/{table}/:id` - Update record
- `DELETE /api/{table}/:id` - Delete record (Admin only)
- `GET /api/{table}/search/:term` - Search records

### Dropdown Options
- `GET /api/plants` - Fetch plant options
- `GET /api/departments` - Fetch department options

## 🔒 Security Features

- **Role-Based Access Control**: Different permissions for each user type
- **Route Protection**: Protected routes based on user authentication
- **Input Validation**: Form validation on both client and server
- **SQL Injection Prevention**: Parameterized queries

## 📊 Dashboard Features

### Admin Dashboard
- Full CRUD operations on all data
- Delete permissions for all records
- Complete system overview
- User management capabilities

### Deepak/Shivaji Dashboards
- Create and edit permissions only
- No delete functionality
- Same UI and features as admin
- Role-specific access restrictions

## 🔄 Data Flow

1. **Authentication**: User selects role and logs in
2. **Dashboard**: Role-based dashboard loads with appropriate permissions
3. **Navigation**: Sidebar navigation between different modules
4. **Data Management**: CRUD operations based on user permissions
5. **Real-time Updates**: Automatic data refresh after operations

## 🛠️ Customization

### Adding New Fields
1. Update database schema in `server/database.sql`
2. Add field configurations in dashboard components
3. Update API endpoints if needed

### Adding New User Roles
1. Add role to database enum
2. Create new dashboard component
3. Update routing and authentication logic

### Styling Changes
1. Modify CSS variables in `src/index.css`
2. Update gradient configurations
3. Customize animation parameters

## 📈 Performance Features

- **Lazy Loading**: Components loaded on demand
- **Optimized Queries**: Efficient database operations
- **Caching**: Browser caching for static assets
- **Responsive Images**: Optimized image loading

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check MySQL credentials in `server/index.js`
   - Ensure MySQL service is running
   - Verify database exists and schema is imported

2. **Login Issues**
   - Verify user credentials in database
   - Check server is running on port 5000
   - Clear browser localStorage

3. **API Errors**
   - Check network connectivity
   - Verify API endpoints are accessible
   - Check browser console for errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Framer Motion for smooth animations
- Lucide React for beautiful icons
- MySQL for reliable database management

---

**Note**: This is a demonstration project. For production use, implement additional security measures, error handling, and testing.