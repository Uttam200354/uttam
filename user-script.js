// Data storage arrays (shared with admin)
let assetsData = [];
let softwareData = [];
let serversData = [];
let switchesData = [];
let cctvData = [];
let printersData = [];

// Current editing item
let currentEditItem = null;
let currentEditType = null;
let userType = ''; // Will be set based on logged in user

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const currentUser = checkAuth();
    if (!currentUser || currentUser.role !== 'user') {
        window.location.href = 'index.html';
        return;
    }
    
    userType = currentUser.type;
    
    // Load data from localStorage
    loadAllData();
    
    // Initialize navigation
    initializeNavigation();
    
    // Show dashboard by default
    showSection('dashboard');
    
    // Populate tables
    populateAllTables();
});

function checkAuth() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        const currentTime = new Date().getTime();
        const sessionTime = user.timestamp;
        
        if (currentTime - sessionTime < 24 * 60 * 60 * 1000) {
            return user;
        } else {
            sessionStorage.removeItem('currentUser');
        }
    }
    return null;
}

function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function initializeNavigation() {
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            showSection(section);
            
            // Update active menu item
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Update page title
            const pageTitle = document.getElementById('pageTitle');
            pageTitle.textContent = this.textContent.trim();
        });
    });
}

function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Show selected section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.classList.add('active');
    }
}

// Data management functions
function loadAllData() {
    assetsData = JSON.parse(localStorage.getItem('assetsData')) || [];
    softwareData = JSON.parse(localStorage.getItem('softwareData')) || [];
    serversData = JSON.parse(localStorage.getItem('serversData')) || [];
    switchesData = JSON.parse(localStorage.getItem('switchesData')) || [];
    cctvData = JSON.parse(localStorage.getItem('cctvData')) || [];
    printersData = JSON.parse(localStorage.getItem('printersData')) || [];
}

function saveAllData() {
    localStorage.setItem('assetsData', JSON.stringify(assetsData));
    localStorage.setItem('softwareData', JSON.stringify(softwareData));
    localStorage.setItem('serversData', JSON.stringify(serversData));
    localStorage.setItem('switchesData', JSON.stringify(switchesData));
    localStorage.setItem('cctvData', JSON.stringify(cctvData));
    localStorage.setItem('printersData', JSON.stringify(printersData));
}

// Form toggle functions
function toggleAssetsForm() {
    const form = document.getElementById('assets-form');
    form.classList.toggle('show');
    if (form.classList.contains('show')) {
        form.querySelector('form').reset();
        currentEditItem = null;
        currentEditType = null;
    }
}

function toggleSoftwareForm() {
    const form = document.getElementById('software-form');
    form.classList.toggle('show');
    if (form.classList.contains('show')) {
        form.querySelector('form').reset();
        currentEditItem = null;
        currentEditType = null;
    }
}

function toggleServerTypeSelection() {
    const selection = document.getElementById('server-type-selection');
    selection.classList.toggle('show');
    
    // Hide server forms
    document.getElementById('sap-server-form').classList.remove('show');
    document.getElementById('non-sap-server-form').classList.remove('show');
}

function showSAPServerForm() {
    document.getElementById('server-type-selection').classList.remove('show');
    document.getElementById('sap-server-form').classList.add('show');
    document.getElementById('non-sap-server-form').classList.remove('show');
    currentEditItem = null;
    currentEditType = null;
}

function showNonSAPServerForm() {
    document.getElementById('server-type-selection').classList.remove('show');
    document.getElementById('non-sap-server-form').classList.add('show');
    document.getElementById('sap-server-form').classList.remove('show');
    currentEditItem = null;
    currentEditType = null;
}

// Save functions (same as admin)
function saveAssets(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const assetData = {
        id: currentEditItem ? currentEditItem.id : Date.now(),
        srNumber: formData.get('srNumber'),
        assetNumber: formData.get('assetNumber'),
        name: formData.get('name'),
        department: formData.get('department'),
        hostname: formData.get('hostname'),
        username: formData.get('username'),
        serialNumber: formData.get('serialNumber'),
        device: formData.get('device')
    };
    
    if (currentEditItem) {
        const index = assetsData.findIndex(item => item.id === currentEditItem.id);
        assetsData[index] = assetData;
    } else {
        assetsData.push(assetData);
    }
    
    saveAllData();
    populateAssetsTable();
    showSuccessMessage('assets-success');
    toggleAssetsForm();
}

