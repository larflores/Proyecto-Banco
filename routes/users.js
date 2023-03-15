var express = require('express');
var router = express.Router();
const userModel = require('../models/userModel')


router.get('/:id',async (req, res, next) =>{


  try{

    let id_user=req.params.id

    let result = await userModel.getUser(id_user)
    console.log ("estoy en users")
    console.log(result)

    res.json({status : true , message : result})

    res.end()
  }catch(error){

    console.log(error);
    res.status(500).json({status : false, message : error})
  }


});

module.exports = router;


