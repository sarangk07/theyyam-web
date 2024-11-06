import { openDB } from '../db.mjs';
import bcrypt from 'bcryptjs';

async function createAdmin() {
    try {
        const db = await openDB();
        
        // Default admin credentials - change these!
        const adminUser = {
            username: 'admin',
            password: 'admin123' // You should change this!
        };

        // Hash the password
        const hashedPassword = await bcrypt.hash(adminUser.password, 10);

        // Check if admin already exists
        const existingAdmin = await db.get('SELECT * FROM admins WHERE username = ?', [adminUser.username]);
        
        if (existingAdmin) {
            console.log('Admin user already exists!');
            return;
        }

        // Insert admin user
        await db.run(
            'INSERT INTO admins (username, password) VALUES (?, ?)',
            [adminUser.username, hashedPassword]
        );

        console.log('Admin user created successfully!');
        console.log('Username:', adminUser.username);
        console.log('Password:', adminUser.password);
    } catch (error) {
        console.error('Error creating admin:', error);
    }
}

createAdmin();