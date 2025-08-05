// Deepak Dashboard JavaScript - ACGL Management System

// Global variables
let currentSection = 'dashboard';
let currentPlant = null;
let assetsData = [];
let softwareLicensesData = [];
let sapServersData = [];
let nonSapServersData = [];
let switchesData = [];
let cctvData = [];
let printersData = [];
let plantAssetsData = [];

// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

function initializeDashboard() {
    // Check authentication
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');
    
    if (!isLoggedIn || currentUser !== 'deepak') {
        window.location.href = 'index.html';
        return;
    }
    
    // Load dashboard stats
    loadDashboardStats();
    
    // Load initial data
    loadAssets();
    loadSoftwareLicenses();
    loadSapServers();
    loadNonSapServers();
    loadSwitches();
    loadCctv();
    loadPrinters();
    loadPlants();
    loadDepartments();
}

function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('datetime').textContent = dateTimeString;
}

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(`${sectionName}-section`).classList.add('active');
    
    // Add active class to nav link
    event.target.classList.add('active');
    
    currentSection = sectionName;
    
    // Load section-specific data
    switch(sectionName) {
        case 'dashboard':
            loadDashboardStats();
            break;
        case 'assets':
            loadAssets();
            break;
        case 'software':
            loadSoftwareLicenses();
            break;
        case 'servers':
            loadSapServers();
            loadNonSapServers();
            break;
        case 'switches':
            loadSwitches();
            break;
        case 'cctv':
            loadCctv();
            break;
        case 'printers':
            loadPrinters();
            break;
    }
}

// Dashboard Stats
async function loadDashboardStats() {
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
        const data = await response.json();
        
        if (data.success) {
            updateDashboardStats(data.stats);
        }
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
        // Use mock data if API is not available
        updateDashboardStats({
            assets: 25,
            software_licenses: 15,
            servers: 8,
            switches: 12,
            cctv: 20,
            printers: 10,
            plants: 4,
            departments: 6
        });
    }
}

function updateDashboardStats(stats) {
    document.getElementById('assetsCount').textContent = stats.assets || 0;
    document.getElementById('softwareCount').textContent = stats.software_licenses || 0;
    document.getElementById('serversCount').textContent = stats.servers || 0;
    document.getElementById('switchesCount').textContent = stats.switches || 0;
    document.getElementById('cctvCount').textContent = stats.cctv || 0;
    document.getElementById('printersCount').textContent = stats.printers || 0;
    document.getElementById('plantsCount').textContent = stats.plants || 0;
    document.getElementById('departmentsCount').textContent = stats.departments || 0;
}

// Plant Management
function selectPlant() {
    const plantSelect = document.getElementById('plantSelect');
    const selectedPlant = plantSelect.value;
    
    if (selectedPlant) {
        currentPlant = selectedPlant;
        loadPlantAssets(selectedPlant);
        showPlantDetails(selectedPlant);
    }
}

async function loadPlantAssets(plantId) {
    try {
        const response = await fetch(`${API_BASE_URL}/plant-assets/${plantId}`);
        const data = await response.json();
        
        if (data.success) {
            plantAssetsData = data.assets;
            displayPlantAssets(plantAssetsData);
        }
    } catch (error) {
        console.error('Error loading plant assets:', error);
        showNotification('Error loading plant assets', 'error');
    }
}

