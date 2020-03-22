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

const haetoteumat = (t) => {
    pool.query('SELECT * from toteumat ORDER BY id', (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rows);
    })
}
const haetoteuma = (id, t) => {
    pool.query('SELECT * FROM toteumat WHERE id=$1', [id], (err, results) => {
        if (err) throw err;
        console.dir(results.rows);
        t(results.rows);
    })
}
const luototeuma = (uusitoteuma, t) => {
    const { pvm, vuoro_id, tyovuorot, tuotenro, tuotteet, tehtytunnit, tehdytkappaleet, viesti } = uusitoteuma;
    pool.query('INSERT INTO toteumat (pvm, vuoro_id, tyovuorot, tuotenro, tuotteet, tehtytunnit, tehdytkappaleet, viesti ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [pvm, vuoro_id, tyovuorot, tuotenro, tuotteet, tehtytunnit, tehdytkappaleet, viesti ], (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rowCount);
    })
}

const paivitatoteuma = (toteuma, id, t) => {
    const { pvm, vuoro_id, tyovuorot, tuotenro, tuotteet, tehtytunnit, tehdytkappaleet, viesti } = toteuma;
    pool.query('UPDATE toteumat SET pvm=$1, vuoro_id=$2, tyovuorot=$3, tuotenro=$4, tuotteet=$5, tehtytunnit=$6, tehdytkappaleet=$7, viesti=$8, WHERE id=$9', [pvm, vuoro_id, tyovuorot, tuotenro, tuotteet, tehtytunnit, tehdytkappaleet, viesti, id], (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rowCount);
    })
}
const poistatoteuma = (id, t) => {
    pool.query('DELETE FROM toteumat WHERE id=$1', [id], (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rowCount);
    })
}
module.exports = { haetoteumat, haetoteuma, luototeuma, paivitatoteuma, poistatoteuma }