var express = require('express');
var router = express.Router();

const userModel= require ('../models/userModel');

router.get('/',async (req, res, next) =>{


  try{

    let nickname = req.body.nickname;
    let password = req.body.password;

    let result = await userModel.getNicknameAndPassword(nickname,password)

    console.log(result)

    res.json({status : true , message : result})

    res.end()
  }catch(error){

    console.log(error);
    res.status(500).json({status : false, message : error})
  }


});

module.exports = router;