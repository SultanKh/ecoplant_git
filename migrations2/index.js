const fs = require('fs');
const csv = require('csv-parser');
const { Pool } = require('pg');

// PostgreSQL configuration
const pgConfig = {
    user: 'sultan',
    host: 'localhost',
    database: 'ecoplant',
    password: 'sultan',
    port: 5432,
};

// Create a PostgreSQL connection pool
const pool = new Pool(pgConfig);

// Path to your CSV file
const filePath = '../BE_dev.csv';

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS eco_table (
    id SERIAL PRIMARY KEY,
    time_stamp TIMESTAMP,
    kwh NUMERIC,
    pressure NUMERIC,
    temp NUMERIC
  );
`;
// Function to migrate data from CSV to PostgreSQL
async function migrateData() {
    const client = await pool.connect();

    try {
        await client.query(createTableQuery);

        await client.query('BEGIN');


        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', async (row) => {
                // Insert the data into the PostgreSQL database

                let timeValue = new Date(Object.values(row)[0])
                const query = 'INSERT INTO eco_table (time_stamp, kwh, pressure, temp) VALUES ($1, $2, $3, $4)';
                // const query = 'Select * from eco_table';
                const values = [timeValue, row.kwh, row.pressure, row.temp];
                await client.query(query, values);
            })
            .on('end', async () => {
                // Commit the transaction
                await client.query('COMMIT');
                console.log('Migration completed.');
            });
    } catch (error) {
        // Rollback the transaction in case of an error
        await client.query('ROLLBACK');
        console.error('Error during data migration:', error);
    } finally {
        client.release();

    }
}

// Run the migration
migrateData();
