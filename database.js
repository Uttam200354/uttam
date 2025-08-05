// Database Management System using localStorage (simulating MySQL)
// This simulates MySQL database operations for the ACGL Management System

// Initialize database structure
function initializeDatabase() {
    if (!localStorage.getItem('acgl_assets')) {
        localStorage.setItem('acgl_assets', JSON.stringify([]));
    }
    if (!localStorage.getItem('acgl_software')) {
        localStorage.setItem('acgl_software', JSON.stringify([]));
    }
    if (!localStorage.getItem('acgl_servers')) {
        localStorage.setItem('acgl_servers', JSON.stringify([]));
    }
    if (!localStorage.getItem('acgl_switches')) {
        localStorage.setItem('acgl_switches', JSON.stringify([]));
    }
    if (!localStorage.getItem('acgl_cctv')) {
        localStorage.setItem('acgl_cctv', JSON.stringify([]));
    }
    if (!localStorage.getItem('acgl_printers')) {
        localStorage.setItem('acgl_printers', JSON.stringify([]));
    }
}

// Call initialization
initializeDatabase();

// ==================== ASSETS MANAGEMENT ====================

function getAssets() {
    return JSON.parse(localStorage.getItem('acgl_assets')) || [];
}

function saveAsset() {
    const asset = {
        srNo: document.getElementById('assetSrNo').value,
        assetNumber: document.getElementById('assetNumber').value,
        name: document.getElementById('assetName').value,
        department: document.getElementById('assetDepartment').value,
        hostname: document.getElementById('assetHostname').value,
        username: document.getElementById('assetUsername').value,
        serialNumber: document.getElementById('assetSerial').value,
        device: document.getElementById('assetDevice').value,
        createdBy: currentUser.username,
        createdAt: new Date().toISOString()
    };

    // Validation
    if (!asset.assetNumber || !asset.name || !asset.department) {
        alert('Please fill in all required fields');
        return;
    }

    const assets = getAssets();
    
    if (editingIndex >= 0) {
        // Update existing asset
        assets[editingIndex] = { ...assets[editingIndex], ...asset };
        editingIndex = -1;
    } else {
        // Add new asset
        assets.push(asset);
    }

    localStorage.setItem('acgl_assets', JSON.stringify(assets));
    showSuccessMessage('asset');
    clearAssetForm();
    loadAssetsTable();
    updateDashboardStats();
}

function editAssetRow(index) {
    const assets = getAssets();
    const asset = assets[index];
    
    document.getElementById('assetSrNo').value = asset.srNo;
    document.getElementById('assetNumber').value = asset.assetNumber;
    document.getElementById('assetName').value = asset.name;
    document.getElementById('assetDepartment').value = asset.department;
    document.getElementById('assetHostname').value = asset.hostname;
    document.getElementById('assetUsername').value = asset.username;
    document.getElementById('assetSerial').value = asset.serialNumber;
    document.getElementById('assetDevice').value = asset.device;
    
    editingIndex = index;
    toggleEditButtons('asset', true);
    
    // Show form if not visible
    const form = document.getElementById('assetsForm');
    if (!form.classList.contains('active')) {
        form.classList.add('active');
    }
}

function deleteAsset() {
    if (currentUser.role !== 'admin') {
        alert('Only admins can delete records');
        return;
    }
    
    if (editingIndex >= 0) {
        if (confirm('Are you sure you want to delete this asset?')) {
            const assets = getAssets();
            assets.splice(editingIndex, 1);
            localStorage.setItem('acgl_assets', JSON.stringify(assets));
            clearAssetForm();
            loadAssetsTable();
            updateDashboardStats();
        }
    }
}

function deleteAssetRow(index) {
    if (currentUser.role !== 'admin') {
        alert('Only admins can delete records');
        return;
    }
    
    if (confirm('Are you sure you want to delete this asset?')) {
        const assets = getAssets();
        assets.splice(index, 1);
        localStorage.setItem('acgl_assets', JSON.stringify(assets));
        loadAssetsTable();
        updateDashboardStats();
    }
}

