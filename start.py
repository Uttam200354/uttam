#!/usr/bin/env python3
"""
Startup script for ACGL Management System
This script can start both servers or just the static server
"""

import subprocess
import sys
import os
import time
import signal
import threading

def run_flask_server():
    """Run the Flask API server"""
    try:
        subprocess.run([sys.executable, "server.py"], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Flask server error: {e}")
    except KeyboardInterrupt:
        print("\nFlask server stopped.")

def run_static_server():
    """Run the static file server"""
    try:
        subprocess.run([sys.executable, "static_server.py"], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Static server error: {e}")
    except KeyboardInterrupt:
        print("\nStatic server stopped.")

def main():
    print("ACGL Management System")
    print("=" * 30)
    print("1. Run both servers (API + Static)")
    print("2. Run static server only (Frontend only)")
    print("3. Exit")
    
    while True:
        try:
            choice = input("\nEnter your choice (1-3): ").strip()
            
            if choice == "1":
                print("\nStarting both servers...")
                print("API server will run on port 5000")
                print("Static server will run on port 8000")
                print("Access the application at: http://localhost:8000")
                print("\nPress Ctrl+C to stop all servers")
                
                # Start Flask server in a separate thread
                flask_thread = threading.Thread(target=run_flask_server, daemon=True)
                flask_thread.start()
                
                # Give Flask server time to start
                time.sleep(2)
                
                # Start static server in main thread
                run_static_server()
                
            elif choice == "2":
                print("\nStarting static server only...")
                print("Static server will run on port 8000")
                print("Access the application at: http://localhost:8000")
                print("Note: API features will not work without the Flask server")
                print("\nPress Ctrl+C to stop the server")
                
                run_static_server()
                
            elif choice == "3":
                print("Goodbye!")
                sys.exit(0)
                
            else:
                print("Invalid choice. Please enter 1, 2, or 3.")
                
        except KeyboardInterrupt:
            print("\n\nShutting down servers...")
            sys.exit(0)
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    main()