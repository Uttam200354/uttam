// Shivaji Dashboard Specific Functions
// Similar to Deepak dashboard but without delete functionality

// Assets Management
function handleAssetsAction() {
    const dropdown = document.getElementById('assetsDropdown');
    const value = dropdown.value;
    
    if (value === 'create') {
        const formContainer = document.getElementById('assetsForm');
        formContainer.style.display = 'block';
        formContainer.scrollIntoView({ behavior: 'smooth' });
        
        // Set next serial number
        const assetsData = getStorageData('assets');
        document.getElementById('assetSrNo').value = generateSerialNumber(assetsData);
        
        // Load existing data
        loadAssetsTable();
    }
    
    // Reset dropdown
    dropdown.value = '';
}

// Load assets data
function loadAssetsData() {
    loadAssetsTable();
}

// Load assets table (without delete button)
function loadAssetsTable() {
    const assetsData = getStorageData('assets');
    const tableBody = document.getElementById('assetsTableBody');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    assetsData.forEach(asset => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${asset.srNo}</td>
            <td>${asset.assetNumber}</td>
            <td>${asset.name}</td>
            <td>${asset.department}</td>
            <td>${asset.hostname}</td>
            <td>${asset.username}</td>
            <td>${asset.serialNumber}</td>
            <td>${asset.device}</td>
            <td>
                <button class="btn btn-success" onclick="editAsset(this)">Edit</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Handle asset form submission
document.addEventListener('DOMContentLoaded', function() {
    const assetForm = document.getElementById('assetForm');
    if (assetForm) {
        assetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                srNo: document.getElementById('assetSrNo').value,
                assetNumber: document.getElementById('assetNumber').value,
                name: document.getElementById('assetName').value,
                department: document.getElementById('assetDepartment').value,
                hostname: document.getElementById('assetHostname').value,
                username: document.getElementById('assetUsername').value,
                serialNumber: document.getElementById('assetSerial').value,
                device: document.getElementById('assetDevice').value
            };
            
            // Validate required fields
            const requiredFields = ['assetNumber', 'name', 'department', 'hostname', 'username', 'serialNumber', 'device'];
            const missingFields = requiredFields.filter(field => !formData[field.replace('asset', '').toLowerCase()]);
            
            if (missingFields.length > 0) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Save to localStorage
            const assetsData = getStorageData('assets');
            
            // Check if editing existing record
            const existingIndex = assetsData.findIndex(item => item.srNo === formData.srNo);
            if (existingIndex !== -1) {
                assetsData[existingIndex] = formData;
            } else {
                assetsData.push(formData);
            }
            
            setStorageData('assets', assetsData);
            
            // Show success message
            showSuccessMessage('Asset data saved successfully!');
            
            // Reset form and reload table
            resetAssetForm();
            loadAssetsTable();
            updateCardStats();
            
            // Set next serial number for new entry
            document.getElementById('assetSrNo').value = generateSerialNumber(getStorageData('assets'));
        });
    }
});

// Reset asset form
function resetAssetForm() {
    const form = document.getElementById('assetForm');
    if (form) {
        form.reset();
        const assetsData = getStorageData('assets');
        document.getElementById('assetSrNo').value = generateSerialNumber(assetsData);
    }
}

// Edit asset
function editAsset(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');
    
    // Populate form with existing data
    document.getElementById('assetSrNo').value = cells[0].textContent;
    document.getElementById('assetNumber').value = cells[1].textContent;
    document.getElementById('assetName').value = cells[2].textContent;
    document.getElementById('assetDepartment').value = cells[3].textContent;
    document.getElementById('assetHostname').value = cells[4].textContent;
    document.getElementById('assetUsername').value = cells[5].textContent;
    document.getElementById('assetSerial').value = cells[6].textContent;
    document.getElementById('assetDevice').value = cells[7].textContent;
    
    // Scroll to form
    document.getElementById('assetsForm').scrollIntoView({ behavior: 'smooth' });
}

// Search assets
function searchAssets() {
    const searchInput = document.getElementById('assetSearch').value;
    performSearch(searchInput, 'assetsTableBody', [1, 2, 3, 4, 5, 6, 7]); // All columns except Sr.No and Actions
}

