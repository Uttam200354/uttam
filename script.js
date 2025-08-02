// Global variables
let currentUser = null;
let currentUserType = null;
let database = {
    assets: [],
    softwareLicense: [],
    sapServers: [],
    nonSapServers: [],
    switches: [],
    cctv: [],
    printers: []
};

// User credentials
const users = {
    admin: { password: 'admin123', type: 'admin', name: 'Admin' },
    deepak: { password: 'deepak123', type: 'deepak', name: 'Deepak' },
    shivaji: { password: 'shivaji123', type: 'shivaji', name: 'Shivaji' }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
    }
    
    // Load sample data
    loadSampleData();
}

function selectUser(userType) {
    // Remove active class from all buttons
    document.querySelectorAll('.user-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected button
    event.target.classList.add('active');
    
    // Set current user type
    currentUserType = userType;
    
    // Pre-fill username based on user type
    document.getElementById('username').value = userType;
}

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        showMessage('Please enter both username and password', 'error');
        return;
    }
    
    const user = users[username];
    if (user && user.password === password) {
        currentUser = { username, type: user.type, name: user.name };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showDashboard();
    } else {
        showMessage('Invalid username or password', 'error');
    }
}

function showDashboard() {
    document.querySelector('.animated-background').style.display = 'none';
    
    const dashboard = document.createElement('div');
    dashboard.className = 'dashboard';
    dashboard.innerHTML = createDashboardHTML();
    document.body.appendChild(dashboard);
    
    // Initialize dashboard functionality
    initializeDashboard();
}

function createDashboardHTML() {
    const userDisplayName = currentUser.name;
    const userType = currentUser.type;
    
    return `
        <div class="sidebar">
            <div class="sidebar-header">
                <h2>ACGL Management System</h2>
                <div class="user-info">Welcome, ${userDisplayName}</div>
            </div>
            <ul class="sidebar-menu">
                <li><a href="#" onclick="showSection('dashboard')"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                <li><a href="#" onclick="showSection('assets')"><i class="fas fa-desktop"></i> Assets Details</a></li>
                <li><a href="#" onclick="showSection('software')"><i class="fas fa-key"></i> Software License</a></li>
                <li><a href="#" onclick="showSection('servers')"><i class="fas fa-server"></i> Servers</a></li>
                <li><a href="#" onclick="showSection('switches')"><i class="fas fa-network-wired"></i> Switches</a></li>
                <li><a href="#" onclick="showSection('cctv')"><i class="fas fa-video"></i> CCTV</a></li>
                <li><a href="#" onclick="showSection('printers')"><i class="fas fa-print"></i> Printers</a></li>
                <li><a href="#" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
            </ul>
        </div>
        <div class="content-panel">
            <div id="dashboard-content">
                ${createDashboardContent()}
            </div>
        </div>
    `;
}

