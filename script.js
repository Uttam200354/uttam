// User credentials database
const users = {
    admin: {
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        dashboard: 'admin-dashboard.html'
    },
    deepak: {
        username: 'deepak',
        password: 'deepak123',
        role: 'user',
        dashboard: 'deepak-dashboard.html'
    },
    shivaji: {
        username: 'shivaji',
        password: 'shivaji123',
        role: 'user',
        dashboard: 'shivaji-dashboard.html'
    }
};

let selectedUserType = '';

// DOM elements
const userCards = document.querySelectorAll('.user-card');
const selectedUserElement = document.getElementById('selectedUser');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginForm = document.getElementById('loginForm');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to user cards
    userCards.forEach(card => {
        card.addEventListener('click', function() {
            selectUser(this.dataset.user);
        });
    });

    // Add form submit listener
    loginForm.addEventListener('submit', handleLogin);

    // Clear form on load
    clearForm();
});

function selectUser(userType) {
    selectedUserType = userType;
    
    // Remove selected class from all cards
    userCards.forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selected class to clicked card
    const selectedCard = document.querySelector(`[data-user="${userType}"]`);
    selectedCard.classList.add('selected');
    
    // Update selected user display
    selectedUserElement.textContent = `Selected: ${userType.charAt(0).toUpperCase() + userType.slice(1)}`;
    
    // Pre-fill username if available
    if (users[userType]) {
        usernameInput.value = users[userType].username;
    }
    
    // Clear password
    passwordInput.value = '';
    passwordInput.focus();
}

function handleLogin(event) {
    event.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Validate user selection
    if (!selectedUserType) {
        showError('Please select a user type first');
        return;
    }
    
    // Validate credentials
    if (!username || !password) {
        showError('Please enter both username and password');
        return;
    }
    
    // Check credentials
    const user = users[selectedUserType];
    if (user && user.username === username && user.password === password) {
        // Store user session
        sessionStorage.setItem('currentUser', JSON.stringify({
            type: selectedUserType,
            username: username,
            role: user.role,
            timestamp: new Date().getTime()
        }));
        
        // Show success animation
        showLoginSuccess();
        
        // Redirect to appropriate dashboard
        setTimeout(() => {
            window.location.href = user.dashboard;
        }, 1500);
    } else {
        showError('Invalid username or password');
    }
}

function showError(message) {
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background: #f8d7da;
        color: #721c24;
        padding: 15px;
        border-radius: 5px;
        margin: 15px 0;
        border: 1px solid #f5c6cb;
        animation: shake 0.5s ease-in-out;
    `;
    errorDiv.textContent = message;
    
    // Remove existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Insert error message
    loginForm.insertAdjacentElement('afterend', errorDiv);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
    
    // Add shake animation to form
    const loginBox = document.querySelector('.login-box');
    loginBox.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
        loginBox.style.animation = '';
    }, 500);
}

function showLoginSuccess() {
    // Create success overlay
    const successOverlay = document.createElement('div');
    successOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;
    
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        animation: successPop 0.5s ease-out;
    `;
    
    successMessage.innerHTML = `
        <div style="color: #27ae60; font-size: 60px; margin-bottom: 20px;">
            <i class="fas fa-check-circle"></i>
        </div>
        <h2 style="color: #2c3e50; margin-bottom: 10px;">Login Successful!</h2>
        <p style="color: #7f8c8d;">Redirecting to dashboard...</p>
        <div class="loading-dots" style="margin-top: 20px;">
            <span style="animation: loadingDot 1.4s infinite ease-in-out both; animation-delay: -0.32s;">.</span>
            <span style="animation: loadingDot 1.4s infinite ease-in-out both; animation-delay: -0.16s;">.</span>
            <span style="animation: loadingDot 1.4s infinite ease-in-out both;">.</span>
        </div>
    `;
    
    successOverlay.appendChild(successMessage);
    document.body.appendChild(successOverlay);
}

function clearForm() {
    usernameInput.value = '';
    passwordInput.value = '';
    selectedUserType = '';
    selectedUserElement.textContent = 'Please select a user type above';
    
    // Remove selected class from all cards
    userCards.forEach(card => {
        card.classList.remove('selected');
    });
}

// Logout function (will be used in dashboard)
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Check if user is already logged in
function checkAuth() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        const currentTime = new Date().getTime();
        const sessionTime = user.timestamp;
        
        // Check if session is still valid (24 hours)
        if (currentTime - sessionTime < 24 * 60 * 60 * 1000) {
            return user;
        } else {
            sessionStorage.removeItem('currentUser');
        }
    }
    return null;
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
    
    @keyframes successPop {
        0% {
            opacity: 0;
            transform: scale(0.5);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes loadingDot {
        0%, 80%, 100% {
            transform: scale(0);
        }
        40% {
            transform: scale(1);
        }
    }
    
    .loading-dots span {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #3498db;
        margin: 0 2px;
    }
`;
document.head.appendChild(style);