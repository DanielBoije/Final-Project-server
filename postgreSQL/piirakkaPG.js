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


function haehairioaikaYhteensa(hakuehdot) {
    console.log('2')
    const { linja, alkupvm, loppupvm } = hakuehdot;
    //haetaan kaikki aikavälin häiriötunnit yhteensä
    return pool.query(
        'SELECT SUM(TH.hairiokesto) AS hairiokesto, T.linja_id FROM tot_hai TH JOIN toteumat T ON TH.tot_id=T.id WHERE T.linja_id=$1 AND T.pvm BETWEEN $2 AND $3 GROUP BY T.linja_id',
        [linja, alkupvm, loppupvm]
    ).then(data => {
        console.log('hairioaika yhteensä')
        console.dir(data);
        if(data.rowCount > 0) {
            return data.rows[0].hairiokesto;
        } else {
            return 0;
        }
    }).catch(err => {
        console.error(`Virhe: ${err.message}`);
    });
}

function haetehdyttunnit(hakuehdot) {
    console.log('1')
    const { linja, alkupvm, loppupvm } = hakuehdot;
    //haetaan tehdyt työtunnit yhteensä: linja, alkupvm ja loppupvm
    return pool.query(
        'SELECT sum(tehtytunnit) FROM toteumat WHERE linja_id=$1 AND pvm BETWEEN $2 AND $3',
        [linja, alkupvm, loppupvm]
    ).then(data => {
        if(data.rowCount > 0) {
            return data.rows[0].sum;
        } else {
            return 0;
        }
    }).catch(err => {
        console.error(`Virhe: ${err.message}`);
    });
}

function haeEriHairiot(hakuehdot) {
    console.log('3')
    let erihairiot = [];
    const { linja, alkupvm, loppupvm } = hakuehdot;
    //haetaan eri häiriöt ja niihin mennyt aika: linja, alkupvm, loppupvm
    return pool.query(
        'SELECT TH.hair_id, H.hairio, SUM(TH.hairiokesto) AS hairiokesto, T.linja_id FROM tot_hai TH JOIN toteumat T ON TH.tot_id=T.id JOIN hairiot H ON TH.hair_id=H.id WHERE T.linja_id=$1 AND T.pvm BETWEEN $2 AND $3 GROUP BY TH.hair_id, H.hairio, T.linja_id',
    [linja, alkupvm, loppupvm]
    ).then(data => {
        for(let i = 0; i < data.rows.length; i++) {
            erihairiot.push(data.rows[i]);               
        }
        console.log('hae eri häiriöt')
        console.dir(erihairiot);
        return erihairiot;
    }).catch(err => {
        console.error(`Virhe: ${err.message}`);
    });
}

module.exports = { haetehdyttunnit, haehairioaikaYhteensa, haeEriHairiot }