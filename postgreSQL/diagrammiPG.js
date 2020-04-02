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


function haeDiagrammi(hakuehdot, cb) {
    console.log('haeDaigrammi')
    const { linja, alkupvm, loppupvm } = hakuehdot;
    //haetaan kaikki aikavälin häiriötunnit yhteensä
    return pool.query(
        `SELECT DISTINCT T.vuoro_id, V.tyovuoro, T.tuotenro,
        TRUNC((COALESCE(SUM(T.tehdytkappaleet),1) / COALESCE(SUM(T.tehtytunnit),1) / TU.tuntitavoite * 100), 2) AS hairiotmukanapros,
        TRUNC((COALESCE(SUM(T.tehdytkappaleet), 1) 
        / (COALESCE(SUM( T.tehtytunnit), 1) - COALESCE(SUM(TH.hairiokesto), 0)) 
        / TU.tuntitavoite * 100), 2) AS ilmanhairioitapros
        FROM toteumat T
        JOIN tuotteet TU ON T.tuotenro=TU.tuotenro
        JOIN tyovuorot V ON T.vuoro_id=V.id
        LEFT JOIN tot_hai TH ON T.id=TH.tot_id
        WHERE T.linja_id=$1 AND T.pvm BETWEEN $2 AND $3
        GROUP BY T.vuoro_id, T.tuotenro, TU.tuntitavoite, V.tyovuoro`,
        [linja, alkupvm, loppupvm], (err, results) => {
            if (err) throw err;
            console.dir(results.rows);
            cb(results.rows);
        })
    }


module.exports = { haeDiagrammi }