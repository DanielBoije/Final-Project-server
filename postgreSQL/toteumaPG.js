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

const haetoteumat = (t) => {
    pool.query('SELECT * from toteuma ORDER BY id', (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rows);
    })
}
const haetoteuma = (id, t) => {
    pool.query('SELECT * FROM toteuma WHERE id=$1', [id], (err, results) => {
        if (err) throw err;
        console.dir(results.rows);
        t(results.rows);
    })
}
const luototeuma = (uusitoteuma, t) => {
    const { pvm, tehtytunnit, vuoro_id, tuote, tehtytuntia, tehdytkappaleet,hairio_id, hairiokesto, viesti } = uusitoteuma;
    pool.query('INSERT INTO toteuma (pvm, tehtytunnit, vuoro_id, tuote, tehtytuntia, tehdytkappaleet,hairio_id, hairiokesto, viesti) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    [pvm, tehtytunnit, vuoro_id, tuote, tehtytuntia, tehdytkappaleet,hairio_id, hairiokesto, viesti], (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rowCount);
    })
}

const paivitatoteuma = (toteuma, id, t) => {
    const { pvm, tehtytunnit, vuoro_id, tuote, tehtytuntia, tehdytkappaleet,hairio_id, hairiokesto, viesti } = toteuma;
    pool.query('UPDATE toteuma SET pvm=$1, tehtytunnit=$2, vuoro_id=$3, tuote=$4, tehtytuntia=$5, tehdytkappaleet=$6, hairio_id=$7, hairiokesto=$8, viesti=$9, WHERE id=$10', [pvm, tehtytunnit, vuoro_id, tuote, tehtytuntia, tehdytkappaleet,hairio_id, hairiokesto, viesti, id], (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rowCount);
    })
}
const poistatoteuma = (id, t) => {
    pool.query('DELETE FROM toteuma WHERE id=$1', [id], (err, results) => {
        if (err) throw err;
        console.dir(results);
        t(results.rowCount);
    })
}
module.exports = { haetoteumat, haetoteuma, luototeuma, paivitatoteuma, poistatoteuma }