function createDashboardContent() {
    return `
        <div class="dashboard-header">
            <h1>Dashboard - ${currentUser.name}</h1>
            <p>Welcome to ACGL Management System</p>
        </div>
        <div class="cards-grid">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Plant</div>
                    <div class="card-icon"><i class="fas fa-industry"></i></div>
                </div>
                <select class="dropdown">
                    <option>Select Plant</option>
                    <option>Plant 1</option>
                    <option>Plant 2</option>
                    <option>Plant 3</option>
                </select>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Department</div>
                    <div class="card-icon"><i class="fas fa-building"></i></div>
                </div>
                <select class="dropdown">
                    <option>Select Department</option>
                    <option>IT</option>
                    <option>HR</option>
                    <option>Finance</option>
                </select>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Assets</div>
                    <div class="card-icon"><i class="fas fa-desktop"></i></div>
                </div>
                <input type="text" class="search-box" placeholder="Search assets...">
                <div class="card-data">Total: ${database.assets.length}</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Software License</div>
                    <div class="card-icon"><i class="fas fa-key"></i></div>
                </div>
                <input type="text" class="search-box" placeholder="Search software...">
                <div class="card-data">Total: ${database.softwareLicense.length}</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Servers</div>
                    <div class="card-icon"><i class="fas fa-server"></i></div>
                </div>
                <input type="text" class="search-box" placeholder="Search servers...">
                <div class="card-data">Total: ${database.sapServers.length + database.nonSapServers.length}</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Switches</div>
                    <div class="card-icon"><i class="fas fa-network-wired"></i></div>
                </div>
                <input type="text" class="search-box" placeholder="Search switches...">
                <div class="card-data">Total: ${database.switches.length}</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-title">CCTV</div>
                    <div class="card-icon"><i class="fas fa-video"></i></div>
                </div>
                <input type="text" class="search-box" placeholder="Search CCTV...">
                <div class="card-data">Total: ${database.cctv.length}</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Printers</div>
                    <div class="card-icon"><i class="fas fa-print"></i></div>
                </div>
                <input type="text" class="search-box" placeholder="Search printers...">
                <div class="card-data">Total: ${database.printers.length}</div>
            </div>
        </div>
    `;
}

function showSection(section) {
    const contentPanel = document.querySelector('.content-panel');
    
    switch(section) {
        case 'dashboard':
            contentPanel.innerHTML = `<div id="dashboard-content">${createDashboardContent()}</div>`;
            break;
        case 'assets':
            contentPanel.innerHTML = createAssetsSection();
            break;
        case 'software':
            contentPanel.innerHTML = createSoftwareSection();
            break;
        case 'servers':
            contentPanel.innerHTML = createServersSection();
            break;
        case 'switches':
            contentPanel.innerHTML = createSwitchesSection();
            break;
        case 'cctv':
            contentPanel.innerHTML = createCCTVSection();
            break;
        case 'printers':
            contentPanel.innerHTML = createPrintersSection();
            break;
    }
}

function createAssetsSection() {
    return `
        <div class="dashboard-header">
            <h1>Assets Details</h1>
            <p>Manage asset information</p>
        </div>
        <div class="form-container">
            <h3>Create Assets Details</h3>
            <form id="assetsForm">
                <div class="form-row">
                    <div class="form-group-dashboard">
                        <label>Sr. Number</label>
                        <input type="text" id="assetSrNo" required>
                    </div>
                    <div class="form-group-dashboard">
                        <label>Assets Number</label>
                        <input type="text" id="assetNumber" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group-dashboard">
                        <label>Name</label>
                        <input type="text" id="assetName" required>
                    </div>
                    <div class="form-group-dashboard">
                        <label>Department</label>
                        <select id="assetDepartment" required>
                            <option value="">Select Department</option>
                            <option value="IT">IT</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group-dashboard">
                        <label>Hostname</label>
                        <input type="text" id="assetHostname" required>
                    </div>
                    <div class="form-group-dashboard">
                        <label>Username</label>
                        <input type="text" id="assetUsername" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group-dashboard">
                        <label>Serial Number</label>
                        <input type="text" id="assetSerialNo" required>
                    </div>
                    <div class="form-group-dashboard">
                        <label>Device</label>
                        <input type="text" id="assetDevice" required>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-success">
                        <i class="fas fa-save"></i> Save
                    </button>
                    <button type="button" class="btn btn-warning" onclick="editAsset()">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    ${currentUser.type === 'admin' ? '<button type="button" class="btn btn-danger" onclick="deleteAsset()"><i class="fas fa-trash"></i> Delete</button>' : ''}
                </div>
            </form>
            <div class="search-section">
                <input type="text" class="search-box" placeholder="Search assets..." onkeyup="searchAssets(this.value)">
            </div>
            <div id="assetsTable" class="data-table">
                ${createAssetsTable()}
            </div>
        </div>
    `;
}

