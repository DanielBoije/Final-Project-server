const USER = process.env.PGUSER;
const PASSWORD = process.env.PGPASSWORD;


const Pool = require('pg').Pool;
require('dotenv').config();
const conopts = {
    user: USER,
    password: PASSWORD,
    host: 'localhost',
    database: 'seurantadb'
}

const pool=new Pool(conopts)  

const haetuotteet = (t) => {
    pool.query('SELECT * from tuotteet ORDER BY tuotenro', (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rows);
    })
}
const haetuote = (tuotenro, t) => {
    pool.query('SELECT * FROM tuotteet WHERE tuotenro=$1', [tuotenro], (err, results) => {
        if (err) throw err;
        console.dir(results.rows);
        t(results.rows);
    })
}
const luotuote = (uusituote, t) => {
    const { tuotenro, tuotenimi, tuntitavoite } = uusituote;
    pool.query('INSERT INTO tuotteet (tuotenro, tuotenimi, tuntitavoite) VALUES ($1, $2, $3)', [tuotenro, tuotenimi, tuntitavoite], (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rowCount);
    })
}

const paivitatuote = (tuote, tuotenro, t) => {
    const { tuotenimi, tuntitavoite } = tuote;
    pool.query('UPDATE tuotteet SET tuotenimi=$1, tuntitavoite=$2 WHERE tuotenro=$3', [tuotenimi, tuntitavoite, tuotenro], (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rowCount);
    })
}
const poistatuote = (tuotenro, t) => {
    pool.query('DELETE FROM tuotteet WHERE tuotenro=$1', [tuotenro], (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rowCount);
    })
}
module.exports = { haetuotteet, haetuote, luotuote, paivitatuote, poistatuote }