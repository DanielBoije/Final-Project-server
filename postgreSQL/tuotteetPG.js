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

const haetuotteet = (t) => {
    pool.query('SELECT * from tuotteet ORDER BY id', (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rows);
    })
}
const haetuote = (id, t) => {
    pool.query('SELECT * FROM tuotteet WHERE id=$1', [id], (err, results) => {
        if (err) throw err;
        console.dir(results.rows);
        t(results.rows);
    })
}
const luotuote = (uusituote, t) => {
    const { tuotenimi, tuntitavoite } = uusituote;
    pool.query('INSERT INTO tuotteet (tuotenimi, tuntitavoite) VALUES ($1, $2)', [tuotenimi, tuntitavoite], (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rowCount);
    })
}

const paivitatuote = (tuote, id, t) => {
    const { tuotenimi, tuntitavoite } = tuote;
    pool.query('UPDATE tuotteet SET tuotenimi=$1, tuntitavoite=$2 WHERE id=$3', [tuotenimi, tuntitavoite, id], (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rowCount);
    })
}
const poistatuote = (id, t) => {
    pool.query('DELETE FROM tuotteet WHERE id=$1', [id], (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rowCount);
    })
}
module.exports = { haetuotteet, haetuote, luotuote, paivitatuote, poistatuote }