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


function haeDiagrammi(hakuehdot, cb) {
    console.log('haeDaigrammi')
    const { linja, alkupvm, loppupvm } = hakuehdot;
    //toteuma / tunnit / tavoite * 100 = toteuman suhde tavoitteeseen nähden
    return pool.query(
        `SELECT DISTINCT T.vuoro_id, V.tyovuoro, T.tuotenro,
        TRUNC((COALESCE(SUM(T.tehdytkappaleet),1) / COALESCE(SUM(T.tehtytunnit),1) / TU.tuntitavoite * 100), 2) AS hairiotmukanapros,
        TRUNC((COALESCE(SUM(T.tehdytkappaleet), 1) 
        / CASE WHEN(COALESCE(SUM( T.tehtytunnit), 1) - COALESCE(SUM(TH.hairiokesto), 0)) = 0
               THEN 1 
               ELSE (COALESCE(SUM( T.tehtytunnit), 1) - COALESCE(SUM(TH.hairiokesto), 0)) 
               END
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