function loadAssetsTable() {
    const assets = getAssets();
    const tbody = document.querySelector('#assetsTable tbody');
    tbody.innerHTML = '';

    assets.forEach((asset, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${asset.srNo}</td>
            <td>${asset.assetNumber}</td>
            <td>${asset.name}</td>
            <td>${asset.department}</td>
            <td>${asset.hostname}</td>
            <td>${asset.username}</td>
            <td>${asset.serialNumber}</td>
            <td>${asset.device}</td>
            <td class="admin-only">
                <div class="action-buttons">
                    <button class="btn btn-warning btn-sm" onclick="editAssetRow(${index})">Edit</button>
                    ${currentUser.role === 'admin' ? `<button class="btn btn-danger btn-sm" onclick="deleteAssetRow(${index})">Delete</button>` : ''}
                </div>
            </td>
        `;
    });
}

// ==================== SOFTWARE LICENSE MANAGEMENT ====================

function getSoftware() {
    return JSON.parse(localStorage.getItem('acgl_software')) || [];
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
        device: document.getElementById('softwareDevice').value,
        createdBy: currentUser.username,
        createdAt: new Date().toISOString()
    };

    if (!software.softwareKey || !software.name || !software.department) {
        alert('Please fill in all required fields');
        return;
    }

    const softwareList = getSoftware();
    
    if (editingIndex >= 0) {
        softwareList[editingIndex] = { ...softwareList[editingIndex], ...software };
        editingIndex = -1;
    } else {
        softwareList.push(software);
    }

    localStorage.setItem('acgl_software', JSON.stringify(softwareList));
    showSuccessMessage('software');
    clearSoftwareForm();
    loadSoftwareTable();
    updateDashboardStats();
}

function editSoftwareRow(index) {
    const softwareList = getSoftware();
    const software = softwareList[index];
    
    document.getElementById('softwareSrNo').value = software.srNo;
    document.getElementById('softwareKey').value = software.softwareKey;
    document.getElementById('softwareName').value = software.name;
    document.getElementById('softwareDepartment').value = software.department;
    document.getElementById('softwareHostname').value = software.hostname;
    document.getElementById('softwareUsername').value = software.username;
    document.getElementById('msOffice').value = software.msOffice;
    document.getElementById('autoCAD').value = software.autoCAD;
    document.getElementById('cero').value = software.cero;
    document.getElementById('softwareDevice').value = software.device;
    
    editingIndex = index;
    toggleEditButtons('software', true);
    
    const form = document.getElementById('softwareForm');
    if (!form.classList.contains('active')) {
        form.classList.add('active');
    }
}

function deleteSoftwareRow(index) {
    if (currentUser.role !== 'admin') {
        alert('Only admins can delete records');
        return;
    }
    
    if (confirm('Are you sure you want to delete this software license?')) {
        const softwareList = getSoftware();
        softwareList.splice(index, 1);
        localStorage.setItem('acgl_software', JSON.stringify(softwareList));
        loadSoftwareTable();
        updateDashboardStats();
    }
}

function loadSoftwareTable() {
    const softwareList = getSoftware();
    const tbody = document.querySelector('#softwareTable tbody');
    tbody.innerHTML = '';

    softwareList.forEach((software, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${software.srNo}</td>
            <td>${software.softwareKey}</td>
            <td>${software.name}</td>
            <td>${software.department}</td>
            <td>${software.hostname}</td>
            <td>${software.username}</td>
            <td>${software.msOffice || ''}</td>
            <td>${software.autoCAD || ''}</td>
            <td>${software.cero || ''}</td>
            <td>${software.device}</td>
            <td class="admin-only">
                <div class="action-buttons">
                    <button class="btn btn-warning btn-sm" onclick="editSoftwareRow(${index})">Edit</button>
                    ${currentUser.role === 'admin' ? `<button class="btn btn-danger btn-sm" onclick="deleteSoftwareRow(${index})">Delete</button>` : ''}
                </div>
            </td>
        `;
    });
}

// ==================== SERVERS MANAGEMENT ====================

function getServers() {
    return JSON.parse(localStorage.getItem('acgl_servers')) || [];
}

