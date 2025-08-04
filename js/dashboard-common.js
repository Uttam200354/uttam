// Common dashboard functionality

// Check authentication
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');
    
    if (!isLoggedIn || !currentUser) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Initialize dashboard
function initDashboard() {
    if (!checkAuth()) return;
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
    loadDashboardData();
}

// Update date and time
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const dateTimeString = now.toLocaleDateString('en-US', options);
    
    const dateTimeElement = document.getElementById('datetime');
    if (dateTimeElement) {
        dateTimeElement.textContent = dateTimeString;
    }
}

// Show section and update navigation
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.classList.add('fade-in');
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Find and activate the clicked nav link
    const activeLink = document.querySelector(`[onclick="showSection('${sectionName}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Load section-specific data
    loadSectionData(sectionName);
}

// Load section-specific data
function loadSectionData(sectionName) {
    switch (sectionName) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'assets':
            loadAssetsData();
            break;
        case 'software':
            loadSoftwareData();
            break;
        case 'servers':
            loadServerData();
            break;
        case 'switches':
            loadSwitchesData();
            break;
        case 'cctv':
            loadCCTVData();
            break;
        case 'printers':
            loadPrintersData();
            break;
    }
}

// Load dashboard overview data
function loadDashboardData() {
    // Update card statistics
    updateCardStats();
}

// Update card statistics
function updateCardStats() {
    const assetsData = getStorageData('assets') || [];
    const softwareData = getStorageData('software') || [];
    const serverData = getStorageData('servers') || [];
    const switchesData = getStorageData('switches') || [];
    const cctvData = getStorageData('cctv') || [];
    const printersData = getStorageData('printers') || [];
    
    // Update counts
    updateElementText('assetsCount', assetsData.length);
    updateElementText('licenseCount', softwareData.length);
    updateElementText('serverCount', serverData.length);
    updateElementText('switchCount', switchesData.length);
    updateElementText('cctvCount', cctvData.length);
    updateElementText('printerCount', printersData.length);
}

// Helper function to update element text
function updateElementText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = text;
    }
}

// Local storage helpers
function getStorageData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error parsing storage data:', error);
        return [];
    }
}

function setStorageData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving storage data:', error);
        return false;
    }
}

// Generate next serial number
function generateSerialNumber(dataArray) {
    if (!dataArray || dataArray.length === 0) {
        return 1;
    }
    
    const maxSrNo = Math.max(...dataArray.map(item => parseInt(item.srNo) || 0));
    return maxSrNo + 1;
}

// Show success message
function showSuccessMessage(message, containerId = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    
    const container = containerId ? document.getElementById(containerId) : document.querySelector('.form-container');
    if (container) {
        // Remove existing messages
        const existingMessages = container.querySelectorAll('.success-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Add new message
        container.insertBefore(messageDiv, container.firstChild);
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}

// Search functionality
function performSearch(searchInput, tableBodyId, searchFields) {
    const searchTerm = searchInput.toLowerCase();
    const tableBody = document.getElementById(tableBodyId);
    const rows = tableBody.querySelectorAll('tr');
    
    rows.forEach(row => {
        let matchFound = false;
        const cells = row.querySelectorAll('td');
        
        // Search in specified fields
        searchFields.forEach(fieldIndex => {
            if (cells[fieldIndex] && cells[fieldIndex].textContent.toLowerCase().includes(searchTerm)) {
                matchFound = true;
            }
        });
        
        row.style.display = matchFound ? '' : 'none';
    });
}

// Edit functionality
function editRow(button, editFunction) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');
    const data = [];
    
    // Extract data from cells (excluding actions column)
    for (let i = 0; i < cells.length - 1; i++) {
        data.push(cells[i].textContent.trim());
    }
    
    editFunction(data);
}

// Delete functionality
function deleteRow(button, dataKey, reloadFunction) {
    if (confirm('Are you sure you want to delete this record?')) {
        const row = button.closest('tr');
        const srNo = row.querySelector('td').textContent.trim();
        
        // Get data from storage
        const data = getStorageData(dataKey);
        const updatedData = data.filter(item => item.srNo !== srNo);
        
        // Save updated data
        setStorageData(dataKey, updatedData);
        
        // Reload table
        reloadFunction();
        
        // Update dashboard stats
        updateCardStats();
        
        showSuccessMessage('Record deleted successfully!');
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}

// Placeholder functions for data loading (to be implemented in specific dashboard files)
function loadAssetsData() { /* Implemented in specific dashboard files */ }
function loadSoftwareData() { /* Implemented in specific dashboard files */ }
function loadServerData() { /* Implemented in specific dashboard files */ }
function loadSwitchesData() { /* Implemented in specific dashboard files */ }
function loadCCTVData() { /* Implemented in specific dashboard files */ }
function loadPrintersData() { /* Implemented in specific dashboard files */ }

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);