// Plant Management
function selectPlant() {
    const plantSelect = document.getElementById('plantSelect');
    const selectedPlant = plantSelect.value;
    
    if (selectedPlant) {
        const plantNames = {
            'plant1': 'Plant 1',
            'plant2': 'Plant 2',
            'dharwad': 'Dharwad'
        };
        
        document.getElementById('plantModalTitle').textContent = plantNames[selectedPlant] + ' Details';
        document.getElementById('plantModal').style.display = 'block';
        
        // Set next serial number for plant
        const plantData = getStorageData(`plant_${selectedPlant}`);
        document.getElementById('plantSrNo').value = generateSerialNumber(plantData);
        
        // Load plant data table
        loadPlantTable(selectedPlant);
    }
}

// Close plant modal
function closePlantModal() {
    document.getElementById('plantModal').style.display = 'none';
    document.getElementById('plantSelect').value = '';
}

// Load plant table (without delete button)
function loadPlantTable(plantType) {
    const plantData = getStorageData(`plant_${plantType}`);
    const tableBody = document.getElementById('plantTableBody');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    plantData.forEach(plant => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${plant.srNo}</td>
            <td>${plant.assetName}</td>
            <td>${plant.name}</td>
            <td>${plant.department}</td>
            <td>${plant.username}</td>
            <td>${plant.serialNumber}</td>
            <td>${plant.device}</td>
            <td>${plant.hostName}</td>
            <td>${plant.lastName}</td>
            <td>
                <button class="btn btn-success" onclick="editPlantData(this, '${plantType}')">Edit</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Handle plant form submission
document.addEventListener('DOMContentLoaded', function() {
    const plantForm = document.getElementById('plantForm');
    if (plantForm) {
        plantForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const selectedPlant = document.getElementById('plantSelect').value;
            if (!selectedPlant) {
                alert('Please select a plant first.');
                return;
            }
            
            const formData = {
                srNo: document.getElementById('plantSrNo').value,
                assetName: document.getElementById('plantAssetName').value,
                name: document.getElementById('plantName').value,
                department: document.getElementById('plantDepartment').value,
                username: document.getElementById('plantUsername').value,
                serialNumber: document.getElementById('plantSerial').value,
                device: document.getElementById('plantDevice').value,
                hostName: document.getElementById('plantHostName').value,
                lastName: document.getElementById('plantLastName').value
            };
            
            // Validate required fields
            const requiredFields = Object.keys(formData).filter(key => key !== 'srNo');
            const missingFields = requiredFields.filter(field => !formData[field]);
            
            if (missingFields.length > 0) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Save to localStorage
            const plantData = getStorageData(`plant_${selectedPlant}`);
            
            // Check if editing existing record
            const existingIndex = plantData.findIndex(item => item.srNo === formData.srNo);
            if (existingIndex !== -1) {
                plantData[existingIndex] = formData;
            } else {
                plantData.push(formData);
            }
            
            setStorageData(`plant_${selectedPlant}`, plantData);
            
            // Show success message
            showSuccessMessage('Plant data saved successfully!');
            
            // Reset form and reload table
            resetPlantForm();
            loadPlantTable(selectedPlant);
            
            // Set next serial number
            document.getElementById('plantSrNo').value = generateSerialNumber(getStorageData(`plant_${selectedPlant}`));
        });
    }
});

// Reset plant form
function resetPlantForm() {
    const form = document.getElementById('plantForm');
    if (form) {
        form.reset();
        const selectedPlant = document.getElementById('plantSelect').value;
        if (selectedPlant) {
            const plantData = getStorageData(`plant_${selectedPlant}`);
            document.getElementById('plantSrNo').value = generateSerialNumber(plantData);
        }
    }
}

// Edit plant data
function editPlantData(button, plantType) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');
    
    // Populate form with existing data
    document.getElementById('plantSrNo').value = cells[0].textContent;
    document.getElementById('plantAssetName').value = cells[1].textContent;
    document.getElementById('plantName').value = cells[2].textContent;
    document.getElementById('plantDepartment').value = cells[3].textContent;
    document.getElementById('plantUsername').value = cells[4].textContent;
    document.getElementById('plantSerial').value = cells[5].textContent;
    document.getElementById('plantDevice').value = cells[6].textContent;
    document.getElementById('plantHostName').value = cells[7].textContent;
    document.getElementById('plantLastName').value = cells[8].textContent;
}

// Search plant data
function searchPlantData() {
    const searchInput = document.getElementById('plantSearch').value;
    performSearch(searchInput, 'plantTableBody', [1, 2, 3, 4, 5, 6, 7, 8]); // All columns except Sr.No and Actions
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('plantModal');
    if (event.target === modal) {
        closePlantModal();
    }
}