function saveSAPServer() {
    const server = {
        srNo: document.getElementById('sapSrNo').value,
        type: 'SAP',
        serverBrand: document.getElementById('sapBrand').value,
        serialNumber: document.getElementById('sapSerial').value,
        modelNumber: document.getElementById('sapModel').value,
        hardDisk: document.getElementById('sapHDD').value,
        totalRAM: document.getElementById('sapRAM').value,
        totalCPU: document.getElementById('sapCPU').value,
        vm: '',
        createdBy: currentUser.username,
        createdAt: new Date().toISOString()
    };

    if (!server.serverBrand || !server.serialNumber || !server.modelNumber) {
        alert('Please fill in all required fields');
        return;
    }

    const servers = getServers();
    
    if (editingIndex >= 0) {
        servers[editingIndex] = { ...servers[editingIndex], ...server };
        editingIndex = -1;
    } else {
        servers.push(server);
    }

    localStorage.setItem('acgl_servers', JSON.stringify(servers));
    showSuccessMessage('sap');
    clearSAPForm();
    loadServersTable();
    updateDashboardStats();
}

function saveNonSAPServer() {
    const server = {
        srNo: document.getElementById('nonsapSrNo').value,
        type: 'Non-SAP',
        serverBrand: document.getElementById('nonsapBrand').value,
        serialNumber: document.getElementById('nonsapSerial').value,
        modelNumber: document.getElementById('nonsapModel').value,
        hardDisk: document.getElementById('nonsapHDD').value,
        totalRAM: document.getElementById('nonsapRAM').value,
        totalCPU: document.getElementById('nonsapCPU').value,
        vm: document.getElementById('nonsapVM').value,
        createdBy: currentUser.username,
        createdAt: new Date().toISOString()
    };

    if (!server.serverBrand || !server.serialNumber || !server.modelNumber) {
        alert('Please fill in all required fields');
        return;
    }

    const servers = getServers();
    
    if (editingIndex >= 0) {
        servers[editingIndex] = { ...servers[editingIndex], ...server };
        editingIndex = -1;
    } else {
        servers.push(server);
    }

    localStorage.setItem('acgl_servers', JSON.stringify(servers));
    showSuccessMessage('nonsap');
    clearNonSAPForm();
    loadServersTable();
    updateDashboardStats();
}

function editServerRow(index) {
    const servers = getServers();
    const server = servers[index];
    
    if (server.type === 'SAP') {
        document.getElementById('sapSrNo').value = server.srNo;
        document.getElementById('sapBrand').value = server.serverBrand;
        document.getElementById('sapSerial').value = server.serialNumber;
        document.getElementById('sapModel').value = server.modelNumber;
        document.getElementById('sapHDD').value = server.hardDisk;
        document.getElementById('sapRAM').value = server.totalRAM;
        document.getElementById('sapCPU').value = server.totalCPU;
        
        showServerForm('sap');
        toggleEditButtons('sap', true);
    } else {
        document.getElementById('nonsapSrNo').value = server.srNo;
        document.getElementById('nonsapBrand').value = server.serverBrand;
        document.getElementById('nonsapSerial').value = server.serialNumber;
        document.getElementById('nonsapModel').value = server.modelNumber;
        document.getElementById('nonsapHDD').value = server.hardDisk;
        document.getElementById('nonsapRAM').value = server.totalRAM;
        document.getElementById('nonsapCPU').value = server.totalCPU;
        document.getElementById('nonsapVM').value = server.vm;
        
        showServerForm('nonsap');
        toggleEditButtons('nonsap', true);
    }
    
    editingIndex = index;
}

function deleteServerRow(index) {
    if (currentUser.role !== 'admin') {
        alert('Only admins can delete records');
        return;
    }
    
    if (confirm('Are you sure you want to delete this server?')) {
        const servers = getServers();
        servers.splice(index, 1);
        localStorage.setItem('acgl_servers', JSON.stringify(servers));
        loadServersTable();
        updateDashboardStats();
    }
}

