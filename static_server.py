#!/usr/bin/env python3
"""
Static file server for ACGL Management System
Serves HTML, CSS, and JS files on port 8000
"""

import http.server
import socketserver
import os
from urllib.parse import urlparse

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()
    
    def translate_path(self, path):
        # Parse the URL
        parsed_url = urlparse(path)
        path = parsed_url.path
        
        # Default to index.html for root
        if path == '/':
            path = '/index.html'
        
        # Map paths to files
        if path == '/dashboard-admin':
            path = '/dashboard-admin.html'
        elif path == '/dashboard-deepak':
            path = '/dashboard-deepak.html'
        elif path == '/dashboard-shivaji':
            path = '/dashboard-shivaji.html'
        
        return super().translate_path(path)

def run_server():
    PORT = 8000
    
    # Change to the directory containing the HTML files
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"Static file server running on http://localhost:{PORT}")
        print("Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

if __name__ == "__main__":
    run_server()