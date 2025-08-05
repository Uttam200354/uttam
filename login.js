// User credentials
const users = {
    admin: { username: 'admin', password: 'admin123', role: 'admin' },
    deepak: { username: 'deepak', password: 'deepak123', role: 'user' },
    shivaji: { username: 'shivaji', password: 'shivaji123', role: 'user' }
};

let selectedUser = '';

// DOM elements
const userButtons = document.querySelectorAll('.user-btn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

// User selection functionality
userButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        userButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Set selected user
        selectedUser = button.getAttribute('data-user');
        
        // Auto-fill username (optional)
        usernameInput.value = users[selectedUser].username;
    });
});

// Login button functionality
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Validation
    if (!selectedUser) {
        alert('Please select a user type first');
        return;
    }
    
    if (!username || !password) {
        alert('Please enter both username and password');
        return;
    }
    
    // Check credentials
    const user = users[selectedUser];
    if (username === user.username && password === user.password) {
        // Store user session
        localStorage.setItem('currentUser', JSON.stringify({
            username: user.username,
            role: user.role,
            userType: selectedUser
        }));
        
        // Redirect to dashboard
        window.location.href = `dashboard.html?user=${selectedUser}`;
    } else {
        alert('Invalid username or password');
    }
});

// Enter key support
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loginBtn.click();
    }
});

// Auto-clear form when user changes
userButtons.forEach(button => {
    button.addEventListener('click', () => {
        passwordInput.value = '';
        usernameInput.focus();
    });
});