function loadServersTable() {
    const servers = getServers();
    const tbody = document.querySelector('#serversTable tbody');
    tbody.innerHTML = '';

    servers.forEach((server, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${server.srNo}</td>
            <td>${server.type}</td>
            <td>${server.serverBrand}</td>
            <td>${server.serialNumber}</td>
            <td>${server.modelNumber}</td>
            <td>${server.hardDisk}</td>
            <td>${server.totalRAM}</td>
            <td>${server.totalCPU}</td>
            <td>${server.vm || ''}</td>
            <td class="admin-only">
                <div class="action-buttons">
                    <button class="btn btn-warning btn-sm" onclick="editServerRow(${index})">Edit</button>
                    ${currentUser.role === 'admin' ? `<button class="btn btn-danger btn-sm" onclick="deleteServerRow(${index})">Delete</button>` : ''}
                </div>
            </td>
        `;
    });
}

// ==================== SWITCHES MANAGEMENT ====================

function getSwitches() {
    return JSON.parse(localStorage.getItem('acgl_switches')) || [];
}

function saveSwitch() {
    const switchData = {
        srNo: document.getElementById('switchSrNo').value,
        switchId: document.getElementById('switchId').value,
        name: document.getElementById('switchName').value,
        department: document.getElementById('switchDepartment').value,
        hostname: document.getElementById('switchHostname').value,
        username: document.getElementById('switchUsername').value,
        plant: document.getElementById('switchPlant').value,
        device: document.getElementById('switchDevice').value,
        createdBy: currentUser.username,
        createdAt: new Date().toISOString()
    };

    if (!switchData.switchId || !switchData.name || !switchData.department) {
        alert('Please fill in all required fields');
        return;
    }

    const switches = getSwitches();
    
    if (editingIndex >= 0) {
        switches[editingIndex] = { ...switches[editingIndex], ...switchData };
        editingIndex = -1;
    } else {
        switches.push(switchData);
    }

    localStorage.setItem('acgl_switches', JSON.stringify(switches));
    showSuccessMessage('switch');
    clearSwitchForm();
    loadSwitchesTable();
    updateDashboardStats();
}

function editSwitchRow(index) {
    const switches = getSwitches();
    const switchData = switches[index];
    
    document.getElementById('switchSrNo').value = switchData.srNo;
    document.getElementById('switchId').value = switchData.switchId;
    document.getElementById('switchName').value = switchData.name;
    document.getElementById('switchDepartment').value = switchData.department;
    document.getElementById('switchHostname').value = switchData.hostname;
    document.getElementById('switchUsername').value = switchData.username;
    document.getElementById('switchPlant').value = switchData.plant;
    document.getElementById('switchDevice').value = switchData.device;
    
    editingIndex = index;
    toggleEditButtons('switch', true);
    
    const form = document.getElementById('switchesForm');
    if (!form.classList.contains('active')) {
        form.classList.add('active');
    }
}

function deleteSwitchRow(index) {
    if (currentUser.role !== 'admin') {
        alert('Only admins can delete records');
        return;
    }
    
    if (confirm('Are you sure you want to delete this switch?')) {
        const switches = getSwitches();
        switches.splice(index, 1);
        localStorage.setItem('acgl_switches', JSON.stringify(switches));
        loadSwitchesTable();
        updateDashboardStats();
    }
}

function loadSwitchesTable() {
    const switches = getSwitches();
    const tbody = document.querySelector('#switchesTable tbody');
    tbody.innerHTML = '';

    switches.forEach((switchData, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${switchData.srNo}</td>
            <td>${switchData.switchId}</td>
            <td>${switchData.name}</td>
            <td>${switchData.department}</td>
            <td>${switchData.hostname}</td>
            <td>${switchData.username}</td>
            <td>${switchData.plant}</td>
            <td>${switchData.device}</td>
            <td class="admin-only">
                <div class="action-buttons">
                    <button class="btn btn-warning btn-sm" onclick="editSwitchRow(${index})">Edit</button>
                    ${currentUser.role === 'admin' ? `<button class="btn btn-danger btn-sm" onclick="deleteSwitchRow(${index})">Delete</button>` : ''}
                </div>
            </td>
        `;
    });
}

