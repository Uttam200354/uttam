const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SQLite Connection
const dbPath = path.join(__dirname, 'acgl_management.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to SQLite database');
  initializeDatabase();
});

// Initialize Database Tables
function initializeDatabase() {
  const tables = [
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('admin', 'deepak', 'shivaji')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS assets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sr_number INTEGER NOT NULL,
      assets_number TEXT NOT NULL,
      name TEXT NOT NULL,
      department TEXT NOT NULL,
      hostname TEXT,
      username TEXT,
      serial_number TEXT,
      device TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS software_licenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sr_number INTEGER NOT NULL,
      software_key TEXT NOT NULL,
      name TEXT NOT NULL,
      department TEXT NOT NULL,
      hostname TEXT,
      username TEXT,
      ms_office INTEGER DEFAULT 0,
      autocad INTEGER DEFAULT 0,
      cero INTEGER DEFAULT 0,
      device TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS sap_servers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sr_number INTEGER NOT NULL,
      server_brand TEXT NOT NULL,
      serial_number TEXT NOT NULL,
      model_number TEXT NOT NULL,
      hard_disk TEXT,
      total_ram TEXT,
      total_cpu TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS non_sap_servers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sr_number INTEGER NOT NULL,
      server_brand TEXT NOT NULL,
      serial_number TEXT NOT NULL,
      model_number TEXT NOT NULL,
      hard_disk TEXT,
      total_ram TEXT,
      total_cpu TEXT,
      vm TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS switches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sr_number INTEGER NOT NULL,
      switches_id TEXT NOT NULL,
      name TEXT NOT NULL,
      department TEXT NOT NULL,
      hostname TEXT,
      username TEXT,
      plant TEXT,
      device TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS cctv (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sr_number INTEGER NOT NULL,
      switches_id TEXT NOT NULL,
      name TEXT NOT NULL,
      department TEXT NOT NULL,
      hostname TEXT,
      username TEXT,
      plant TEXT,
      device TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS printers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sr_number INTEGER NOT NULL,
      switches_id TEXT NOT NULL,
      name TEXT NOT NULL,
      department TEXT NOT NULL,
      hostname TEXT,
      username TEXT,
      plant TEXT,
      device TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS plants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )`,
    
    `CREATE TABLE IF NOT EXISTS departments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )`
  ];

  tables.forEach(table => {
    db.run(table, (err) => {
      if (err) {
        console.error('Error creating table:', err);
      }
    });
  });

  // Insert default data
  db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
    if (err) {
      console.error('Error checking users:', err);
      return;
    }
    
    if (row.count === 0) {
      const defaultUsers = [
        ['admin', 'admin123', 'admin'],
        ['deepak', 'deepak123', 'deepak'],
        ['shivaji', 'shivaji123', 'shivaji']
      ];
      
      const stmt = db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)");
      defaultUsers.forEach(user => {
        stmt.run(user, (err) => {
          if (err) console.error('Error inserting user:', err);
        });
      });
      stmt.finalize();
    }
  });

  // Insert default plants and departments
  db.get("SELECT COUNT(*) as count FROM plants", (err, row) => {
    if (err) {
      console.error('Error checking plants:', err);
      return;
    }
    
    if (row.count === 0) {
      const defaultPlants = ['Plant A', 'Plant B', 'Plant C'];
      const stmt = db.prepare("INSERT INTO plants (name) VALUES (?)");
      defaultPlants.forEach(plant => {
        stmt.run(plant, (err) => {
          if (err) console.error('Error inserting plant:', err);
        });
      });
      stmt.finalize();
    }
  });

  db.get("SELECT COUNT(*) as count FROM departments", (err, row) => {
    if (err) {
      console.error('Error checking departments:', err);
      return;
    }
    
    if (row.count === 0) {
      const defaultDepartments = ['IT Department', 'HR Department', 'Finance Department'];
      const stmt = db.prepare("INSERT INTO departments (name) VALUES (?)");
      defaultDepartments.forEach(dept => {
        stmt.run(dept, (err) => {
          if (err) console.error('Error inserting department:', err);
        });
      });
      stmt.finalize();
    }
  });
}

// Authentication endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.get(query, [username, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (row) {
      res.json({ success: true, user: row });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Generic CRUD functions
const createGenericEndpoints = (tableName, fields) => {
  // GET all records
  app.get(`/api/${tableName}`, (req, res) => {
    const query = `SELECT * FROM ${tableName} ORDER BY id DESC`;
    db.all(query, (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows);
    });
  });

  // GET single record
  app.get(`/api/${tableName}/:id`, (req, res) => {
    const query = `SELECT * FROM ${tableName} WHERE id = ?`;
    db.get(query, [req.params.id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(row || {});
    });
  });

  // POST new record
  app.post(`/api/${tableName}`, (req, res) => {
    const fieldNames = fields.join(', ');
    const placeholders = fields.map(() => '?').join(', ');
    const values = fields.map(field => req.body[field]);
    
    const query = `INSERT INTO ${tableName} (${fieldNames}) VALUES (${placeholders})`;
    db.run(query, values, function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ success: true, id: this.lastID });
    });
  });

  // PUT update record
  app.put(`/api/${tableName}/:id`, (req, res) => {
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const values = fields.map(field => req.body[field]);
    values.push(req.params.id);
    
    const query = `UPDATE ${tableName} SET ${setClause} WHERE id = ?`;
    db.run(query, values, function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ success: true });
    });
  });

  // DELETE record
  app.delete(`/api/${tableName}/:id`, (req, res) => {
    const query = `DELETE FROM ${tableName} WHERE id = ?`;
    db.run(query, [req.params.id], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ success: true });
    });
  });

  // Search endpoint
  app.get(`/api/${tableName}/search/:term`, (req, res) => {
    const searchTerm = `%${req.params.term}%`;
    const searchFields = fields.map(field => `${field} LIKE ?`).join(' OR ');
    const values = fields.map(() => searchTerm);
    
    const query = `SELECT * FROM ${tableName} WHERE ${searchFields}`;
    db.all(query, values, (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows);
    });
  });
};

// Create endpoints for all tables
createGenericEndpoints('assets', ['sr_number', 'assets_number', 'name', 'department', 'hostname', 'username', 'serial_number', 'device']);
createGenericEndpoints('software_licenses', ['sr_number', 'software_key', 'name', 'department', 'hostname', 'username', 'ms_office', 'autocad', 'cero', 'device']);
createGenericEndpoints('sap_servers', ['sr_number', 'server_brand', 'serial_number', 'model_number', 'hard_disk', 'total_ram', 'total_cpu']);
createGenericEndpoints('non_sap_servers', ['sr_number', 'server_brand', 'serial_number', 'model_number', 'hard_disk', 'total_ram', 'total_cpu', 'vm']);
createGenericEndpoints('switches', ['sr_number', 'switches_id', 'name', 'department', 'hostname', 'username', 'plant', 'device']);
createGenericEndpoints('cctv', ['sr_number', 'switches_id', 'name', 'department', 'hostname', 'username', 'plant', 'device']);
createGenericEndpoints('printers', ['sr_number', 'switches_id', 'name', 'department', 'hostname', 'username', 'plant', 'device']);

// Get plants and departments for dropdowns
app.get('/api/plants', (req, res) => {
  const query = 'SELECT * FROM plants';
  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

app.get('/api/departments', (req, res) => {
  const query = 'SELECT * FROM departments';
  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});