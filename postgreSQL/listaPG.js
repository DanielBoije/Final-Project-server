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

const haelista = (l) => {
    pool.query('Select distinct T.id, T.pvm, L.nimi, TV.tyovuoro, TU.tuotenimi from toteumat T join linjat L on T.linja_id=L.id join tyovuorot TV on T.vuoro_id=TV.id join tuotteet TU on T.tuotenro=TU.tuotenro order by T.id desc limit 5;', (err, results) => {
        if (err) throw err;
        console.dir(results);
        l(results.rows);
    })
}


module.exports = {haelista}

//pvä, vuoro, linja, tuote

//select distinct T.id, T.pvm, T.linja_id, L.nimi, T.vuoro_id, TV.tyovuoro, T.tuotenro, TU.tuotenimi, T.tehtytunnit, T.tehdytkappaleet
//from toteumat T
//join linjat L on T.linja_id=L.id
//join tyovuorot TV on T.vuoro_id=TV.id
//join tuotteet TU on T.tuotenro=TU.tuotenro
//order by T.id desc;