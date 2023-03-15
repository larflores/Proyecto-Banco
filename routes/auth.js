var express = require('express');
var router = express.Router();
const userModel = require('../models/userModel')

const jwt = require('jsonwebtoken');
const fs = require('fs')

router.post('/', async (req,res,next)=>{

    try{

        let nickname = req.body.nickname;
        let password = req.body.password;

        let result = await userModel.getNicknameAndPassword(nickname,password)

        console.log(result)

        if(result.length > 0){

            let payload = {};

            const privateKey = fs.readFileSync('./claves/privada.pem','utf-8');

            let signOptions = {

                expiresIn: '8h',
                algorithm: "RS256"

            }

           

            if(result[0].user_status == 1){

                payload = {id: result[0].id_user, Habilitado : result[0].user_status}

            }else{

                payload = {id: result[0].id_user, Habilitado : result[0].user_status}

            }

            const token = jwt.sign(payload,privateKey,signOptions);

            res.json({status : true, JWT : token})
        }

        else{

            res.json({status: true, message: 'unauthorized', JWT: null})

        }

    }catch(error){
        console.log(error)
        res.status(500).json({status: false})

    }


})


module.exports = router;