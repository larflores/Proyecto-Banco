const pool = require ('../db')


async function getNicknameAndPassword (monto_cons){
    try{
        let query = "select a.name from users a inner join movimientos b on a.id_user=b.id_sender where b.monto_movi > monto_cons";
        
        const rows = await pool.query (query,monto_cons)
        return rows;
        
    } catch (error) {
        console.log(error);
    }
}