function saveSoftware(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const softwareItem = {
        id: currentEditItem ? currentEditItem.id : Date.now(),
        srNumber: formData.get('srNumber'),
        softwareKey: formData.get('softwareKey'),
        name: formData.get('name'),
        department: formData.get('department'),
        hostname: formData.get('hostname'),
        username: formData.get('username'),
        msOffice: formData.get('msOffice'),
        autoCAD: formData.get('autoCAD'),
        cero: formData.get('cero'),
        device: formData.get('device')
    };
    
    if (currentEditItem) {
        const index = softwareData.findIndex(item => item.id === currentEditItem.id);
        softwareData[index] = softwareItem;
    } else {
        softwareData.push(softwareItem);
    }
    
    saveAllData();
    populateSoftwareTable();
    showSuccessMessage('software-success');
    toggleSoftwareForm();
}

function saveSAPServer(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const serverData = {
        id: currentEditItem ? currentEditItem.id : Date.now(),
        type: 'SAP',
        srNumber: formData.get('srNumber'),
        serverBrand: formData.get('serverBrand'),
        serialNumber: formData.get('serialNumber'),
        modelNumber: formData.get('modelNumber'),
        hardDisk: formData.get('hardDisk'),
        totalRAM: formData.get('totalRAM'),
        totalCPU: formData.get('totalCPU'),
        vm: 'N/A'
    };
    
    if (currentEditItem) {
        const index = serversData.findIndex(item => item.id === currentEditItem.id);
        serversData[index] = serverData;
    } else {
        serversData.push(serverData);
    }
    
    saveAllData();
    populateServersTable();
    showSuccessMessage('servers-success');
    document.getElementById('sap-server-form').classList.remove('show');
}

function saveNonSAPServer(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const serverData = {
        id: currentEditItem ? currentEditItem.id : Date.now(),
        type: 'Non-SAP',
        srNumber: formData.get('srNumber'),
        serverBrand: formData.get('serverBrand'),
        serialNumber: formData.get('serialNumber'),
        modelNumber: formData.get('modelNumber'),
        hardDisk: formData.get('hardDisk'),
        totalRAM: formData.get('totalRAM'),
        totalCPU: formData.get('totalCPU'),
        vm: formData.get('vm')
    };
    
    if (currentEditItem) {
        const index = serversData.findIndex(item => item.id === currentEditItem.id);
        serversData[index] = serverData;
    } else {
        serversData.push(serverData);
    }
    
    saveAllData();
    populateServersTable();
    showSuccessMessage('servers-success');
    document.getElementById('non-sap-server-form').classList.remove('show');
}

// Table population functions (with edit-only permissions)
function populateAllTables() {
    populateAssetsTable();
    populateSoftwareTable();
    populateServersTable();
}

