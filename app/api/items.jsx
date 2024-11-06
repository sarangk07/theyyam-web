// app/api/datas/items.js
import { openDB } from "@/db.mjs";

export default async function handler(req, res) {
    const db = await openDB();

    if (req.method === 'GET') {
        const items = await db.all('SELECT * FROM items');
        res.status(200).json(items);
    } else if (req.method === 'POST') {
        const { name } = req.body;
        await db.run('INSERT INTO items (name) VALUES (?)', name);
        res.status(201).json({ message: 'Item added' });
    }
}