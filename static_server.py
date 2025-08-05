#!/usr/bin/env python3
"""
Static File Server for ACGL Management System
Serves HTML files and static assets
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

# Configuration
PORT = 8000
DIRECTORY = Path(__file__).parent

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add CORS headers for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

def main():
    """Start the static file server"""
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            print("=" * 60)
            print("🏭 ACGL Management System - Static File Server")
            print("=" * 60)
            print(f"🌐 Server running at: http://localhost:{PORT}")
            print(f"📁 Serving files from: {DIRECTORY}")
            print("🔐 Available Users:")
            print("   👨‍💼 Admin:   username: admin123   | password: admin@123")
            print("   👨‍💻 Deepak:  username: deepak456  | password: deepak@456")
            print("   👨‍🔧 Shivaji: username: shivaji789 | password: shivaji@789")
            print("=" * 60)
            print("Press Ctrl+C to stop the server")
            print("=" * 60)
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
        print("👋 Thank you for using ACGL Management System!")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Error: Port {PORT} is already in use")
            print(f"💡 Try a different port or stop the process using port {PORT}")
        else:
            print(f"❌ Error starting server: {e}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    main()