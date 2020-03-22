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

const haetot_hait = (t) => {
    pool.query('SELECT * from tot_hai ORDER BY tot_id && hair_id', (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rows);
    })
}
const haetot_hai = (tot_id, hair_id, t) => {
    pool.query('SELECT * FROM tot_hai WHERE tot_id=$1, hair_id=$2', [tot_id, hair_id], (err, results) => {
        if (err) throw err;
        console.dir(results.rows);
        t(results.rows);
    })
}
const luotot_hai = (uusitot_hai, t) => {
    const { toteumat, hairiot, hairiokesto } = uusitot_hai;
    pool.query('INSERT INTO tot_hai (toteumat, hairiot, hairiokesto) VALUES ($1, $2, $3)', [toteumat, hairiot, hairiokesto], (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rowCount);
    })
}

const paivitatot_hai = (tot_hait, tot_id, hair_id, t) => {
    const { toteumat, hairiot, hairiokesto } = tot_hait;
    pool.query('UPDATE tot_hai SET toteumat=$1, hairiot=$2, hairiokesto=$3 WHERE tot_id=$4, hair_id=$5', [toteumat, hairiot, hairiokesto, tot_id, hair_id], (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rowCount);
    })
}
const poistatot_hai = (tot_id, hair_id, t) => {
    pool.query('DELETE FROM tot_hai WHERE tot_id=$1, hair_id=$2', [tot_id, hair_id], (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rowCount);
    })
}
module.exports = { haetot_hait, haetot_hai, luotot_hai, paivitatot_hai, poistatot_hai }