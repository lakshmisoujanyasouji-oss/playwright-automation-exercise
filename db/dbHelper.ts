import Database from 'better-sqlite3';
import path from 'path';

// Database file location
const DB_PATH = path.join(__dirname, 'testdata.db');

// Create and initialize database
export function getDatabase(): Database.Database {
    const db = new Database(DB_PATH);
    return db;
}

// Initialize tables - run once before tests
export function initializeDatabase(): void {
    const db = getDatabase();

    // Create products table
    db.exec(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            price TEXT NOT NULL,
            category TEXT NOT NULL
        )
    `);

    // Create users table
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Seed products data if empty
    const count = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
    
    if (count.count === 0) {
        const insert = db.prepare(
            'INSERT INTO products (id, name, price, category) VALUES (?, ?, ?, ?)'
        );
        insert.run(1, 'Blue Top', 'Rs. 500', 'Women');
        insert.run(2, 'Men Tshirt', 'Rs. 400', 'Men');
        insert.run(3, 'Sleeveless Dress', 'Rs. 1000', 'Women');
        insert.run(4, 'Stylish Dress', 'Rs. 1500', 'Women');
        insert.run(5, 'Winter Top', 'Rs. 600', 'Women');
    }

    db.close();
}

// Get all products from DB
export function getAllProducts(): any[] {
    const db = getDatabase();
    const products = db.prepare('SELECT * FROM products').all();
    db.close();
    return products;
}

// Get product by name
export function getProductByName(name: string): any {
    const db = getDatabase();
    const product = db.prepare('SELECT * FROM products WHERE name = ?').get(name);
    db.close();
    return product;
}

// Insert user into DB
export function insertUser(name: string, email: string): void {
    const db = getDatabase();
    db.prepare('INSERT OR IGNORE INTO users (name, email) VALUES (?, ?)').run(name, email);
    db.close();
}

// Get user by email
export function getUserByEmail(email: string): any {
    const db = getDatabase();
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    db.close();
    return user;
}

// Delete user by email
export function deleteUserByEmail(email: string): void {
    const db = getDatabase();
    db.prepare('DELETE FROM users WHERE email = ?').run(email);
    db.close();
}

// Check if user exists
export function userExists(email: string): boolean {
    const user = getUserByEmail(email);
    return user !== undefined;
}