function populateAssetsTable() {
    const tbody = document.getElementById('assets-tbody');
    tbody.innerHTML = '';
    
    assetsData.forEach(asset => {
        const row = `
            <tr>
                <td>${asset.srNumber}</td>
                <td>${asset.assetNumber}</td>
                <td>${asset.name}</td>
                <td>${asset.department}</td>
                <td>${asset.hostname}</td>
                <td>${asset.username}</td>
                <td>${asset.serialNumber}</td>
                <td>${asset.device}</td>
                <td class="action-buttons">
                    <button class="btn btn-warning" onclick="editAsset(${asset.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function populateSoftwareTable() {
    const tbody = document.getElementById('software-tbody');
    tbody.innerHTML = '';
    
    softwareData.forEach(software => {
        const row = `
            <tr>
                <td>${software.srNumber}</td>
                <td>${software.softwareKey}</td>
                <td>${software.name}</td>
                <td>${software.department}</td>
                <td>${software.hostname}</td>
                <td>${software.username}</td>
                <td>${software.msOffice}</td>
                <td>${software.autoCAD}</td>
                <td>${software.cero}</td>
                <td>${software.device}</td>
                <td class="action-buttons">
                    <button class="btn btn-warning" onclick="editSoftware(${software.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function populateServersTable() {
    const tbody = document.getElementById('servers-tbody');
    tbody.innerHTML = '';
    
    serversData.forEach(server => {
        const row = `
            <tr>
                <td>${server.srNumber}</td>
                <td>${server.type}</td>
                <td>${server.serverBrand}</td>
                <td>${server.serialNumber}</td>
                <td>${server.modelNumber}</td>
                <td>${server.hardDisk}</td>
                <td>${server.totalRAM}</td>
                <td>${server.totalCPU}</td>
                <td>${server.vm}</td>
                <td class="action-buttons">
                    <button class="btn btn-warning" onclick="editServer(${server.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Edit functions (same as admin)
function editAsset(id) {
    const asset = assetsData.find(item => item.id === id);
    if (asset) {
        currentEditItem = asset;
        currentEditType = 'assets';
        
        const form = document.getElementById('assets-form');
        const formElement = form.querySelector('form');
        
        formElement.querySelector('[name="srNumber"]').value = asset.srNumber;
        formElement.querySelector('[name="assetNumber"]').value = asset.assetNumber;
        formElement.querySelector('[name="name"]').value = asset.name;
        formElement.querySelector('[name="department"]').value = asset.department;
        formElement.querySelector('[name="hostname"]').value = asset.hostname;
        formElement.querySelector('[name="username"]').value = asset.username;
        formElement.querySelector('[name="serialNumber"]').value = asset.serialNumber;
        formElement.querySelector('[name="device"]').value = asset.device;
        
        form.classList.add('show');
    }
}

function editSoftware(id) {
    const software = softwareData.find(item => item.id === id);
    if (software) {
        currentEditItem = software;
        currentEditType = 'software';
        
        const form = document.getElementById('software-form');
        const formElement = form.querySelector('form');
        
        formElement.querySelector('[name="srNumber"]').value = software.srNumber;
        formElement.querySelector('[name="softwareKey"]').value = software.softwareKey;
        formElement.querySelector('[name="name"]').value = software.name;
        formElement.querySelector('[name="department"]').value = software.department;
        formElement.querySelector('[name="hostname"]').value = software.hostname;
        formElement.querySelector('[name="username"]').value = software.username;
        formElement.querySelector('[name="msOffice"]').value = software.msOffice;
        formElement.querySelector('[name="autoCAD"]').value = software.autoCAD;
        formElement.querySelector('[name="cero"]').value = software.cero;
        formElement.querySelector('[name="device"]').value = software.device;
        
        form.classList.add('show');
    }
}

function editServer(id) {
    const server = serversData.find(item => item.id === id);
    if (server) {
        currentEditItem = server;
        currentEditType = 'servers';
        
        if (server.type === 'SAP') {
            showSAPServerForm();
            const form = document.getElementById('sap-server-form');
            const formElement = form.querySelector('form');
            
            formElement.querySelector('[name="srNumber"]').value = server.srNumber;
            formElement.querySelector('[name="serverBrand"]').value = server.serverBrand;
            formElement.querySelector('[name="serialNumber"]').value = server.serialNumber;
            formElement.querySelector('[name="modelNumber"]').value = server.modelNumber;
            formElement.querySelector('[name="hardDisk"]').value = server.hardDisk;
            formElement.querySelector('[name="totalRAM"]').value = server.totalRAM;
            formElement.querySelector('[name="totalCPU"]').value = server.totalCPU;
        } else {
            showNonSAPServerForm();
            const form = document.getElementById('non-sap-server-form');
            const formElement = form.querySelector('form');
            
            formElement.querySelector('[name="srNumber"]').value = server.srNumber;
            formElement.querySelector('[name="serverBrand"]').value = server.serverBrand;
            formElement.querySelector('[name="serialNumber"]').value = server.serialNumber;
            formElement.querySelector('[name="modelNumber"]').value = server.modelNumber;
            formElement.querySelector('[name="hardDisk"]').value = server.hardDisk;
            formElement.querySelector('[name="totalRAM"]').value = server.totalRAM;
            formElement.querySelector('[name="totalCPU"]').value = server.totalCPU;
            formElement.querySelector('[name="vm"]').value = server.vm;
        }
    }
}

// Search and filter functions
function filterAssetsTable(searchTerm) {
    const tbody = document.getElementById('assets-tbody');
    const rows = tbody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function filterSoftwareTable(searchTerm) {
    const tbody = document.getElementById('software-tbody');
    const rows = tbody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function filterServersTable(searchTerm) {
    const tbody = document.getElementById('servers-tbody');
    const rows = tbody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Dashboard search functions
function searchAssets(searchTerm) {
    console.log('Searching assets:', searchTerm);
    // Implement global asset search
}

function searchSoftware(searchTerm) {
    console.log('Searching software:', searchTerm);
    // Implement global software search
}

function searchServers(searchTerm) {
    console.log('Searching servers:', searchTerm);
    // Implement global server search
}

function searchSwitches(searchTerm) {
    console.log('Searching switches:', searchTerm);
    // Implement global switches search
}

function searchCCTV(searchTerm) {
    console.log('Searching CCTV:', searchTerm);
    // Implement global CCTV search
}

function searchPrinters(searchTerm) {
    console.log('Searching printers:', searchTerm);
    // Implement global printers search
}

// Dashboard dropdown handlers
function handlePlantSelection(value) {
    console.log('Selected plant:', value);
    // Implement plant-based filtering
}

function handleDepartmentSelection(value) {
    console.log('Selected department:', value);
    // Implement department-based filtering
}

// Utility functions
function showSuccessMessage(elementId) {
    const successMessage = document.getElementById(elementId);
    successMessage.classList.add('show');
    
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}