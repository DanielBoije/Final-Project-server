const USER = process.env.PGUSER;
const PASSWORD = process.env.PGPASSWORD;


const Pool = require('pg').Pool;
require('dotenv').config();
const conopts = {
    user: USER,
    password: PASSWORD,
    host: '',
    database: ''
}

const pool=new Pool(conopts)  

const haehairiot = (h) => {
    pool.query('SELECT * from hairiot ORDER BY id', (err, results) => {
        if (err) throw err;
        console.dir(results);
        h(results.rows);
    })
}
const haehairio = (id, h) => {
    pool.query('SELECT * FROM hairiot WHERE id=$1', [id], (err, results) => {
        if (err) throw err;
        console.dir(results.rows);
        h(results.rows);
    })
}
const luohairio = (uusihairio, h) => {
    const { hairio } = uusihairio;
    pool.query('INSERT INTO hairiot (hairio) VALUES ($1)', [hairio], (err, results) => {
        if (err) throw err;
        console.dir(results);
        h(results.rowCount);
    })
}

const paivitahairio = (hairiot, id, h) => {
    const { hairio } = hairiot;
    pool.query('UPDATE hairiot SET hairio=$1, WHERE id=$2', [hairio, id], (err, results) => {
        if (err) throw err;
        console.dir(results);
        h(results.rowCount);
    })
}
const poistahairio = (id, h) => {
    pool.query('DELETE FROM hairiot WHERE id=$1', [id], (err, results) => {
        if (err) throw err;
        console.dir(results);
        h(results.rowCount);
    })
}
module.exports = { haehairiot, haehairio, luohairio, paivitahairio, poistahairio }