function showPlantDetails(plantName) {
    const plantDetailsSection = document.getElementById('plant-details-section');
    if (plantDetailsSection) {
        plantDetailsSection.innerHTML = `
            <div class="form-container">
                <h3 class="form-title"><i class="fas fa-industry"></i> ${plantName} Asset Management</h3>
                <div class="plant-selection">
                    <div class="plant-card active">
                        <h4>${plantName}</h4>
                        <p>Asset Management</p>
                    </div>
                </div>
                
                <div class="form-container">
                    <h4>Add New Asset</h4>
                    <form id="plantAssetForm">
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Asset Name</label>
                                <input type="text" id="plantAssetName" required>
                            </div>
                            <div class="form-group">
                                <label>Employee Name</label>
                                <input type="text" id="plantEmployeeName" required>
                            </div>
                            <div class="form-group">
                                <label>Department</label>
                                <select id="plantDepartment">
                                    <option value="">Select Department</option>
                                    <option value="IT">IT Department</option>
                                    <option value="HR">HR Department</option>
                                    <option value="Finance">Finance Department</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Username</label>
                                <input type="text" id="plantUsername">
                            </div>
                            <div class="form-group">
                                <label>Serial Number</label>
                                <input type="text" id="plantSerialNumber">
                            </div>
                            <div class="form-group">
                                <label>Device Type</label>
                                <input type="text" id="plantDeviceType">
                            </div>
                            <div class="form-group">
                                <label>Hostname</label>
                                <input type="text" id="plantHostname">
                            </div>
                            <div class="form-group">
                                <label>Last Name</label>
                                <input type="text" id="plantLastName">
                            </div>
                        </div>
                        <div class="form-buttons">
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save"></i> Save Asset
                            </button>
                        </div>
                    </form>
                </div>
                
                <div class="table-container">
                    <div class="table-header">
                        <h3><i class="fas fa-table"></i> Plant Assets</h3>
                        <input type="text" class="search-input" placeholder="Search assets..." onkeyup="searchPlantAssets(this.value)">
                    </div>
                    <div id="plantAssetsTable"></div>
                </div>
            </div>
        `;
        
        // Add form event listener
        document.getElementById('plantAssetForm').addEventListener('submit', handlePlantAssetSubmit);
    }
}

function handlePlantAssetSubmit(e) {
    e.preventDefault();
    
    const assetData = {
        asset_name: document.getElementById('plantAssetName').value,
        employee_name: document.getElementById('plantEmployeeName').value,
        department: document.getElementById('plantDepartment').value,
        username: document.getElementById('plantUsername').value,
        serial_number: document.getElementById('plantSerialNumber').value,
        device_type: document.getElementById('plantDeviceType').value,
        hostname: document.getElementById('plantHostname').value,
        last_name: document.getElementById('plantLastName').value
    };
    
    createPlantAsset(assetData);
}

