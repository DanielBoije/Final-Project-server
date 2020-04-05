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
    const { pvm, vuoro_id, tuotenro, tehtytunnit, tehdytkappaleet, viesti, linja_id } = uusitoteuma;
    pool.query('INSERT INTO toteumat (pvm, vuoro_id, tuotenro, tehtytunnit, tehdytkappaleet, viesti, linja_id ) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [pvm, vuoro_id, tuotenro, tehtytunnit, tehdytkappaleet, viesti, linja_id], (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rowCount);
    })
}

const paivitatoteuma = (toteuma, id, t) => {
    const { pvm, vuoro_id, tuotenro, tehtytunnit, tehdytkappaleet, viesti, linja_id  } = toteuma;
    pool.query('UPDATE toteumat SET pvm=$1, vuoro_id=$2, tuotenro=$3, tehtytunnit=$4, tehdytkappaleet=$5, viesti=$6, linja_id=$7 WHERE id=$8', 
    [pvm, vuoro_id, tuotenro, tehtytunnit, tehdytkappaleet, viesti, linja_id, id], (err, results) => {
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