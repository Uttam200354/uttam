// Global variables
let currentUser = null;
let currentSection = 'dashboard';
let editingRecord = null;
let currentDataType = null;

// Data storage (simulating database)
const userData = {
    assets: [],
    software: [],
    sapServers: [],
    nonSapServers: [],
    switches: [],
    cctv: [],
    printers: []
};

// User permissions
const userPermissions = {
    admin: ['create', 'read', 'edit', 'delete'],
    deepak: ['create', 'read', 'edit'],
    shivaji: ['create', 'read', 'edit']
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if we're on login page
    if (document.getElementById('loginForm')) {
        initializeLogin();
    } else {
        // We're on a dashboard page
        const userType = getCurrentUserFromURL();
        if (userType) {
            currentUser = userType;
            initializeDashboard();
        }
    }
}

function getCurrentUserFromURL() {
    const path = window.location.pathname;
    if (path.includes('admin-dashboard')) return 'admin';
    if (path.includes('deepak-dashboard')) return 'deepak';
    if (path.includes('shivaji-dashboard')) return 'shivaji';
    return null;
}

function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    
    if (!username) {
        showMessage('Please select a user', 'error');
        return;
    }
    
    // Redirect to appropriate dashboard
    switch (username) {
        case 'admin':
            window.location.href = 'admin-dashboard.html';
            break;
        case 'deepak':
            window.location.href = 'deepak-dashboard.html';
            break;
        case 'shivaji':
            window.location.href = 'shivaji-dashboard.html';
            break;
    }
}

function initializeDashboard() {
    setupNavigation();
    setupFormHandlers();
    setupSearchHandlers();
    loadStoredData();
    updateUIBasedOnPermissions();
    showDashboard();
}

function setupNavigation() {
    // Dashboard navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#dashboard') {
                e.preventDefault();
                showDashboard();
                setActiveNavLink(this);
            }
        });
    });
}

function setupFormHandlers() {
    // Assets form
    const assetsForm = document.getElementById('assetsForm');
    if (assetsForm) {
        assetsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit('assets', this);
        });
    }
    
    // Software form
    const softwareForm = document.getElementById('softwareForm');
    if (softwareForm) {
        softwareForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit('software', this);
        });
    }
    
    // SAP Server form
    const sapServerForm = document.getElementById('sapServerForm');
    if (sapServerForm) {
        sapServerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit('sapServers', this);
        });
    }
    
    // Non-SAP Server form
    const nonSapServerForm = document.getElementById('nonSapServerForm');
    if (nonSapServerForm) {
        nonSapServerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit('nonSapServers', this);
        });
    }
    
    // Switches form
    const switchesForm = document.getElementById('switchesForm');
    if (switchesForm) {
        switchesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit('switches', this);
        });
    }
    
    // CCTV form
    const cctvForm = document.getElementById('cctvForm');
    if (cctvForm) {
        cctvForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit('cctv', this);
        });
    }
    
    // Printers form
    const printersForm = document.getElementById('printersForm');
    if (printersForm) {
        printersForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit('printers', this);
        });
    }
}

function setupSearchHandlers() {
    // Setup search functionality for all search boxes
    const searchBoxes = [
        'assetsSearch', 'softwareSearch', 'sapServerSearch', 
        'nonSapServerSearch', 'switchesSearch', 'cctvSearch', 'printersSearch'
    ];
    
    searchBoxes.forEach(searchId => {
        const searchBox = document.getElementById(searchId);
        if (searchBox) {
            searchBox.addEventListener('input', function() {
                const dataType = searchId.replace('Search', '');
                if (dataType === 'sapServer') {
                    performSearch('sapServers', this.value);
                } else if (dataType === 'nonSapServer') {
                    performSearch('nonSapServers', this.value);
                } else {
                    performSearch(dataType, this.value);
                }
            });
        }
    });
}

