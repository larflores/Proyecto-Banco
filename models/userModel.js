const pool = require('../db')


async function getNicknameAndPassword (nickname, password){
    try{
        let query = "select id_user, nickname, user_status, password from users where nickname = ? and password = ?";
        
        const rows = await pool.query (query,[nickname,password])
        return rows;
        
    } catch (error) {
        console.log(error);
    }
}


async function getUser (id_user){
    try{
        let query = "select a.name, a.lastname, a.saldo, b.type, b.exp_date from users a inner join tarjetas b on a.id_user=b.id_user where a.id_user=?";
       
        const rows = await pool.query (query, id_user)
        return rows;
        
    } catch (error) {
        console.log(error);
    }
}



module.exports = {getNicknameAndPassword, getUser}