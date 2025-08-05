// Dashboard JavaScript functionality
let currentUser = null;
let editingIndex = -1;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
        window.location.href = 'index.html';
        return;
    }
    
    currentUser = JSON.parse(userData);
    document.getElementById('currentUserName').textContent = currentUser.username;
    
    // Setup user permissions
    setupUserPermissions();
    
    // Setup navigation
    setupNavigation();
    
    // Setup logout
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // Load initial data
    loadDashboardData();
});

// Setup user permissions based on role
function setupUserPermissions() {
    const adminElements = document.querySelectorAll('.admin-only');
    
    if (currentUser.role !== 'admin') {
        // Hide delete buttons for non-admin users
        adminElements.forEach(element => {
            if (element.tagName === 'TH') {
                element.style.display = 'none';
            } else {
                element.style.display = 'none';
            }
        });
        
        // Hide delete buttons in forms
        const deleteButtons = document.querySelectorAll('[id*="delete"], [onclick*="delete"]');
        deleteButtons.forEach(btn => {
            if (currentUser.role !== 'admin') {
                btn.style.display = 'none';
            }
        });
    }
}

// Setup navigation
function setupNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link[data-section]');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Show corresponding section
            const sectionId = link.getAttribute('data-section');
            showSection(sectionId);
        });
    });
}

// Show specific section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show target section
    const targetSection = document.getElementById(sectionId + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Load section specific data
        loadSectionData(sectionId);
    }
}

// Load section specific data
function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'overview':
            updateDashboardStats();
            break;
        case 'assets':
            loadAssetsTable();
            generateAssetSrNo();
            break;
        case 'software':
            loadSoftwareTable();
            generateSoftwareSrNo();
            break;
        case 'servers':
            loadServersTable();
            generateSAPSrNo();
            generateNonSAPSrNo();
            break;
        case 'switches':
            loadSwitchesTable();
            generateSwitchSrNo();
            break;
        case 'cctv':
            loadCCTVTable();
            generateCCTVSrNo();
            break;
        case 'printers':
            loadPrintersTable();
            generatePrinterSrNo();
            break;
    }
}

// Load dashboard data
function loadDashboardData() {
    updateDashboardStats();
}

// Update dashboard statistics
function updateDashboardStats() {
    const assets = getAssets();
    const software = getSoftware();
    const servers = getServers();
    const switches = getSwitches();
    const cctv = getCCTV();
    const printers = getPrinters();
    
    document.getElementById('totalAssets').textContent = assets.length;
    document.getElementById('totalLicenses').textContent = software.length;
    document.getElementById('totalServers').textContent = servers.length;
    document.getElementById('totalSwitches').textContent = switches.length;
    document.getElementById('totalCCTV').textContent = cctv.length;
    document.getElementById('totalPrinters').textContent = printers.length;
}

