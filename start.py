#!/usr/bin/env python3
"""
Startup Script for ACGL Management System
Runs both API server and static file server
"""

import subprocess
import sys
import time
import signal
import os
from pathlib import Path

def print_banner():
    """Print the ACGL Management System banner"""
    print("=" * 70)
    print("🏭 ACGL Management System")
    print("=" * 70)
    print("🚀 Starting servers...")
    print("=" * 70)

def check_dependencies():
    """Check if required files exist"""
    required_files = [
        'server.py',
        'static_server.py',
        'index.html',
        'requirements.txt'
    ]
    
    missing_files = []
    for file in required_files:
        if not Path(file).exists():
            missing_files.append(file)
    
    if missing_files:
        print("❌ Missing required files:")
        for file in missing_files:
            print(f"   - {file}")
        print("\nPlease ensure all files are in the current directory.")
        return False
    
    return True

def install_dependencies():
    """Install Python dependencies"""
    try:
        print("📦 Installing dependencies...")
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], 
                      check=True, capture_output=True)
        print("✅ Dependencies installed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing dependencies: {e}")
        return False

def start_servers():
    """Start both API and static servers"""
    try:
        # Start API server in background
        print("🔧 Starting API server on port 5000...")
        api_process = subprocess.Popen([sys.executable, "server.py"], 
                                     stdout=subprocess.PIPE, 
                                     stderr=subprocess.PIPE)
        
        # Wait a moment for API server to start
        time.sleep(2)
        
        # Start static server in background
        print("🌐 Starting static server on port 8000...")
        static_process = subprocess.Popen([sys.executable, "static_server.py"], 
                                        stdout=subprocess.PIPE, 
                                        stderr=subprocess.PIPE)
        
        # Wait a moment for static server to start
        time.sleep(2)
        
        print("\n" + "=" * 70)
        print("✅ Servers started successfully!")
        print("=" * 70)
        print("🌐 Frontend: http://localhost:8000")
        print("🔧 API: http://localhost:5000")
        print("=" * 70)
        print("🔐 Available Users:")
        print("   👨‍💼 Admin:   username: admin123   | password: admin@123")
        print("   👨‍💻 Deepak:  username: deepak456  | password: deepak@456")
        print("   👨‍🔧 Shivaji: username: shivaji789 | password: shivaji@789")
        print("=" * 70)
        print("Press Ctrl+C to stop all servers")
        print("=" * 70)
        
        # Keep the script running
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("\n🛑 Stopping servers...")
            api_process.terminate()
            static_process.terminate()
            print("✅ Servers stopped")
            print("👋 Thank you for using ACGL Management System!")
            
    except Exception as e:
        print(f"❌ Error starting servers: {e}")
        return False

def main():
    """Main function"""
    print_banner()
    
    # Check dependencies
    if not check_dependencies():
        sys.exit(1)
    
    # Install dependencies
    if not install_dependencies():
        print("⚠️  Continuing without installing dependencies...")
    
    # Start servers
    if not start_servers():
        sys.exit(1)

if __name__ == "__main__":
    main()