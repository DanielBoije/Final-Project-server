const USER = process.env.PGUSER;
const PASSWORD = process.env.PGPASSWORD;


const Pool = require('pg').Pool;
require('dotenv').config();
const conopts = {
    user: USER,
    password: PASSWORD,
    host: 'aldati-projektikanta.ccxgt0pdrbak.eu-west-1.rds.amazonaws.com',
    database: 'seurantadb'
}

const pool=new Pool(conopts)  

const haetyovuorot = (t) => {
    pool.query('SELECT * from tyovuorot ORDER BY id', (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rows);
    })
}
const haetyovuoro = (id, t) => {
    pool.query('SELECT * FROM tyovuorot WHERE id=$1', [id], (err, results) => {
        if (err) throw err;
        console.dir(results.rows);
        t(results.rows);
    })
}
const luotyovuoro = (uusityovuoro, t) => {
    const { tyovuoro } = uusityovuoro;
    pool.query('INSERT INTO tyovuorot (tyovuoro) VALUES ($1)', [tyovuoro], (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rowCount);
    })
}

const paivitatyovuoro = (tyovuorot, id, t) => {
    const { tyovuoro } = tyovuorot;
    pool.query('UPDATE tyovuorot SET tyovuoro=$1, WHERE id=$2', [tyovuoro, id], (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rowCount);
    })
}
const poistatyovuoro = (id, t) => {
    pool.query('DELETE FROM tyovuorot WHERE id=$1', [id], (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rowCount);
    })
}
module.exports = { haetyovuorot, haetyovuoro, luotyovuoro, paivitatyovuoro, poistatyovuoro }