function createAssetsTable() {
    if (database.assets.length === 0) {
        return '<p>No assets data available</p>';
    }
    
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Sr. No</th>
                    <th>Assets Number</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Hostname</th>
                    <th>Username</th>
                    <th>Serial Number</th>
                    <th>Device</th>
                    ${currentUser.type === 'admin' ? '<th>Actions</th>' : ''}
                </tr>
            </thead>
            <tbody>
    `;
    
    database.assets.forEach((asset, index) => {
        tableHTML += `
            <tr>
                <td>${asset.srNo}</td>
                <td>${asset.assetNumber}</td>
                <td>${asset.name}</td>
                <td>${asset.department}</td>
                <td>${asset.hostname}</td>
                <td>${asset.username}</td>
                <td>${asset.serialNo}</td>
                <td>${asset.device}</td>
                ${currentUser.type === 'admin' ? `
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editAsset(${index})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteAsset(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                ` : ''}
            </tr>
        `;
    });
    
    tableHTML += '</tbody></table>';
    return tableHTML;
}

// Similar functions for other sections...
function createSoftwareSection() {
    return `
        <div class="dashboard-header">
            <h1>Software License Details</h1>
            <p>Manage software license information</p>
        </div>
        <div class="form-container">
            <h3>Create Software License Details</h3>
            <form id="softwareForm">
                <div class="form-row">
                    <div class="form-group-dashboard">
                        <label>Sr. Number</label>
                        <input type="text" id="softwareSrNo" required>
                    </div>
                    <div class="form-group-dashboard">
                        <label>Software Key</label>
                        <input type="text" id="softwareKey" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group-dashboard">
                        <label>Name</label>
                        <input type="text" id="softwareName" required>
                    </div>
                    <div class="form-group-dashboard">
                        <label>Department</label>
                        <select id="softwareDepartment" required>
                            <option value="">Select Department</option>
                            <option value="IT">IT</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group-dashboard">
                        <label>Hostname</label>
                        <input type="text" id="softwareHostname" required>
                    </div>
                    <div class="form-group-dashboard">
                        <label>Username</label>
                        <input type="text" id="softwareUsername" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group-dashboard">
                        <label>MS Office</label>
                        <input type="text" id="msOffice" required>
                    </div>
                    <div class="form-group-dashboard">
                        <label>AutoCAD</label>
                        <input type="text" id="autoCAD" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group-dashboard">
                        <label>Cero</label>
                        <input type="text" id="cero" required>
                    </div>
                    <div class="form-group-dashboard">
                        <label>Device</label>
                        <input type="text" id="softwareDevice" required>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-success">
                        <i class="fas fa-save"></i> Save
                    </button>
                    <button type="button" class="btn btn-warning" onclick="editSoftware()">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    ${currentUser.type === 'admin' ? '<button type="button" class="btn btn-danger" onclick="deleteSoftware()"><i class="fas fa-trash"></i> Delete</button>' : ''}
                </div>
            </form>
            <div class="search-section">
                <input type="text" class="search-box" placeholder="Search software..." onkeyup="searchSoftware(this.value)">
            </div>
            <div id="softwareTable" class="data-table">
                ${createSoftwareTable()}
            </div>
        </div>
    `;
}

function createServersSection() {
    return `
        <div class="dashboard-header">
            <h1>Server Details</h1>
            <p>Manage server information</p>
        </div>
        <div class="form-container">
            <h3>Select Server Type</h3>
            <div class="server-type-buttons">
                <button class="btn btn-primary" onclick="showSAPServerForm()">
                    <i class="fas fa-server"></i> SAP Server
                </button>
                <button class="btn btn-primary" onclick="showNonSAPServerForm()">
                    <i class="fas fa-server"></i> Non SAP Server
                </button>
            </div>
            <div id="serverFormContainer"></div>
            <div id="serverTable" class="data-table">
                ${createServersTable()}
            </div>
        </div>
    `;
}

function showSAPServerForm() {
    document.getElementById('serverFormContainer').innerHTML = `
        <div class="form-container">
            <h3>Create SAP Server Details</h3>
            <form id="sapServerForm">
                <div class="form-row">
                    <div class="form-group-dashboard">
                        <label>Sr. Number</label>
                        <input type="text" id="sapSrNo" required>
                    </div>
                    <div class="form-group-dashboard">
                        <label>Server Brand</label>
                        <input type="text" id="sapBrand" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group-dashboard">
                        <label>Serial Number</label>
                        <input type="text" id="sapSerialNo" required>
                    </div>
                    <div class="form-group-dashboard">
                        <label>Model Number</label>
                        <input type="text" id="sapModel" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group-dashboard">
                        <label>Hard Disk</label>
                        <input type="text" id="sapHardDisk" required>
                    </div>
                    <div class="form-group-dashboard">
                        <label>Total RAM</label>
                        <input type="text" id="sapRAM" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group-dashboard">
                        <label>Total CPU</label>
                        <input type="text" id="sapCPU" required>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-success">
                        <i class="fas fa-save"></i> Save
                    </button>
                    <button type="button" class="btn btn-warning" onclick="editSAPServer()">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    ${currentUser.type === 'admin' ? '<button type="button" class="btn btn-danger" onclick="deleteSAPServer()"><i class="fas fa-trash"></i> Delete</button>' : ''}
                </div>
            </form>
        </div>
    `;
}

function showNonSAPServerForm() {
    document.getElementById('serverFormContainer').innerHTML = `
        <div class="form-container">
            <h3>Create Non SAP Server Details</h3>
            <form id="nonSapServerForm">
                <div class="form-row">
                    <div class="form-group-dashboard">
                        <label>Sr. Number</label>
                        <input type="text" id="nonSapSrNo" required>
                    </div>
                    <div class="form-group-dashboard">
                        <label>Server Brand</label>
                        <input type="text" id="nonSapBrand" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group-dashboard">
                        <label>Serial Number</label>
                        <input type="text" id="nonSapSerialNo" required>
                    </div>
                    <div class="form-group-dashboard">
                        <label>Model Number</label>
                        <input type="text" id="nonSapModel" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group-dashboard">
                        <label>Hard Disk</label>
                        <input type="text" id="nonSapHardDisk" required>
                    </div>
                    <div class="form-group-dashboard">
                        <label>Total RAM</label>
                        <input type="text" id="nonSapRAM" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group-dashboard">
                        <label>Total CPU</label>
                        <input type="text" id="nonSapCPU" required>
                    </div>
                    <div class="form-group-dashboard">
                        <label>VM</label>
                        <input type="text" id="nonSapVM" required>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-success">
                        <i class="fas fa-save"></i> Save
                    </button>
                    <button type="button" class="btn btn-warning" onclick="editNonSAPServer()">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    ${currentUser.type === 'admin' ? '<button type="button" class="btn btn-danger" onclick="deleteNonSAPServer()"><i class="fas fa-trash"></i> Delete</button>' : ''}
                </div>
            </form>
        </div>
    `;
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

function logout() {
    localStorage.removeItem('currentUser');
    location.reload();
}

function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `success-message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    const contentPanel = document.querySelector('.content-panel');
    contentPanel.insertBefore(messageDiv, contentPanel.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function loadSampleData() {
    // Sample data for demonstration
    database.assets = [
        { srNo: '1', assetNumber: 'AST001', name: 'Dell Desktop', department: 'IT', hostname: 'IT-PC-001', username: 'admin', serialNo: 'SN123456', device: 'Desktop' },
        { srNo: '2', assetNumber: 'AST002', name: 'HP Laptop', department: 'HR', hostname: 'HR-LAP-001', username: 'user1', serialNo: 'SN789012', device: 'Laptop' }
    ];
    
    database.softwareLicense = [
        { srNo: '1', softwareKey: 'SK001', name: 'MS Office', department: 'IT', hostname: 'IT-PC-001', username: 'admin', msOffice: 'Office 365', autoCAD: 'N/A', cero: 'N/A', device: 'Desktop' }
    ];
    
    database.sapServers = [
        { srNo: '1', brand: 'Dell', serialNo: 'SRV001', model: 'PowerEdge R740', hardDisk: '2TB', ram: '32GB', cpu: 'Intel Xeon' }
    ];
    
    database.nonSapServers = [
        { srNo: '1', brand: 'HP', serialNo: 'SRV002', model: 'ProLiant DL380', hardDisk: '1TB', ram: '16GB', cpu: 'Intel Xeon', vm: 'VM001' }
    ];
}

// Initialize dashboard functionality
function initializeDashboard() {
    // Add event listeners for forms
    document.addEventListener('submit', function(e) {
        if (e.target.id === 'assetsForm') {
            e.preventDefault();
            saveAsset();
        } else if (e.target.id === 'softwareForm') {
            e.preventDefault();
            saveSoftware();
        } else if (e.target.id === 'sapServerForm') {
            e.preventDefault();
            saveSAPServer();
        } else if (e.target.id === 'nonSapServerForm') {
            e.preventDefault();
            saveNonSAPServer();
        }
    });
}

function saveAsset() {
    const asset = {
        srNo: document.getElementById('assetSrNo').value,
        assetNumber: document.getElementById('assetNumber').value,
        name: document.getElementById('assetName').value,
        department: document.getElementById('assetDepartment').value,
        hostname: document.getElementById('assetHostname').value,
        username: document.getElementById('assetUsername').value,
        serialNo: document.getElementById('assetSerialNo').value,
        device: document.getElementById('assetDevice').value
    };
    
    database.assets.push(asset);
    showMessage('Asset data saved successfully!');
    document.getElementById('assetsForm').reset();
    document.getElementById('assetsTable').innerHTML = createAssetsTable();
}

function saveSoftware() {
    const software = {
        srNo: document.getElementById('softwareSrNo').value,
        softwareKey: document.getElementById('softwareKey').value,
        name: document.getElementById('softwareName').value,
        department: document.getElementById('softwareDepartment').value,
        hostname: document.getElementById('softwareHostname').value,
        username: document.getElementById('softwareUsername').value,
        msOffice: document.getElementById('msOffice').value,
        autoCAD: document.getElementById('autoCAD').value,
        cero: document.getElementById('cero').value,
        device: document.getElementById('softwareDevice').value
    };
    
    database.softwareLicense.push(software);
    showMessage('Software license data saved successfully!');
    document.getElementById('softwareForm').reset();
    document.getElementById('softwareTable').innerHTML = createSoftwareTable();
}

function saveSAPServer() {
    const server = {
        srNo: document.getElementById('sapSrNo').value,
        brand: document.getElementById('sapBrand').value,
        serialNo: document.getElementById('sapSerialNo').value,
        model: document.getElementById('sapModel').value,
        hardDisk: document.getElementById('sapHardDisk').value,
        ram: document.getElementById('sapRAM').value,
        cpu: document.getElementById('sapCPU').value
    };
    
    database.sapServers.push(server);
    showMessage('SAP Server data saved successfully!');
    document.getElementById('sapServerForm').reset();
    document.getElementById('serverTable').innerHTML = createServersTable();
}

function saveNonSAPServer() {
    const server = {
        srNo: document.getElementById('nonSapSrNo').value,
        brand: document.getElementById('nonSapBrand').value,
        serialNo: document.getElementById('nonSapSerialNo').value,
        model: document.getElementById('nonSapModel').value,
        hardDisk: document.getElementById('nonSapHardDisk').value,
        ram: document.getElementById('nonSapRAM').value,
        cpu: document.getElementById('nonSapCPU').value,
        vm: document.getElementById('nonSapVM').value
    };
    
    database.nonSapServers.push(server);
    showMessage('Non SAP Server data saved successfully!');
    document.getElementById('nonSapServerForm').reset();
    document.getElementById('serverTable').innerHTML = createServersTable();
}

// Search functions
function searchAssets(query) {
    const filteredAssets = database.assets.filter(asset => 
        Object.values(asset).some(value => 
            value.toString().toLowerCase().includes(query.toLowerCase())
        )
    );
    // Update table with filtered results
    // Implementation would update the table display
}

function searchSoftware(query) {
    const filteredSoftware = database.softwareLicense.filter(software => 
        Object.values(software).some(value => 
            value.toString().toLowerCase().includes(query.toLowerCase())
        )
    );
    // Update table with filtered results
}

// Edit and Delete functions (for admin only)
function editAsset(index) {
    if (currentUser.type !== 'admin') return;
    // Implementation for editing asset
}

function deleteAsset(index) {
    if (currentUser.type !== 'admin') return;
    database.assets.splice(index, 1);
    document.getElementById('assetsTable').innerHTML = createAssetsTable();
    showMessage('Asset deleted successfully!');
}

// Similar functions for other sections...
function createSoftwareTable() {
    if (database.softwareLicense.length === 0) {
        return '<p>No software license data available</p>';
    }
    
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Sr. No</th>
                    <th>Software Key</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Hostname</th>
                    <th>Username</th>
                    <th>MS Office</th>
                    <th>AutoCAD</th>
                    <th>Cero</th>
                    <th>Device</th>
                    ${currentUser.type === 'admin' ? '<th>Actions</th>' : ''}
                </tr>
            </thead>
            <tbody>
    `;
    
    database.softwareLicense.forEach((software, index) => {
        tableHTML += `
            <tr>
                <td>${software.srNo}</td>
                <td>${software.softwareKey}</td>
                <td>${software.name}</td>
                <td>${software.department}</td>
                <td>${software.hostname}</td>
                <td>${software.username}</td>
                <td>${software.msOffice}</td>
                <td>${software.autoCAD}</td>
                <td>${software.cero}</td>
                <td>${software.device}</td>
                ${currentUser.type === 'admin' ? `
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editSoftware(${index})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteSoftware(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                ` : ''}
            </tr>
        `;
    });
    
    tableHTML += '</tbody></table>';
    return tableHTML;
}

function createServersTable() {
    const allServers = [...database.sapServers.map(s => ({...s, type: 'SAP'})), ...database.nonSapServers.map(s => ({...s, type: 'Non-SAP'}))];
    
    if (allServers.length === 0) {
        return '<p>No server data available</p>';
    }
    
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Sr. No</th>
                    <th>Brand</th>
                    <th>Serial No</th>
                    <th>Model</th>
                    <th>Hard Disk</th>
                    <th>RAM</th>
                    <th>CPU</th>
                    ${database.nonSapServers.length > 0 ? '<th>VM</th>' : ''}
                    ${currentUser.type === 'admin' ? '<th>Actions</th>' : ''}
                </tr>
            </thead>
            <tbody>
    `;
    
    allServers.forEach((server, index) => {
        tableHTML += `
            <tr>
                <td>${server.type}</td>
                <td>${server.srNo}</td>
                <td>${server.brand}</td>
                <td>${server.serialNo}</td>
                <td>${server.model}</td>
                <td>${server.hardDisk}</td>
                <td>${server.ram}</td>
                <td>${server.cpu}</td>
                ${server.type === 'Non-SAP' ? `<td>${server.vm}</td>` : ''}
                ${currentUser.type === 'admin' ? `
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editServer(${index})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteServer(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                ` : ''}
            </tr>
        `;
    });
    
    tableHTML += '</tbody></table>';
    return tableHTML;
}