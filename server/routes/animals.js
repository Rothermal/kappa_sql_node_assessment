/**
 * Created by JFCS on 3/18/16.
 */
var express = require('express');
var pg = require('pg');
var router = express.Router();
var randomNumber = require('../modules/randomNumber');
var connectionString = 'postgres://localhost:5432/prime_zoo';


router.get('/',function (request,response){
    console.log('get animals got GOT');

    pg.connect(connectionString,function(err,client,done){
        if(err){
            done();
            console.log("error connecting to database",err);
            response.status(500).send(err);
        } else{
            var results = [];
            var query = client.query("SELECT * FROM animals");
        }
        query.on('row',function(row){
            console.log(row);
            results.push(row);
        });
        query.on('end',function(){
            done();
            response.send(results);
        });
        query.on('error',function(error){
            console.log('Error returning query', error);
            done();
            response.status(500).send(error);
        });
    });


});

router.post('/',function (request,response){
    console.log('trying to post some animals');
    var name = request.body.name;
    var random = randomNumber(1,100);
    var amount = random;
    console.log(amount);

    pg.connect(connectionString,function(err,client,done){
        if(err){
            done();
            console.log("error connecting to database",err);
            response.status(500).send(err);
        } else{
            var results = [];
            var query = client.query("INSERT INTO animals (name,amount) VALUES ($1,$2) RETURNING id, name, amount ;",[name, amount]);
        }
        query.on('row',function(row){
            console.log(row);
            results.push(row);
        });
        query.on('end',function(){
            done();
            response.send(results);
        });
        query.on('error',function(error){
            console.log('Error returning query', error);
            done();
            response.status(500).send(error);
        });
    });

});

module.exports = router;