// ==================== CCTV MANAGEMENT ====================

function getCCTV() {
    return JSON.parse(localStorage.getItem('acgl_cctv')) || [];
}

function saveCCTV() {
    const cctvData = {
        srNo: document.getElementById('cctvSrNo').value,
        cctvId: document.getElementById('cctvId').value,
        name: document.getElementById('cctvName').value,
        department: document.getElementById('cctvDepartment').value,
        hostname: document.getElementById('cctvHostname').value,
        username: document.getElementById('cctvUsername').value,
        plant: document.getElementById('cctvPlant').value,
        device: document.getElementById('cctvDevice').value,
        createdBy: currentUser.username,
        createdAt: new Date().toISOString()
    };

    if (!cctvData.cctvId || !cctvData.name || !cctvData.department) {
        alert('Please fill in all required fields');
        return;
    }

    const cctvList = getCCTV();
    
    if (editingIndex >= 0) {
        cctvList[editingIndex] = { ...cctvList[editingIndex], ...cctvData };
        editingIndex = -1;
    } else {
        cctvList.push(cctvData);
    }

    localStorage.setItem('acgl_cctv', JSON.stringify(cctvList));
    showSuccessMessage('cctv');
    clearCCTVForm();
    loadCCTVTable();
    updateDashboardStats();
}

function editCCTVRow(index) {
    const cctvList = getCCTV();
    const cctvData = cctvList[index];
    
    document.getElementById('cctvSrNo').value = cctvData.srNo;
    document.getElementById('cctvId').value = cctvData.cctvId;
    document.getElementById('cctvName').value = cctvData.name;
    document.getElementById('cctvDepartment').value = cctvData.department;
    document.getElementById('cctvHostname').value = cctvData.hostname;
    document.getElementById('cctvUsername').value = cctvData.username;
    document.getElementById('cctvPlant').value = cctvData.plant;
    document.getElementById('cctvDevice').value = cctvData.device;
    
    editingIndex = index;
    toggleEditButtons('cctv', true);
    
    const form = document.getElementById('cctvForm');
    if (!form.classList.contains('active')) {
        form.classList.add('active');
    }
}

function deleteCCTVRow(index) {
    if (currentUser.role !== 'admin') {
        alert('Only admins can delete records');
        return;
    }
    
    if (confirm('Are you sure you want to delete this CCTV?')) {
        const cctvList = getCCTV();
        cctvList.splice(index, 1);
        localStorage.setItem('acgl_cctv', JSON.stringify(cctvList));
        loadCCTVTable();
        updateDashboardStats();
    }
}

