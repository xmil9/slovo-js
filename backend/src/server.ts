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
app.get('/api/words', (req: Request, res: Response<Word[] | Error>) => {
    db.all('SELECT * FROM words', (err, result: any) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});

app.get('/api/word-count', (req: Request, res: Response<number | Error>) => {
    db.get('SELECT COUNT(*) FROM words', (err, result: any) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result['COUNT(*)']);
    });
});

app.get('/api/word/:wordId', (req: Request, res: Response<Word | Error>) => {
    db.get(`SELECT * FROM words WHERE id=?`, [req.params.wordId], (err, result: any) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
