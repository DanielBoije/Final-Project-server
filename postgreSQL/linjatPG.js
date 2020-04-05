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

const haelinjat = (l) => {
    pool.query('SELECT * from linjat ORDER BY id', (err, results) => {
        if (err) throw err;
        console.dir(results);
        l(results.rows);
    })
}
const haelinja = (id, l) => {
    pool.query('SELECT * FROM linjat WHERE id=$1', [id], (err, results) => {
        if (err) throw err;
        console.dir(results.rows);
        l(results.rows);
    })
}

const luolinja = (uusilinja, l) => {
    const { nimi } = uusilinja;
    pool.query('INSERT INTO linjat (nimi) VALUES ($1)', [nimi], (err, results) => {
        if (err) throw err;
        console.dir(results);
        l(results.rowCount);
    })
}

const paivitalinja = (linjat, id, l) => {
    const { nimi } = linjat;
    pool.query('UPDATE linjat SET nimi=$1, WHERE id=$2', [nimi, id], (err, results) => {
        if (err) throw err;
        console.dir(results);
        l(results.rowCount);
    })
}
const poistalinja = (id, l) => {
    pool.query('DELETE FROM linjat WHERE id=$1', [id], (err, results) => {
        if (err) throw err;
        console.dir(results);
        l(results.rowCount);
    })
}
module.exports = { haelinjat, haelinja, luolinja, paivitalinja, poistalinja }