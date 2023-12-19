const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(cors());




const pgConfig = {
  user: 'sultan',
  host: 'localhost',
  database: 'ecoplant',
  password: 'sultan',
  port: 5432,
};


const pool = new Pool(pgConfig);

// GET endpoint to retrieve all data
app.get('/api/data', async (req, res) => {
  try {
    const client = await pool.connect();
    const {page, limit} = req.query
    const result = await client.query('SELECT * FROM eco_table LIMIT $1 offset $2', [+limit, (+page - 1) * limit]);
    const data = result.rows;
    const totalPages = await client.query('SELECT count(*) FROM eco_table');

    client.release();
    res.json({total: totalPages.rows[0].count / limit ,rows: data});
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
