import 'dotenv/config';
import pg from 'pg';
import express from 'express';
import { ClientError, errorMiddleware } from './lib/index.js';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
app.use(express.json());
// app.use(express.static('public'))


type UnsavedEntry = {
  title: string;
  notes: string;
  photoUrl: string;
};
type Entry = UnsavedEntry & {
  entryId: number;
};

// GET - list of notes
app.get('/api/entries', async (req, res, next) => {
  try {
    const sql = `
      select *
      from "entries"
    `;
    const result = await db.query<Entry>(sql);
    res.json(result.rows)
  } catch (error) {
    next(error);
  }
});

// GET - single entry by id
app.get('/api/entries/:entryId', async (req, res, next) => {
  try {
    const entryId = Number(req.params.entryId);
    if (!entryId) {
      throw new ClientError(400, 'invalid entryId');
    }
    const sql = `
      select *
      from "entries"
      where "entryId" = $1
    `;
    const params = [entryId];
    const result = await db.query<Entry>(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(404, 'no entry at this id');
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// POST - create new entry
app.post('/api/entries', async (req, res, next) => {
  try {
    const {title, notes, photoUrl} = req.body;
    console.log (title, notes);
    const sql = `
      insert into "entries" (title, notes, photoUrl)
      values ($1, $2, ,$3)
      returning *
    `;
    const params = [title, notes, photoUrl];
    const result = await db.query<UnsavedEntry>(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(404, 'no entry at this id');
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// PUT - edit an entry
app.put('/api/entries/:entryId', async (req, res, next) => {
  try {
    const entryId = Number(req.params.entryId);
    if (!entryId) {
      throw new ClientError(400, 'invalid entryId');
    }
    const sql = `
      select *
      from "entries"
      where "entryId" = $1
    `;
    const params = [entryId];
    const result = await db.query<Entry>(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(404, 'no entry at this id');
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// DELETE - delete an entry
app.delete('/api/entries/:entryId', async (req, res, next) => {
  try {
    const entryId = Number(req.params.entryId);
    if (!entryId) {
      throw new ClientError(400, 'invalid entryId');
    }
    const sql = `
      select *
      from "entries"
      where "entryId" = $1
    `;
    const params = [entryId];
    const result = await db.query<Entry>(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(404, 'no entry at this id');
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// add useeffect

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`express server listening on port ${process.env.PORT}`);
});
