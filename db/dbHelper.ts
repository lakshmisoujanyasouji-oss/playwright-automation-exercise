import Database from 'better-sqlite3';
import path from 'path';

// ─── Database Path ─────────────────────────────────────────────────────────────
const DB_PATH = path.join(__dirname, 'testdata.db');

// ─── Interfaces ────────────────────────────────────────────────────────────────
export interface Product {
    id: number;
    name: string;
    price: string;
    category: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

// ─── Connection ────────────────────────────────────────────────────────────────

// Single shared connection for the session
let _db: Database.Database | null = null;

export function getDatabase(): Database.Database {
    if (!_db || !_db.open) {
        _db = new Database(DB_PATH);
    }
    return _db;
}

export function closeDatabase(): void {
    if (_db && _db.open) {
        _db.close();
        _db = null;
    }
}

// ─── Initialization ────────────────────────────────────────────────────────────

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

    // Seed products if empty
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
}

// ─── Product Queries ───────────────────────────────────────────────────────────

export function getAllProducts(): Product[] {
    const db = getDatabase();
    return db.prepare('SELECT * FROM products').all() as Product[];
}

export function getProductByName(name: string): Product | undefined {
    const db = getDatabase();
    return db.prepare('SELECT * FROM products WHERE name = ?').get(name) as Product | undefined;
}

export function getProductsByCategory(category: string): Product[] {
    const db = getDatabase();
    return db.prepare('SELECT * FROM products WHERE category = ?').all(category) as Product[];
}

export function getProductById(id: number): Product | undefined {
    const db = getDatabase();
    return db.prepare('SELECT * FROM products WHERE id = ?').get(id) as Product | undefined;
}

// ─── User Queries ──────────────────────────────────────────────────────────────

export function insertUser(name: string, email: string): void {
    const db = getDatabase();
    db.prepare('INSERT OR IGNORE INTO users (name, email) VALUES (?, ?)').run(name, email);
}

export function getUserByEmail(email: string): User | undefined {
    const db = getDatabase();
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User | undefined;
}

export function deleteUserByEmail(email: string): void {
    const db = getDatabase();
    db.prepare('DELETE FROM users WHERE email = ?').run(email);
}

export function userExists(email: string): boolean {
    return getUserByEmail(email) !== undefined;
}

export function getAllUsers(): User[] {
    const db = getDatabase();
    return db.prepare('SELECT * FROM users').all() as User[];
}