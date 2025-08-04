#!/usr/bin/env python3
"""
Simple HTTP Server for ACGL Management System
Usage: python server.py [port]
Default port: 8000
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

class ACGLHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom HTTP handler for ACGL Management System"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def end_headers(self):
        # Add CORS headers for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()
    
    def do_GET(self):
        """Handle GET requests"""
        # Serve index.html for root path
        if self.path == '/' or self.path == '':
            self.path = '/index.html'
        
        # Add cache control for development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        
        return super().do_GET()
    
    def do_OPTIONS(self):
        """Handle OPTIONS requests for CORS"""
        self.send_response(200)
        self.end_headers()
    
    def log_message(self, format, *args):
        """Custom log message format"""
        print(f"[ACGL Server] {self.address_string()} - {format % args}")

def main():
    """Main server function"""
    # Default port
    port = 8000
    
    # Check if port is provided as command line argument
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print(f"Invalid port number: {sys.argv[1]}")
            print("Usage: python server.py [port]")
            sys.exit(1)
    
    # Check if we're in the right directory
    if not Path('index.html').exists():
        print("Error: index.html not found in current directory")
        print("Please run this server from the ACGL Management System root directory")
        sys.exit(1)
    
    # Create server
    try:
        with socketserver.TCPServer(("", port), ACGLHTTPRequestHandler) as httpd:
            print("=" * 60)
            print("🏭 ACGL Management System Server")
            print("=" * 60)
            print(f"🌐 Server running at: http://localhost:{port}")
            print(f"📁 Serving directory: {os.getcwd()}")
            print("🔐 Available Users:")
            print("   👨‍💼 Admin:   username: admin123   | password: admin@123")
            print("   👨‍💻 Deepak:  username: deepak456  | password: deepak@456")
            print("   👨‍🔧 Shivaji: username: shivaji789 | password: shivaji@789")
            print("=" * 60)
            print("Press Ctrl+C to stop the server")
            print("=" * 60)
            
            httpd.serve_forever()
            
    except OSError as e:
        if e.errno == 98:  # Address already in use
            print(f"❌ Error: Port {port} is already in use")
            print(f"💡 Try a different port: python server.py {port + 1}")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
        print("👋 Thank you for using ACGL Management System!")

if __name__ == "__main__":
    main()