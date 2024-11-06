import { openDB } from './db.mjs';

async function init() {
    try {
        const db = await openDB();
        
        // Admin table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS admins (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        `);

        // Temples table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS temples (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                place TEXT,
                location TEXT,
                phone TEXT,
                address TEXT,
                img TEXT,
                images TEXT,
                popularity INTEGER DEFAULT 0,
                festival_duration_days INTEGER,
                malayala_masam TEXT,
                festival_start_time TEXT,
                festival_end_time TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Theyyams table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS theyyams (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                descriptions TEXT,
                img TEXT,
                imgs TEXT,
                popularity INTEGER DEFAULT 0,
                story TEXT,
                god TEXT,
                temples TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Temple-Theyyam relationship table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS temple_theyyams (
                temple_id INTEGER,
                theyyam_id INTEGER,
                FOREIGN KEY (temple_id) REFERENCES temples (id),
                FOREIGN KEY (theyyam_id) REFERENCES theyyams (id),
                PRIMARY KEY (temple_id, theyyam_id)
            )
        `);

        console.log('Database initialized');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

init();