async function createPlantAsset(assetData) {
    try {
        const response = await fetch(`${API_BASE_URL}/plant-assets/${currentPlant}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(assetData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Plant asset created successfully!', 'success');
            document.getElementById('plantAssetForm').reset();
            loadPlantAssets(currentPlant);
        } else {
            showNotification(data.error || 'Error creating plant asset', 'error');
        }
    } catch (error) {
        console.error('Error creating plant asset:', error);
        showNotification('Error creating plant asset', 'error');
    }
}

function displayPlantAssets(assets) {
    const tableContainer = document.getElementById('plantAssetsTable');
    
    if (assets.length === 0) {
        tableContainer.innerHTML = '<p class="text-center">No assets found for this plant.</p>';
        return;
    }
    
    const tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>SR No</th>
                    <th>Asset Name</th>
                    <th>Employee Name</th>
                    <th>Department</th>
                    <th>Username</th>
                    <th>Serial Number</th>
                    <th>Device Type</th>
                    <th>Hostname</th>
                    <th>Last Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${assets.map(asset => `
                    <tr>
                        <td>${asset.sr_no}</td>
                        <td>${asset.asset_name}</td>
                        <td>${asset.employee_name || '-'}</td>
                        <td>${asset.department || '-'}</td>
                        <td>${asset.username || '-'}</td>
                        <td>${asset.serial_number || '-'}</td>
                        <td>${asset.device_type || '-'}</td>
                        <td>${asset.hostname || '-'}</td>
                        <td>${asset.last_name || '-'}</td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-sm btn-primary" onclick="editPlantAsset(${asset.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    tableContainer.innerHTML = tableHTML;
}

function searchPlantAssets(query) {
    const filteredAssets = plantAssetsData.filter(asset => 
        asset.asset_name.toLowerCase().includes(query.toLowerCase()) ||
        asset.employee_name?.toLowerCase().includes(query.toLowerCase()) ||
        asset.hostname?.toLowerCase().includes(query.toLowerCase())
    );
    displayPlantAssets(filteredAssets);
}

// Assets Management
async function loadAssets() {
    try {
        const response = await fetch(`${API_BASE_URL}/assets`);
        const data = await response.json();
        
        if (data.success) {
            assetsData = data.assets;
            displayAssets(assetsData);
        }
    } catch (error) {
        console.error('Error loading assets:', error);
        showNotification('Error loading assets', 'error');
    }
}

function displayAssets(assets) {
    const tableContainer = document.getElementById('assetsTable');
    
    if (!tableContainer) return;
    
    if (assets.length === 0) {
        tableContainer.innerHTML = '<p class="text-center">No assets found.</p>';
        return;
    }
    
    const tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>SR No</th>
                    <th>Asset Number</th>
                    <th>Asset Name</th>
                    <th>Department</th>
                    <th>Plant</th>
                    <th>Hostname</th>
                    <th>Username</th>
                    <th>Serial Number</th>
                    <th>Device Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${assets.map(asset => `
                    <tr>
                        <td>${asset.sr_no}</td>
                        <td>${asset.asset_number}</td>
                        <td>${asset.asset_name}</td>
                        <td>${asset.department_name || '-'}</td>
                        <td>${asset.plant_name || '-'}</td>
                        <td>${asset.hostname || '-'}</td>
                        <td>${asset.username || '-'}</td>
                        <td>${asset.serial_number || '-'}</td>
                        <td>${asset.device_type || '-'}</td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-sm btn-primary" onclick="editAsset(${asset.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    tableContainer.innerHTML = tableHTML;
}

function showCreateAssetForm() {
    const assetsSection = document.getElementById('assets-section');
    assetsSection.innerHTML = `
        <div class="form-container">
            <h3 class="form-title"><i class="fas fa-plus"></i> Create Asset Details</h3>
            <form id="assetForm">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Asset Number</label>
                        <input type="text" id="assetNumber" required>
                    </div>
                    <div class="form-group">
                        <label>Asset Name</label>
                        <input type="text" id="assetName" required>
                    </div>
                    <div class="form-group">
                        <label>Department</label>
                        <select id="assetDepartment">
                            <option value="">Select Department</option>
                            <option value="IT">IT Department</option>
                            <option value="HR">HR Department</option>
                            <option value="Finance">Finance Department</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Plant</label>
                        <select id="assetPlant">
                            <option value="">Select Plant</option>
                            <option value="1">Plant 1</option>
                            <option value="2">Plant 2</option>
                            <option value="3">Dharwad</option>
                            <option value="4">Jejuri</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Hostname</label>
                        <input type="text" id="assetHostname">
                    </div>
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" id="assetUsername">
                    </div>
                    <div class="form-group">
                        <label>Serial Number</label>
                        <input type="text" id="assetSerialNumber">
                    </div>
                    <div class="form-group">
                        <label>Device Type</label>
                        <input type="text" id="assetDeviceType">
                    </div>
                </div>
                <div class="form-buttons">
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i> Save Asset
                    </button>
                    <button type="button" class="btn btn-secondary" onclick="showAssetsList()">
                        <i class="fas fa-list"></i> Back to List
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.getElementById('assetForm').addEventListener('submit', handleAssetSubmit);
}

function handleAssetSubmit(e) {
    e.preventDefault();
    
    const assetData = {
        asset_number: document.getElementById('assetNumber').value,
        asset_name: document.getElementById('assetName').value,
        department_id: document.getElementById('assetDepartment').value,
        plant_id: document.getElementById('assetPlant').value,
        hostname: document.getElementById('assetHostname').value,
        username: document.getElementById('assetUsername').value,
        serial_number: document.getElementById('assetSerialNumber').value,
        device_type: document.getElementById('assetDeviceType').value
    };
    
    createAsset(assetData);
}

async function createAsset(assetData) {
    try {
        const response = await fetch(`${API_BASE_URL}/assets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(assetData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Asset created successfully!', 'success');
            showAssetsList();
            loadAssets();
        } else {
            showNotification(data.error || 'Error creating asset', 'error');
        }
    } catch (error) {
        console.error('Error creating asset:', error);
        showNotification('Error creating asset', 'error');
    }
}

function showAssetsList() {
    const assetsSection = document.getElementById('assets-section');
    assetsSection.innerHTML = `
        <div class="cards-grid">
            <div class="card">
                <div class="card-header">
                    <h3><i class="fas fa-laptop"></i> Assets</h3>
                    <div class="card-actions">
                        <input type="text" placeholder="Search assets..." class="search-input" onkeyup="searchAssets(this.value)">
                        <button class="btn btn-primary" onclick="showCreateAssetForm()">
                            <i class="fas fa-plus"></i> Create Asset
                        </button>
                    </div>
                </div>
                <div class="card-content">
                    <div class="stat-number" id="assetsCount">0</div>
                    <p>Total Assets</p>
                </div>
            </div>
        </div>
        
        <div class="table-container">
            <div class="table-header">
                <h3><i class="fas fa-table"></i> Assets List</h3>
            </div>
            <div id="assetsTable"></div>
        </div>
    `;
    
    loadAssets();
}

function searchAssets(query) {
    const filteredAssets = assetsData.filter(asset => 
        asset.asset_name.toLowerCase().includes(query.toLowerCase()) ||
        asset.asset_number.toLowerCase().includes(query.toLowerCase()) ||
        asset.hostname?.toLowerCase().includes(query.toLowerCase())
    );
    displayAssets(filteredAssets);
}

// Software Licenses Management
async function loadSoftwareLicenses() {
    try {
        const response = await fetch(`${API_BASE_URL}/software-licenses`);
        const data = await response.json();
        
        if (data.success) {
            softwareLicensesData = data.licenses;
            displaySoftwareLicenses(softwareLicensesData);
        }
    } catch (error) {
        console.error('Error loading software licenses:', error);
        showNotification('Error loading software licenses', 'error');
    }
}

function displaySoftwareLicenses(licenses) {
    const tableContainer = document.getElementById('softwareLicensesTable');
    
    if (!tableContainer) return;
    
    if (licenses.length === 0) {
        tableContainer.innerHTML = '<p class="text-center">No software licenses found.</p>';
        return;
    }
    
    const tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>SR No</th>
                    <th>Software Key</th>
                    <th>Software Name</th>
                    <th>Department</th>
                    <th>Plant</th>
                    <th>Hostname</th>
                    <th>Username</th>
                    <th>MS Office</th>
                    <th>AutoCAD</th>
                    <th>Creo</th>
                    <th>Device Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${licenses.map(license => `
                    <tr>
                        <td>${license.sr_no}</td>
                        <td>${license.software_key}</td>
                        <td>${license.software_name}</td>
                        <td>${license.department_name || '-'}</td>
                        <td>${license.plant_name || '-'}</td>
                        <td>${license.hostname || '-'}</td>
                        <td>${license.username || '-'}</td>
                        <td>${license.ms_office ? 'Yes' : 'No'}</td>
                        <td>${license.autocad ? 'Yes' : 'No'}</td>
                        <td>${license.creo ? 'Yes' : 'No'}</td>
                        <td>${license.device_type || '-'}</td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-sm btn-primary" onclick="editSoftwareLicense(${license.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    tableContainer.innerHTML = tableHTML;
}

// Server Management
async function loadSapServers() {
    try {
        const response = await fetch(`${API_BASE_URL}/servers/sap`);
        const data = await response.json();
        
        if (data.success) {
            sapServersData = data.servers;
            displaySapServers(sapServersData);
        }
    } catch (error) {
        console.error('Error loading SAP servers:', error);
        showNotification('Error loading SAP servers', 'error');
    }
}

async function loadNonSapServers() {
    try {
        const response = await fetch(`${API_BASE_URL}/servers/non-sap`);
        const data = await response.json();
        
        if (data.success) {
            nonSapServersData = data.servers;
            displayNonSapServers(nonSapServersData);
        }
    } catch (error) {
        console.error('Error loading Non-SAP servers:', error);
        showNotification('Error loading Non-SAP servers', 'error');
    }
}

function displaySapServers(servers) {
    const tableContainer = document.getElementById('sapServersTable');
    
    if (!tableContainer) return;
    
    if (servers.length === 0) {
        tableContainer.innerHTML = '<p class="text-center">No SAP servers found.</p>';
        return;
    }
    
    const tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>SR No</th>
                    <th>Server Brand</th>
                    <th>Serial Number</th>
                    <th>Model Number</th>
                    <th>Hard Disk</th>
                    <th>Total RAM</th>
                    <th>Total CPU</th>
                    <th>Plant</th>
                    <th>Department</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${servers.map(server => `
                    <tr>
                        <td>${server.sr_no}</td>
                        <td>${server.server_brand || '-'}</td>
                        <td>${server.serial_number || '-'}</td>
                        <td>${server.model_number || '-'}</td>
                        <td>${server.hard_disk_capacity || '-'}</td>
                        <td>${server.total_ram || '-'}</td>
                        <td>${server.total_cpu || '-'}</td>
                        <td>${server.plant_name || '-'}</td>
                        <td>${server.department_name || '-'}</td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-sm btn-primary" onclick="editSapServer(${server.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    tableContainer.innerHTML = tableHTML;
}

function displayNonSapServers(servers) {
    const tableContainer = document.getElementById('nonSapServersTable');
    
    if (!tableContainer) return;
    
    if (servers.length === 0) {
        tableContainer.innerHTML = '<p class="text-center">No Non-SAP servers found.</p>';
        return;
    }
    
    const tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>SR No</th>
                    <th>Server Brand</th>
                    <th>Serial Number</th>
                    <th>Model Number</th>
                    <th>Hard Disk</th>
                    <th>Total RAM</th>
                    <th>Total CPU</th>
                    <th>VM Count</th>
                    <th>Plant</th>
                    <th>Department</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${servers.map(server => `
                    <tr>
                        <td>${server.sr_no}</td>
                        <td>${server.server_brand || '-'}</td>
                        <td>${server.serial_number || '-'}</td>
                        <td>${server.model_number || '-'}</td>
                        <td>${server.hard_disk_capacity || '-'}</td>
                        <td>${server.total_ram || '-'}</td>
                        <td>${server.total_cpu || '-'}</td>
                        <td>${server.vm_count || '-'}</td>
                        <td>${server.plant_name || '-'}</td>
                        <td>${server.department_name || '-'}</td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-sm btn-primary" onclick="editNonSapServer(${server.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    tableContainer.innerHTML = tableHTML;
}

// Switches Management
async function loadSwitches() {
    try {
        const response = await fetch(`${API_BASE_URL}/switches`);
        const data = await response.json();
        
        if (data.success) {
            switchesData = data.switches;
            displaySwitches(switchesData);
        }
    } catch (error) {
        console.error('Error loading switches:', error);
        showNotification('Error loading switches', 'error');
    }
}

function displaySwitches(switches) {
    const tableContainer = document.getElementById('switchesTable');
    
    if (!tableContainer) return;
    
    if (switches.length === 0) {
        tableContainer.innerHTML = '<p class="text-center">No switches found.</p>';
        return;
    }
    
    const tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>SR No</th>
                    <th>Switch ID</th>
                    <th>Switch Name</th>
                    <th>Department</th>
                    <th>Plant</th>
                    <th>Hostname</th>
                    <th>Username</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${switches.map(switch_item => `
                    <tr>
                        <td>${switch_item.sr_no}</td>
                        <td>${switch_item.switch_id}</td>
                        <td>${switch_item.switch_name || '-'}</td>
                        <td>${switch_item.department_name || '-'}</td>
                        <td>${switch_item.plant_name || '-'}</td>
                        <td>${switch_item.hostname || '-'}</td>
                        <td>${switch_item.username || '-'}</td>
                        <td>${switch_item.switch_brand || '-'}</td>
                        <td>${switch_item.model_number || '-'}</td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-sm btn-primary" onclick="editSwitch(${switch_item.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    tableContainer.innerHTML = tableHTML;
}

// CCTV Management
async function loadCctv() {
    try {
        const response = await fetch(`${API_BASE_URL}/cctv`);
        const data = await response.json();
        
        if (data.success) {
            cctvData = data.cameras;
            displayCctv(cctvData);
        }
    } catch (error) {
        console.error('Error loading CCTV:', error);
        showNotification('Error loading CCTV', 'error');
    }
}

function displayCctv(cameras) {
    const tableContainer = document.getElementById('cctvTable');
    
    if (!tableContainer) return;
    
    if (cameras.length === 0) {
        tableContainer.innerHTML = '<p class="text-center">No CCTV cameras found.</p>';
        return;
    }
    
    const tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>SR No</th>
                    <th>Camera ID</th>
                    <th>Camera Name</th>
                    <th>Department</th>
                    <th>Plant</th>
                    <th>Hostname</th>
                    <th>Username</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Resolution</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${cameras.map(camera => `
                    <tr>
                        <td>${camera.sr_no}</td>
                        <td>${camera.camera_id}</td>
                        <td>${camera.camera_name || '-'}</td>
                        <td>${camera.department_name || '-'}</td>
                        <td>${camera.plant_name || '-'}</td>
                        <td>${camera.hostname || '-'}</td>
                        <td>${camera.username || '-'}</td>
                        <td>${camera.camera_brand || '-'}</td>
                        <td>${camera.model_number || '-'}</td>
                        <td>${camera.resolution || '-'}</td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-sm btn-primary" onclick="editCctv(${camera.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    tableContainer.innerHTML = tableHTML;
}

// Printers Management
async function loadPrinters() {
    try {
        const response = await fetch(`${API_BASE_URL}/printers`);
        const data = await response.json();
        
        if (data.success) {
            printersData = data.printers;
            displayPrinters(printersData);
        }
    } catch (error) {
        console.error('Error loading printers:', error);
        showNotification('Error loading printers', 'error');
    }
}

function displayPrinters(printers) {
    const tableContainer = document.getElementById('printersTable');
    
    if (!tableContainer) return;
    
    if (printers.length === 0) {
        tableContainer.innerHTML = '<p class="text-center">No printers found.</p>';
        return;
    }
    
    const tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>SR No</th>
                    <th>Printer ID</th>
                    <th>Printer Name</th>
                    <th>Department</th>
                    <th>Plant</th>
                    <th>Hostname</th>
                    <th>Username</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${printers.map(printer => `
                    <tr>
                        <td>${printer.sr_no}</td>
                        <td>${printer.printer_id}</td>
                        <td>${printer.printer_name || '-'}</td>
                        <td>${printer.department_name || '-'}</td>
                        <td>${printer.plant_name || '-'}</td>
                        <td>${printer.hostname || '-'}</td>
                        <td>${printer.username || '-'}</td>
                        <td>${printer.printer_brand || '-'}</td>
                        <td>${printer.model_number || '-'}</td>
                        <td>${printer.printer_type || '-'}</td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-sm btn-primary" onclick="editPrinter(${printer.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    tableContainer.innerHTML = tableHTML;
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    window.location.href = 'index.html';
}

// Load additional data
async function loadPlants() {
    try {
        const response = await fetch(`${API_BASE_URL}/plants`);
        const data = await response.json();
        
        if (data.success) {
            // Update plant dropdowns
            const plantSelects = document.querySelectorAll('select[id*="plant"], select[id*="Plant"]');
            plantSelects.forEach(select => {
                select.innerHTML = '<option value="">Select Plant</option>';
                data.plants.forEach(plant => {
                    select.innerHTML += `<option value="${plant.id}">${plant.plant_name}</option>`;
                });
            });
        }
    } catch (error) {
        console.error('Error loading plants:', error);
    }
}

async function loadDepartments() {
    try {
        const response = await fetch(`${API_BASE_URL}/departments`);
        const data = await response.json();
        
        if (data.success) {
            // Update department dropdowns
            const deptSelects = document.querySelectorAll('select[id*="department"], select[id*="Department"]');
            deptSelects.forEach(select => {
                select.innerHTML = '<option value="">Select Department</option>';
                data.departments.forEach(dept => {
                    select.innerHTML += `<option value="${dept.id}">${dept.department_name}</option>`;
                });
            });
        }
    } catch (error) {
        console.error('Error loading departments:', error);
    }
}

// Edit Functions for Assets (No Delete for Deepak)
function editAsset(id) {
    // TODO: Implement edit asset functionality
    showNotification('Edit functionality will be implemented soon', 'info');
}

// Edit Functions for Software Licenses (No Delete for Deepak)
function editSoftwareLicense(id) {
    // TODO: Implement edit software license functionality
    showNotification('Edit functionality will be implemented soon', 'info');
}

// Edit Functions for SAP Servers (No Delete for Deepak)
function editSapServer(id) {
    // TODO: Implement edit SAP server functionality
    showNotification('Edit functionality will be implemented soon', 'info');
}

// Edit Functions for Non-SAP Servers (No Delete for Deepak)
function editNonSapServer(id) {
    // TODO: Implement edit non-SAP server functionality
    showNotification('Edit functionality will be implemented soon', 'info');
}

// Edit Functions for Switches (No Delete for Deepak)
function editSwitch(id) {
    // TODO: Implement edit switch functionality
    showNotification('Edit functionality will be implemented soon', 'info');
}

// Edit Functions for CCTV (No Delete for Deepak)
function editCctv(id) {
    // TODO: Implement edit CCTV functionality
    showNotification('Edit functionality will be implemented soon', 'info');
}

// Edit Functions for Printers (No Delete for Deepak)
function editPrinter(id) {
    // TODO: Implement edit printer functionality
    showNotification('Edit functionality will be implemented soon', 'info');
}

// Edit Functions for Plant Assets (No Delete for Deepak)
function editPlantAsset(id) {
    // TODO: Implement edit plant asset functionality
    showNotification('Edit functionality will be implemented soon', 'info');
}