// User credentials
const userCredentials = {
    admin: { username: 'admin123', password: 'admin@123' },
    deepak: { username: 'deepak456', password: 'deepak@456' },
    shivaji: { username: 'shivaji789', password: 'shivaji@789' }
};

let selectedUser = null;
let isLoggingIn = false;

function selectUser(userType) {
    if (isLoggingIn) return;
    
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
    
    // Add success animation
    event.target.classList.add('success-animation');
    setTimeout(() => {
        event.target.classList.remove('success-animation');
    }, 600);
}

function showLoading() {
    isLoggingIn = true;
    const loginBtn = document.getElementById('loginBtn');
    const loginText = document.getElementById('loginText');
    const loginSpinner = document.getElementById('loginSpinner');
    
    loginText.style.display = 'none';
    loginSpinner.style.display = 'inline-block';
    loginBtn.disabled = true;
}

function hideLoading() {
    isLoggingIn = false;
    const loginBtn = document.getElementById('loginBtn');
    const loginText = document.getElementById('loginText');
    const loginSpinner = document.getElementById('loginSpinner');
    
    loginText.style.display = 'inline';
    loginSpinner.style.display = 'none';
    loginBtn.disabled = false;
}

async function authenticateUser(username, password) {
    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            return { success: true, user: data.user };
        } else {
            return { success: false, error: data.error };
        }
    } catch (error) {
        console.error('API Error:', error);
        // Fallback to local authentication if API is not available
        return authenticateLocally(username, password);
    }
}

function authenticateLocally(username, password) {
    const credentials = userCredentials[selectedUser];
    
    if (username === credentials.username && password === credentials.password) {
        return { 
            success: true, 
            user: {
                username: username,
                user_type: selectedUser,
                full_name: selectedUser.charAt(0).toUpperCase() + selectedUser.slice(1)
            }
        };
    } else {
        return { success: false, error: 'Invalid credentials' };
    }
}

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!selectedUser) {
        showNotification('Please select a user type first!', 'error');
        return;
    }
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        showNotification('Please enter both username and password!', 'error');
        return;
    }
    
    showLoading();
    
    try {
        const result = await authenticateUser(username, password);
        
        if (result.success) {
            // Store user session
            localStorage.setItem('currentUser', result.user.user_type);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userData', JSON.stringify(result.user));
            
            // Add success animation to login box
            const loginBox = document.querySelector('.login-box');
            loginBox.classList.add('success-animation');
            
            // Show success message
            showNotification('Login successful! Redirecting...', 'success');
            
            // Redirect to dashboard after a short delay
            setTimeout(() => {
                window.location.href = `dashboard-${result.user.user_type}.html`;
            }, 1000);
            
        } else {
            hideLoading();
            showNotification(result.error || 'Invalid username or password!', 'error');
        }
    } catch (error) {
        hideLoading();
        showNotification('An error occurred during login. Please try again.', 'error');
        console.error('Login error:', error);
    }
});

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            margin-left: 10px;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add floating animation to shapes with enhanced randomness
window.addEventListener('load', function() {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomDelay = Math.random() * 6;
        const randomDuration = 4 + Math.random() * 4;
        
        shape.style.left = randomX + '%';
        shape.style.top = randomY + '%';
        shape.style.animationDelay = randomDelay + 's';
        shape.style.animationDuration = randomDuration + 's';
    });
    
    // Add pulse animation to logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        logo.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+Enter to submit form
    if (e.ctrlKey && e.key === 'Enter') {
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
    
    // Escape to clear form
    if (e.key === 'Escape') {
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.querySelectorAll('.user-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        selectedUser = null;
    }
});

// Add form validation
document.getElementById('username').addEventListener('input', function() {
    this.style.borderColor = this.value ? '#667eea' : '#e1e8ed';
});

document.getElementById('password').addEventListener('input', function() {
    this.style.borderColor = this.value ? '#667eea' : '#e1e8ed';
});