function loadCCTVTable() {
    const cctvList = getCCTV();
    const tbody = document.querySelector('#cctvTable tbody');
    tbody.innerHTML = '';

    cctvList.forEach((cctvData, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${cctvData.srNo}</td>
            <td>${cctvData.cctvId}</td>
            <td>${cctvData.name}</td>
            <td>${cctvData.department}</td>
            <td>${cctvData.hostname}</td>
            <td>${cctvData.username}</td>
            <td>${cctvData.plant}</td>
            <td>${cctvData.device}</td>
            <td class="admin-only">
                <div class="action-buttons">
                    <button class="btn btn-warning btn-sm" onclick="editCCTVRow(${index})">Edit</button>
                    ${currentUser.role === 'admin' ? `<button class="btn btn-danger btn-sm" onclick="deleteCCTVRow(${index})">Delete</button>` : ''}
                </div>
            </td>
        `;
    });
}

// ==================== PRINTERS MANAGEMENT ====================

function getPrinters() {
    return JSON.parse(localStorage.getItem('acgl_printers')) || [];
}

function savePrinter() {
    const printerData = {
        srNo: document.getElementById('printerSrNo').value,
        printerId: document.getElementById('printerId').value,
        name: document.getElementById('printerName').value,
        department: document.getElementById('printerDepartment').value,
        hostname: document.getElementById('printerHostname').value,
        username: document.getElementById('printerUsername').value,
        plant: document.getElementById('printerPlant').value,
        device: document.getElementById('printerDevice').value,
        createdBy: currentUser.username,
        createdAt: new Date().toISOString()
    };

    if (!printerData.printerId || !printerData.name || !printerData.department) {
        alert('Please fill in all required fields');
        return;
    }

    const printers = getPrinters();
    
    if (editingIndex >= 0) {
        printers[editingIndex] = { ...printers[editingIndex], ...printerData };
        editingIndex = -1;
    } else {
        printers.push(printerData);
    }

    localStorage.setItem('acgl_printers', JSON.stringify(printers));
    showSuccessMessage('printer');
    clearPrinterForm();
    loadPrintersTable();
    updateDashboardStats();
}

function editPrinterRow(index) {
    const printers = getPrinters();
    const printerData = printers[index];
    
    document.getElementById('printerSrNo').value = printerData.srNo;
    document.getElementById('printerId').value = printerData.printerId;
    document.getElementById('printerName').value = printerData.name;
    document.getElementById('printerDepartment').value = printerData.department;
    document.getElementById('printerHostname').value = printerData.hostname;
    document.getElementById('printerUsername').value = printerData.username;
    document.getElementById('printerPlant').value = printerData.plant;
    document.getElementById('printerDevice').value = printerData.device;
    
    editingIndex = index;
    toggleEditButtons('printer', true);
    
    const form = document.getElementById('printersForm');
    if (!form.classList.contains('active')) {
        form.classList.add('active');
    }
}

function deletePrinterRow(index) {
    if (currentUser.role !== 'admin') {
        alert('Only admins can delete records');
        return;
    }
    
    if (confirm('Are you sure you want to delete this printer?')) {
        const printers = getPrinters();
        printers.splice(index, 1);
        localStorage.setItem('acgl_printers', JSON.stringify(printers));
        loadPrintersTable();
        updateDashboardStats();
    }
}

function loadPrintersTable() {
    const printers = getPrinters();
    const tbody = document.querySelector('#printersTable tbody');
    tbody.innerHTML = '';

    printers.forEach((printerData, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${printerData.srNo}</td>
            <td>${printerData.printerId}</td>
            <td>${printerData.name}</td>
            <td>${printerData.department}</td>
            <td>${printerData.hostname}</td>
            <td>${printerData.username}</td>
            <td>${printerData.plant}</td>
            <td>${printerData.device}</td>
            <td class="admin-only">
                <div class="action-buttons">
                    <button class="btn btn-warning btn-sm" onclick="editPrinterRow(${index})">Edit</button>
                    ${currentUser.role === 'admin' ? `<button class="btn btn-danger btn-sm" onclick="deletePrinterRow(${index})">Delete</button>` : ''}
                </div>
            </td>
        `;
    });
}

// ==================== UTILITY FUNCTIONS ====================

// Export data (simulate MySQL export)
function exportToCSV(dataType) {
    let data, filename;
    
    switch(dataType) {
        case 'assets':
            data = getAssets();
            filename = 'acgl_assets.csv';
            break;
        case 'software':
            data = getSoftware();
            filename = 'acgl_software.csv';
            break;
        case 'servers':
            data = getServers();
            filename = 'acgl_servers.csv';
            break;
        case 'switches':
            data = getSwitches();
            filename = 'acgl_switches.csv';
            break;
        case 'cctv':
            data = getCCTV();
            filename = 'acgl_cctv.csv';
            break;
        case 'printers':
            data = getPrinters();
            filename = 'acgl_printers.csv';
            break;
        default:
            alert('Invalid data type');
            return;
    }
    
    if (data.length === 0) {
        alert('No data to export');
        return;
    }
    
    // Convert to CSV
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(field => `"${row[field] || ''}"`).join(','))
    ].join('\n');
    
    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Backup all data
function backupDatabase() {
    const allData = {
        assets: getAssets(),
        software: getSoftware(),
        servers: getServers(),
        switches: getSwitches(),
        cctv: getCCTV(),
        printers: getPrinters(),
        timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(allData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `acgl_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
}