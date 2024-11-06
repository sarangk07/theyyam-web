// db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


export async function openDB() {
    return open({
        filename: './mydatabase.db', // This is where you specify the name of your SQLite database file
        driver: sqlite3.Database,
    });
}