function performSearch(dataType, searchTerm) {
    const tableBody = document.getElementById(`${dataType}TableBody`);
    if (!tableBody) return;
    
    const data = userData[dataType];
    const filteredData = data.filter(item => {
        return Object.values(item).some(value => 
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    });
    
    populateTable(dataType, filteredData);
}

function handleFormSubmit(dataType, form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Add ID for tracking
    data.id = editingRecord ? editingRecord.id : Date.now();
    
    if (editingRecord) {
        // Update existing record
        const index = userData[dataType].findIndex(item => item.id === editingRecord.id);
        if (index !== -1) {
            userData[dataType][index] = data;
            showMessage('Data updated successfully!', 'success');
        }
        editingRecord = null;
    } else {
        // Add new record
        userData[dataType].push(data);
        showMessage('Data saved successfully!', 'success');
    }
    
    // Reset form and update table
    form.reset();
    populateTable(dataType, userData[dataType]);
    saveDataToStorage();
}

function populateTable(dataType, data) {
    const tableBody = document.getElementById(`${dataType}TableBody`);
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    data.forEach(item => {
        const row = createTableRow(dataType, item);
        tableBody.appendChild(row);
    });
}

function createTableRow(dataType, item) {
    const row = document.createElement('tr');
    
    // Create cells based on data type
    const fields = getFieldsForDataType(dataType);
    
    fields.forEach(field => {
        const cell = document.createElement('td');
        cell.textContent = item[field] || '';
        row.appendChild(cell);
    });
    
    // Actions cell
    const actionsCell = document.createElement('td');
    actionsCell.innerHTML = createActionButtons(dataType, item);
    row.appendChild(actionsCell);
    
    return row;
}

function getFieldsForDataType(dataType) {
    const fieldMappings = {
        assets: ['srNumber', 'assetsNumber', 'name', 'department', 'hostname', 'username', 'serialNumber', 'device'],
        software: ['srNumber', 'softwareKey', 'name', 'department', 'hostname', 'username', 'msOffice', 'autoCAD', 'cero', 'device'],
        sapServers: ['srNumber', 'serverBrand', 'serialNumber', 'modelNumber', 'hardDisk', 'totalRAM', 'totalCPU'],
        nonSapServers: ['srNumber', 'serverBrand', 'serialNumber', 'modelNumber', 'hardDisk', 'totalRAM', 'totalCPU', 'vm'],
        switches: ['srNumber', 'switchesId', 'name', 'department', 'hostname', 'username', 'plant', 'device'],
        cctv: ['srNumber', 'cctvId', 'name', 'department', 'hostname', 'username', 'plant', 'device'],
        printers: ['srNumber', 'printerId', 'name', 'department', 'hostname', 'username', 'plant', 'device']
    };
    
    return fieldMappings[dataType] || [];
}

function createActionButtons(dataType, item) {
    const permissions = userPermissions[currentUser] || [];
    let buttons = '';
    
    if (permissions.includes('edit')) {
        buttons += `<button class="table-edit-btn" onclick="editRecord('${dataType}', ${item.id})">Edit</button>`;
    }
    
    if (permissions.includes('delete')) {
        buttons += `<button class="table-delete-btn" onclick="deleteRecord('${dataType}', ${item.id})">Delete</button>`;
    }
    
    return `<div class="table-actions">${buttons}</div>`;
}

function editRecord(dataType, id) {
    const item = userData[dataType].find(record => record.id === id);
    if (!item) return;
    
    editingRecord = item;
    currentDataType = dataType;
    
    // Show the form section
    showSection(`${dataType.replace('Servers', '-server')}-form`);
    
    // Populate form fields
    const form = document.getElementById(`${dataType}Form`) || 
                 document.getElementById(`${dataType.replace('Servers', 'Server')}Form`);
    
    if (form) {
        Object.keys(item).forEach(key => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field) {
                field.value = item[key];
            }
        });
    }
}

function deleteRecord(dataType, id) {
    if (confirm('Are you sure you want to delete this record?')) {
        const index = userData[dataType].findIndex(item => item.id === id);
        if (index !== -1) {
            userData[dataType].splice(index, 1);
            populateTable(dataType, userData[dataType]);
            saveDataToStorage();
            showMessage('Record deleted successfully!', 'success');
        }
    }
}