// Dropdown functions
function togglePlantDropdown() {
    const dropdown = document.getElementById('plantDropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

function toggleDepartmentDropdown() {
    const dropdown = document.getElementById('departmentDropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

function toggleServerTypeDropdown() {
    const dropdown = document.getElementById('serverTypeDropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

// Plant functions
function openPlantDetails(plantName) {
    alert(`Opening ${plantName} details. This feature will open a new page with plant-specific asset management.`);
    togglePlantDropdown();
}

// Department filter
function filterByDepartment(department) {
    alert(`Filtering by ${department}. This will show all assets from this department.`);
    toggleDepartmentDropdown();
}

// Form toggle functions
function toggleAssetsForm() {
    const form = document.getElementById('assetsForm');
    form.classList.toggle('active');
    if (form.classList.contains('active')) {
        generateAssetSrNo();
        clearAssetForm();
    }
}

function toggleSoftwareForm() {
    const form = document.getElementById('softwareForm');
    form.classList.toggle('active');
    if (form.classList.contains('active')) {
        generateSoftwareSrNo();
        clearSoftwareForm();
    }
}

function toggleSwitchesForm() {
    const form = document.getElementById('switchesForm');
    form.classList.toggle('active');
    if (form.classList.contains('active')) {
        generateSwitchSrNo();
        clearSwitchForm();
    }
}

function toggleCCTVForm() {
    const form = document.getElementById('cctvForm');
    form.classList.toggle('active');
    if (form.classList.contains('active')) {
        generateCCTVSrNo();
        clearCCTVForm();
    }
}

function togglePrintersForm() {
    const form = document.getElementById('printersForm');
    form.classList.toggle('active');
    if (form.classList.contains('active')) {
        generatePrinterSrNo();
        clearPrinterForm();
    }
}

// Server form functions
function showServerForm(serverType) {
    // Hide all server forms first
    document.getElementById('sapServerForm').classList.remove('active');
    document.getElementById('nonsapServerForm').classList.remove('active');
    
    // Show selected form
    if (serverType === 'sap') {
        document.getElementById('sapServerForm').classList.add('active');
        generateSAPSrNo();
        clearSAPForm();
    } else if (serverType === 'nonsap') {
        document.getElementById('nonsapServerForm').classList.add('active');
        generateNonSAPSrNo();
        clearNonSAPForm();
    }
    
    toggleServerTypeDropdown();
}

// Serial number generators
function generateAssetSrNo() {
    const assets = getAssets();
    document.getElementById('assetSrNo').value = (assets.length + 1).toString().padStart(3, '0');
}

function generateSoftwareSrNo() {
    const software = getSoftware();
    document.getElementById('softwareSrNo').value = (software.length + 1).toString().padStart(3, '0');
}

function generateSAPSrNo() {
    const servers = getServers().filter(s => s.type === 'SAP');
    document.getElementById('sapSrNo').value = (servers.length + 1).toString().padStart(3, '0');
}

function generateNonSAPSrNo() {
    const servers = getServers().filter(s => s.type === 'Non-SAP');
    document.getElementById('nonsapSrNo').value = (servers.length + 1).toString().padStart(3, '0');
}

function generateSwitchSrNo() {
    const switches = getSwitches();
    document.getElementById('switchSrNo').value = (switches.length + 1).toString().padStart(3, '0');
}

function generateCCTVSrNo() {
    const cctv = getCCTV();
    document.getElementById('cctvSrNo').value = (cctv.length + 1).toString().padStart(3, '0');
}

function generatePrinterSrNo() {
    const printers = getPrinters();
    document.getElementById('printerSrNo').value = (printers.length + 1).toString().padStart(3, '0');
}

// Form clear functions
function clearAssetForm() {
    document.getElementById('assetNumber').value = '';
    document.getElementById('assetName').value = '';
    document.getElementById('assetDepartment').value = '';
    document.getElementById('assetHostname').value = '';
    document.getElementById('assetUsername').value = '';
    document.getElementById('assetSerial').value = '';
    document.getElementById('assetDevice').value = '';
    editingIndex = -1;
    toggleEditButtons('asset', false);
}

function clearSoftwareForm() {
    document.getElementById('softwareKey').value = '';
    document.getElementById('softwareName').value = '';
    document.getElementById('softwareDepartment').value = '';
    document.getElementById('softwareHostname').value = '';
    document.getElementById('softwareUsername').value = '';
    document.getElementById('msOffice').value = '';
    document.getElementById('autoCAD').value = '';
    document.getElementById('cero').value = '';
    document.getElementById('softwareDevice').value = '';
    editingIndex = -1;
    toggleEditButtons('software', false);
}

function clearSAPForm() {
    document.getElementById('sapBrand').value = '';
    document.getElementById('sapSerial').value = '';
    document.getElementById('sapModel').value = '';
    document.getElementById('sapHDD').value = '';
    document.getElementById('sapRAM').value = '';
    document.getElementById('sapCPU').value = '';
    editingIndex = -1;
    toggleEditButtons('sap', false);
}

function clearNonSAPForm() {
    document.getElementById('nonsapBrand').value = '';
    document.getElementById('nonsapSerial').value = '';
    document.getElementById('nonsapModel').value = '';
    document.getElementById('nonsapHDD').value = '';
    document.getElementById('nonsapRAM').value = '';
    document.getElementById('nonsapCPU').value = '';
    document.getElementById('nonsapVM').value = '';
    editingIndex = -1;
    toggleEditButtons('nonsap', false);
}

function clearSwitchForm() {
    document.getElementById('switchId').value = '';
    document.getElementById('switchName').value = '';
    document.getElementById('switchDepartment').value = '';
    document.getElementById('switchHostname').value = '';
    document.getElementById('switchUsername').value = '';
    document.getElementById('switchPlant').value = '';
    document.getElementById('switchDevice').value = '';
    editingIndex = -1;
    toggleEditButtons('switch', false);
}

function clearCCTVForm() {
    document.getElementById('cctvId').value = '';
    document.getElementById('cctvName').value = '';
    document.getElementById('cctvDepartment').value = '';
    document.getElementById('cctvHostname').value = '';
    document.getElementById('cctvUsername').value = '';
    document.getElementById('cctvPlant').value = '';
    document.getElementById('cctvDevice').value = '';
    editingIndex = -1;
    toggleEditButtons('cctv', false);
}

function clearPrinterForm() {
    document.getElementById('printerId').value = '';
    document.getElementById('printerName').value = '';
    document.getElementById('printerDepartment').value = '';
    document.getElementById('printerHostname').value = '';
    document.getElementById('printerUsername').value = '';
    document.getElementById('printerPlant').value = '';
    document.getElementById('printerDevice').value = '';
    editingIndex = -1;
    toggleEditButtons('printer', false);
}

// Toggle edit/delete buttons
function toggleEditButtons(type, show) {
    const editBtn = document.getElementById(`edit${type.charAt(0).toUpperCase() + type.slice(1)}Btn`);
    const deleteBtn = document.getElementById(`delete${type.charAt(0).toUpperCase() + type.slice(1)}Btn`);
    
    if (editBtn) editBtn.style.display = show ? 'inline-block' : 'none';
    if (deleteBtn && currentUser.role === 'admin') {
        deleteBtn.style.display = show ? 'inline-block' : 'none';
    }
}

// Show success message
function showSuccessMessage(type) {
    const messageElement = document.getElementById(`${type}SuccessMessage`);
    if (messageElement) {
        messageElement.classList.add('show');
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 3000);
    }
}

// Search functions (these will filter the displayed table data)
function searchAssets(query) {
    filterTable('assetsTable', query);
}

function searchLicenses(query) {
    filterTable('softwareTable', query);
}

function searchServers(query) {
    filterTable('serversTable', query);
}

function searchSwitches(query) {
    filterTable('switchesTable', query);
}

function searchCCTV(query) {
    filterTable('cctvTable', query);
}

function searchPrinters(query) {
    filterTable('printersTable', query);
}

// Generic table filter function
function filterTable(tableId, query) {
    const table = document.getElementById(tableId);
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        let found = false;
        
        for (let j = 0; j < cells.length; j++) {
            const cellText = cells[j].textContent.toLowerCase();
            if (cellText.includes(query.toLowerCase())) {
                found = true;
                break;
            }
        }
        
        row.style.display = found ? '' : 'none';
    }
}

// In-form search functions
function searchInAssets(query) {
    // This would search within the form data - implement as needed
    console.log('Searching in assets:', query);
}

function searchInSoftware(query) {
    console.log('Searching in software:', query);
}

function searchInSAPServers(query) {
    console.log('Searching in SAP servers:', query);
}

function searchInNonSAPServers(query) {
    console.log('Searching in Non-SAP servers:', query);
}

function searchInSwitches(query) {
    console.log('Searching in switches:', query);
}

function searchInCCTV(query) {
    console.log('Searching in CCTV:', query);
}

function searchInPrinters(query) {
    console.log('Searching in printers:', query);
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    const dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(dropdown => {
        if (!dropdown.parentElement.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });
});