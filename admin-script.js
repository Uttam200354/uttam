// Data storage arrays
let assetsData = [];
let softwareData = [];
let serversData = [];
let switchesData = [];
let cctvData = [];
let printersData = [];

// Current editing item
let currentEditItem = null;
let currentEditType = null;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const currentUser = checkAuth();
    if (!currentUser || currentUser.type !== 'admin') {
        window.location.href = 'index.html';
        return;
    }
    
    // Load data from localStorage
    loadAllData();
    
    // Initialize navigation
    initializeNavigation();
    
    // Show dashboard by default
    showSection('dashboard');
    
    // Populate tables
    populateAllTables();
    
    // Initialize dashboard counts
    setTimeout(() => {
        updateDashboardCounts();
    }, 500);
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

// Save functions
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

// Table population functions
function populateAllTables() {
    populateAssetsTable();
    populateSoftwareTable();
    populateServersTable();
    populateSwitchesTable();
    populateCCTVTable();
    populatePrintersTable();
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
                    <button class="btn btn-danger" onclick="deleteAsset(${asset.id})">
                        <i class="fas fa-trash"></i> Delete
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
                    <button class="btn btn-danger" onclick="deleteSoftware(${software.id})">
                        <i class="fas fa-trash"></i> Delete
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
                    <button class="btn btn-danger" onclick="deleteServer(${server.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Edit functions
function editAsset(id) {
    const asset = assetsData.find(item => item.id === id);
    if (asset) {
        currentEditItem = asset;
        currentEditType = 'assets';
        
        const form = document.getElementById('assets-form');
        const formElement = form.querySelector('form');
        
        // Populate form fields
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
        
        // Populate form fields
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

// Delete functions
function deleteAsset(id) {
    if (confirm('Are you sure you want to delete this asset?')) {
        assetsData = assetsData.filter(item => item.id !== id);
        saveAllData();
        populateAssetsTable();
    }
}

function deleteSoftware(id) {
    if (confirm('Are you sure you want to delete this software record?')) {
        softwareData = softwareData.filter(item => item.id !== id);
        saveAllData();
        populateSoftwareTable();
    }
}

function deleteServer(id) {
    if (confirm('Are you sure you want to delete this server record?')) {
        serversData = serversData.filter(item => item.id !== id);
        saveAllData();
        populateServersTable();
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

// Dashboard search functions with real-time filtering
function searchAssets(searchTerm) {
    if (!searchTerm) {
        updateDashboardCounts();
        return;
    }
    
    const filteredAssets = assetsData.filter(asset => 
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.assetNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.device.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    updateDashboardCard('assets', filteredAssets.length, searchTerm);
    if (filteredAssets.length > 0) {
        showSearchResults('Assets', filteredAssets);
    }
}

function searchSoftware(searchTerm) {
    if (!searchTerm) {
        updateDashboardCounts();
        return;
    }
    
    const filteredSoftware = softwareData.filter(software => 
        software.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        software.softwareKey.toLowerCase().includes(searchTerm.toLowerCase()) ||
        software.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    updateDashboardCard('software', filteredSoftware.length, searchTerm);
    if (filteredSoftware.length > 0) {
        showSearchResults('Software', filteredSoftware);
    }
}

function searchServers(searchTerm) {
    if (!searchTerm) {
        updateDashboardCounts();
        return;
    }
    
    const filteredServers = serversData.filter(server => 
        server.serverBrand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        server.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        server.modelNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    updateDashboardCard('servers', filteredServers.length, searchTerm);
    if (filteredServers.length > 0) {
        showSearchResults('Servers', filteredServers);
    }
}

function searchSwitches(searchTerm) {
    if (!searchTerm) {
        updateDashboardCounts();
        return;
    }
    
    const filteredSwitches = switchesData.filter(switches => 
        switches.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        switches.switchesId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        switches.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        switches.plant.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    updateDashboardCard('switches', filteredSwitches.length, searchTerm);
    if (filteredSwitches.length > 0) {
        showSearchResults('Switches', filteredSwitches);
    }
}

function searchCCTV(searchTerm) {
    if (!searchTerm) {
        updateDashboardCounts();
        return;
    }
    
    const filteredCCTV = cctvData.filter(cctv => 
        cctv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cctv.cctvId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cctv.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cctv.plant.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    updateDashboardCard('cctv', filteredCCTV.length, searchTerm);
    if (filteredCCTV.length > 0) {
        showSearchResults('CCTV', filteredCCTV);
    }
}

function searchPrinters(searchTerm) {
    if (!searchTerm) {
        updateDashboardCounts();
        return;
    }
    
    const filteredPrinters = printersData.filter(printer => 
        printer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        printer.printerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        printer.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        printer.plant.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    updateDashboardCard('printers', filteredPrinters.length, searchTerm);
    if (filteredPrinters.length > 0) {
        showSearchResults('Printers', filteredPrinters);
    }
}

// Dashboard dropdown handlers with real filtering
function handlePlantSelection(value) {
    if (!value) {
        updateDashboardCounts();
        return;
    }
    
    const plantFilteredData = {
        switches: switchesData.filter(item => item.plant === value),
        cctv: cctvData.filter(item => item.plant === value),
        printers: printersData.filter(item => item.plant === value)
    };
    
    updateDashboardCard('switches', plantFilteredData.switches.length, `Plant: ${value}`);
    updateDashboardCard('cctv', plantFilteredData.cctv.length, `Plant: ${value}`);
    updateDashboardCard('printers', plantFilteredData.printers.length, `Plant: ${value}`);
    
    showNotification(`Filtered by ${value}`, 'info');
}

function handleDepartmentSelection(value) {
    if (!value) {
        updateDashboardCounts();
        return;
    }
    
    const deptFilteredData = {
        assets: assetsData.filter(item => item.department === value),
        software: softwareData.filter(item => item.department === value),
        switches: switchesData.filter(item => item.department === value),
        cctv: cctvData.filter(item => item.department === value),
        printers: printersData.filter(item => item.department === value)
    };
    
    updateDashboardCard('assets', deptFilteredData.assets.length, `Dept: ${value}`);
    updateDashboardCard('software', deptFilteredData.software.length, `Dept: ${value}`);
    updateDashboardCard('switches', deptFilteredData.switches.length, `Dept: ${value}`);
    updateDashboardCard('cctv', deptFilteredData.cctv.length, `Dept: ${value}`);
    updateDashboardCard('printers', deptFilteredData.printers.length, `Dept: ${value}`);
    
    showNotification(`Filtered by ${value} Department`, 'info');
}

// Helper functions for dashboard interactivity
function updateDashboardCounts() {
    updateDashboardCard('assets', assetsData.length);
    updateDashboardCard('software', softwareData.length);
    updateDashboardCard('servers', serversData.length);
    updateDashboardCard('switches', switchesData.length);
    updateDashboardCard('cctv', cctvData.length);
    updateDashboardCard('printers', printersData.length);
}

function updateDashboardCard(cardType, count, filter = '') {
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(cardType)) {
            const existingCount = card.querySelector('.count-badge');
            if (existingCount) {
                existingCount.remove();
            }
            
            const countBadge = document.createElement('span');
            countBadge.className = 'count-badge';
            countBadge.textContent = filter ? `${count} (${filter})` : count;
            countBadge.style.cssText = `
                background: linear-gradient(45deg, #e74c3c, #f39c12);
                color: white;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: bold;
                margin-left: 10px;
                animation: pulse 2s infinite;
            `;
            
            card.querySelector('h3').appendChild(countBadge);
        }
    });
}

function showSearchResults(type, results) {
    const notification = document.createElement('div');
    notification.className = 'search-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #27ae60, #2ecc71);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.5s ease;
    `;
    notification.innerHTML = `
        <strong>${type} Search Results</strong><br>
        Found ${results.length} matching item${results.length !== 1 ? 's' : ''}
        <button onclick="this.parentElement.remove()" style="
            background: none;
            border: none;
            color: white;
            float: right;
            font-size: 18px;
            cursor: pointer;
            margin-left: 10px;
        ">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function showNotification(message, type = 'success') {
    const colors = {
        success: 'linear-gradient(45deg, #27ae60, #2ecc71)',
        info: 'linear-gradient(45deg, #3498db, #2980b9)',
        warning: 'linear-gradient(45deg, #f39c12, #e67e22)',
        error: 'linear-gradient(45deg, #e74c3c, #c0392b)'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.5s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Additional form toggle functions
function toggleSwitchesForm() {
    const form = document.getElementById('switches-form');
    form.classList.toggle('show');
    if (form.classList.contains('show')) {
        form.querySelector('form').reset();
        currentEditItem = null;
        currentEditType = null;
    }
}

function toggleCCTVForm() {
    const form = document.getElementById('cctv-form');
    form.classList.toggle('show');
    if (form.classList.contains('show')) {
        form.querySelector('form').reset();
        currentEditItem = null;
        currentEditType = null;
    }
}

function togglePrintersForm() {
    const form = document.getElementById('printers-form');
    form.classList.toggle('show');
    if (form.classList.contains('show')) {
        form.querySelector('form').reset();
        currentEditItem = null;
        currentEditType = null;
    }
}

// Additional save functions
function saveSwitches(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const switchesItem = {
        id: currentEditItem ? currentEditItem.id : Date.now(),
        srNumber: formData.get('srNumber'),
        switchesId: formData.get('switchesId'),
        name: formData.get('name'),
        department: formData.get('department'),
        hostname: formData.get('hostname'),
        username: formData.get('username'),
        plant: formData.get('plant'),
        device: formData.get('device')
    };
    
    if (currentEditItem) {
        const index = switchesData.findIndex(item => item.id === currentEditItem.id);
        switchesData[index] = switchesItem;
    } else {
        switchesData.push(switchesItem);
    }
    
    saveAllData();
    populateSwitchesTable();
    showSuccessMessage('switches-success');
    toggleSwitchesForm();
}

function saveCCTV(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const cctvItem = {
        id: currentEditItem ? currentEditItem.id : Date.now(),
        srNumber: formData.get('srNumber'),
        cctvId: formData.get('cctvId'),
        name: formData.get('name'),
        department: formData.get('department'),
        hostname: formData.get('hostname'),
        username: formData.get('username'),
        plant: formData.get('plant'),
        device: formData.get('device')
    };
    
    if (currentEditItem) {
        const index = cctvData.findIndex(item => item.id === currentEditItem.id);
        cctvData[index] = cctvItem;
    } else {
        cctvData.push(cctvItem);
    }
    
    saveAllData();
    populateCCTVTable();
    showSuccessMessage('cctv-success');
    toggleCCTVForm();
}

function savePrinters(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const printerItem = {
        id: currentEditItem ? currentEditItem.id : Date.now(),
        srNumber: formData.get('srNumber'),
        printerId: formData.get('printerId'),
        name: formData.get('name'),
        department: formData.get('department'),
        hostname: formData.get('hostname'),
        username: formData.get('username'),
        plant: formData.get('plant'),
        device: formData.get('device')
    };
    
    if (currentEditItem) {
        const index = printersData.findIndex(item => item.id === currentEditItem.id);
        printersData[index] = printerItem;
    } else {
        printersData.push(printerItem);
    }
    
    saveAllData();
    populatePrintersTable();
    showSuccessMessage('printers-success');
    togglePrintersForm();
}

// Additional table population functions
function populateSwitchesTable() {
    const tbody = document.getElementById('switches-tbody');
    tbody.innerHTML = '';
    
    switchesData.forEach(switches => {
        const row = `
            <tr>
                <td>${switches.srNumber}</td>
                <td>${switches.switchesId}</td>
                <td>${switches.name}</td>
                <td>${switches.department}</td>
                <td>${switches.hostname}</td>
                <td>${switches.username}</td>
                <td>${switches.plant}</td>
                <td>${switches.device}</td>
                <td class="action-buttons">
                    <button class="btn btn-warning" onclick="editSwitches(${switches.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger" onclick="deleteSwitches(${switches.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function populateCCTVTable() {
    const tbody = document.getElementById('cctv-tbody');
    tbody.innerHTML = '';
    
    cctvData.forEach(cctv => {
        const row = `
            <tr>
                <td>${cctv.srNumber}</td>
                <td>${cctv.cctvId}</td>
                <td>${cctv.name}</td>
                <td>${cctv.department}</td>
                <td>${cctv.hostname}</td>
                <td>${cctv.username}</td>
                <td>${cctv.plant}</td>
                <td>${cctv.device}</td>
                <td class="action-buttons">
                    <button class="btn btn-warning" onclick="editCCTV(${cctv.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger" onclick="deleteCCTV(${cctv.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function populatePrintersTable() {
    const tbody = document.getElementById('printers-tbody');
    tbody.innerHTML = '';
    
    printersData.forEach(printer => {
        const row = `
            <tr>
                <td>${printer.srNumber}</td>
                <td>${printer.printerId}</td>
                <td>${printer.name}</td>
                <td>${printer.department}</td>
                <td>${printer.hostname}</td>
                <td>${printer.username}</td>
                <td>${printer.plant}</td>
                <td>${printer.device}</td>
                <td class="action-buttons">
                    <button class="btn btn-warning" onclick="editPrinter(${printer.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger" onclick="deletePrinter(${printer.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Additional edit functions
function editSwitches(id) {
    const switches = switchesData.find(item => item.id === id);
    if (switches) {
        currentEditItem = switches;
        currentEditType = 'switches';
        
        const form = document.getElementById('switches-form');
        const formElement = form.querySelector('form');
        
        formElement.querySelector('[name="srNumber"]').value = switches.srNumber;
        formElement.querySelector('[name="switchesId"]').value = switches.switchesId;
        formElement.querySelector('[name="name"]').value = switches.name;
        formElement.querySelector('[name="department"]').value = switches.department;
        formElement.querySelector('[name="hostname"]').value = switches.hostname;
        formElement.querySelector('[name="username"]').value = switches.username;
        formElement.querySelector('[name="plant"]').value = switches.plant;
        formElement.querySelector('[name="device"]').value = switches.device;
        
        form.classList.add('show');
    }
}

function editCCTV(id) {
    const cctv = cctvData.find(item => item.id === id);
    if (cctv) {
        currentEditItem = cctv;
        currentEditType = 'cctv';
        
        const form = document.getElementById('cctv-form');
        const formElement = form.querySelector('form');
        
        formElement.querySelector('[name="srNumber"]').value = cctv.srNumber;
        formElement.querySelector('[name="cctvId"]').value = cctv.cctvId;
        formElement.querySelector('[name="name"]').value = cctv.name;
        formElement.querySelector('[name="department"]').value = cctv.department;
        formElement.querySelector('[name="hostname"]').value = cctv.hostname;
        formElement.querySelector('[name="username"]').value = cctv.username;
        formElement.querySelector('[name="plant"]').value = cctv.plant;
        formElement.querySelector('[name="device"]').value = cctv.device;
        
        form.classList.add('show');
    }
}

function editPrinter(id) {
    const printer = printersData.find(item => item.id === id);
    if (printer) {
        currentEditItem = printer;
        currentEditType = 'printers';
        
        const form = document.getElementById('printers-form');
        const formElement = form.querySelector('form');
        
        formElement.querySelector('[name="srNumber"]').value = printer.srNumber;
        formElement.querySelector('[name="printerId"]').value = printer.printerId;
        formElement.querySelector('[name="name"]').value = printer.name;
        formElement.querySelector('[name="department"]').value = printer.department;
        formElement.querySelector('[name="hostname"]').value = printer.hostname;
        formElement.querySelector('[name="username"]').value = printer.username;
        formElement.querySelector('[name="plant"]').value = printer.plant;
        formElement.querySelector('[name="device"]').value = printer.device;
        
        form.classList.add('show');
    }
}

// Additional delete functions
function deleteSwitches(id) {
    if (confirm('Are you sure you want to delete this switches record?')) {
        switchesData = switchesData.filter(item => item.id !== id);
        saveAllData();
        populateSwitchesTable();
    }
}

function deleteCCTV(id) {
    if (confirm('Are you sure you want to delete this CCTV record?')) {
        cctvData = cctvData.filter(item => item.id !== id);
        saveAllData();
        populateCCTVTable();
    }
}

function deletePrinter(id) {
    if (confirm('Are you sure you want to delete this printer record?')) {
        printersData = printersData.filter(item => item.id !== id);
        saveAllData();
        populatePrintersTable();
    }
}

// Additional filter functions
function filterSwitchesTable(searchTerm) {
    const tbody = document.getElementById('switches-tbody');
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

function filterCCTVTable(searchTerm) {
    const tbody = document.getElementById('cctv-tbody');
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

function filterPrintersTable(searchTerm) {
    const tbody = document.getElementById('printers-tbody');
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

// Utility functions
function showSuccessMessage(elementId) {
    const successMessage = document.getElementById(elementId);
    successMessage.classList.add('show');
    
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}