function editCurrentRecord() {
    if (editingRecord && currentDataType) {
        editRecord(currentDataType, editingRecord.id);
    }
}

function deleteCurrentRecord() {
    if (editingRecord && currentDataType) {
        deleteRecord(currentDataType, editingRecord.id);
        editingRecord = null;
        currentDataType = null;
    }
}

function updateUIBasedOnPermissions() {
    const permissions = userPermissions[currentUser] || [];
    
    // Hide delete buttons if user doesn't have delete permission
    if (!permissions.includes('delete')) {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(btn => btn.style.display = 'none');
    }
}

// Navigation functions
function showDashboard() {
    showSection('dashboard-view');
    setActiveNavLink(document.querySelector('[href="#dashboard"]'));
}

function showCreateAssets() {
    resetForm('assetsForm');
    showSection('assets-form');
    populateTable('assets', userData.assets);
}

function showCreateSoftware() {
    resetForm('softwareForm');
    showSection('software-form');
    populateTable('software', userData.software);
}

function showCreateSAPServer() {
    resetForm('sapServerForm');
    showSection('sap-server-form');
    populateTable('sapServers', userData.sapServers);
}

function showCreateNonSAPServer() {
    resetForm('nonSapServerForm');
    showSection('non-sap-server-form');
    populateTable('nonSapServers', userData.nonSapServers);
}

function showCreateSwitches() {
    resetForm('switchesForm');
    showSection('switches-form');
    populateTable('switches', userData.switches);
}

function showCreateCCTV() {
    resetForm('cctvForm');
    showSection('cctv-form');
    populateTable('cctv', userData.cctv);
}

function showCreatePrinters() {
    resetForm('printersForm');
    showSection('printers-form');
    populateTable('printers', userData.printers);
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    currentSection = sectionId;
}

function setActiveNavLink(activeLink) {
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to clicked link
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function resetForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
    }
    editingRecord = null;
    currentDataType = null;
}

// Utility functions
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert message at the top of main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.insertBefore(messageDiv, mainContent.firstChild);
    }
    
    // Auto-remove message after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function saveDataToStorage() {
    try {
        localStorage.setItem('itAssetData', JSON.stringify(userData));
    } catch (error) {
        console.error('Error saving data to localStorage:', error);
    }
}

function loadStoredData() {
    try {
        const storedData = localStorage.getItem('itAssetData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            Object.assign(userData, parsedData);
        }
    } catch (error) {
        console.error('Error loading data from localStorage:', error);
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        window.location.href = 'index.html';
    }
}

// Dashboard card search functionality
document.addEventListener('DOMContentLoaded', function() {
    // Setup search inputs in dashboard cards
    const dashboardSearchInputs = document.querySelectorAll('.cards-container .search-input');
    dashboardSearchInputs.forEach(input => {
        input.addEventListener('input', function() {
            console.log('Dashboard search:', this.value);
            // Add dashboard search functionality here if needed
        });
    });
    
    // Setup dropdown changes
    const dropdowns = document.querySelectorAll('.plant-dropdown, .department-dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', function() {
            console.log('Dropdown changed:', this.value);
            // Add dropdown functionality here if needed
        });
    });
});

// Add sample data for demonstration
function addSampleData() {
    // Sample assets data
    userData.assets.push({
        id: 1,
        srNumber: 'A001',
        assetsNumber: 'AST001',
        name: 'Dell Laptop',
        department: 'IT',
        hostname: 'DELL-001',
        username: 'john.doe',
        serialNumber: 'DL12345',
        device: 'Laptop'
    });
    
    // Sample software data
    userData.software.push({
        id: 1,
        srNumber: 'S001',
        softwareKey: 'SW12345',
        name: 'Microsoft Office',
        department: 'IT',
        hostname: 'DELL-001',
        username: 'john.doe',
        msOffice: 'Yes',
        autoCAD: 'No',
        cero: 'No',
        device: 'Laptop'
    });
    
    saveDataToStorage();
}

// Initialize sample data on first load
if (typeof(Storage) !== "undefined") {
    const existingData = localStorage.getItem('itAssetData');
    if (!existingData) {
        addSampleData();
    }
}