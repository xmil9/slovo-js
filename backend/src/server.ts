import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const port = 3000;

// Disable CORS.
app.use(cors());

const dbPath = './assets/db/russian.db';

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Define types for your data rows if needed
interface Word {
	id: number;
    ru: string;
    en: string;
    wordClass: string;
}

interface Error {
	error: string;
}

// Define routes
app.get('/api/data', (req: Request, res: Response<Word[] | Error>) => {
    db.all('SELECT * FROM words', (err, rows: Word[]) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
