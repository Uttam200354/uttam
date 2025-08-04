// User credentials
const userCredentials = {
    admin: { username: 'admin123', password: 'admin@123' },
    deepak: { username: 'deepak456', password: 'deepak@456' },
    shivaji: { username: 'shivaji789', password: 'shivaji@789' }
};

let selectedUser = null;

function selectUser(userType) {
    selectedUser = userType;
    
    // Remove active class from all buttons
    document.querySelectorAll('.user-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected button
    event.target.classList.add('active');
    
    // Pre-fill username
    const usernameField = document.getElementById('username');
    usernameField.value = userCredentials[userType].username;
    
    // Clear password field
    document.getElementById('password').value = '';
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!selectedUser) {
        alert('Please select a user type first!');
        return;
    }
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const credentials = userCredentials[selectedUser];
    
    if (username === credentials.username && password === credentials.password) {
        // Store user session
        localStorage.setItem('currentUser', selectedUser);
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirect to dashboard
        window.location.href = `dashboard-${selectedUser}.html`;
    } else {
        alert('Invalid username or password!');
    }
});

// Add floating animation to shapes
window.addEventListener('load', function() {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        shape.style.left = randomX + '%';
        shape.style.top = randomY + '%';
    });
});