const Thing = require('../module/module.thing');
const keys = require('../../config/key');
const md5 = require('md5');






//creat a new thing
exports.creat = function(req, res){

    if(!req.body.thingid&&!req.body.thingname){
        res.status(500).send({message:'ThingId&Thingname can not be empty'});
    }
    var d = new Date();
    var n = d.toISOString();
    var newThingId = req.body.thingid + n + 'thing';
    var thingIdEncrypt = md5(newThingId);
    var newThingKey = thingIdEncrypt + keys.secret.secretkey;
    var thingkeyEncrypt = md5(newThingKey);
    var thing = new Thing({
        thingname: req.body.thingname,
        thingid: thingIdEncrypt,
        thingkey: thingkeyEncrypt,
    });
    console.log(thing);
    thing.save(function(err, thing){
        if(err){
            res.status(500).send({message: 'some error'})
        }else {
            res.status(200).send(thing);
        }
    });
};

exports.findAll = function(req ,res){
    Thing.find(function(err, thing){
        if(err){
            res.status(500).send({message:'some error'});
        }else {

            res.status(200).send(thing);
        }
    });
}

exports.findOne = function(req, res){
    Thing.findById(req.params.thingId,function(err, thing){
        if(err){
            res.status(500).send({message:'some error'})
        }else {
            res.status(200).send(thing);
        }
    })
}

exports.update = function(req, res){
    Thing.findById(req.params.thingId, function(err ,thing){
        if(err){
            res.status(500).send({message:'some error'});
        }else {
            console.log(req.body.thingid);
            thing.thingid = req.body.thingid;
            thing.thingkey = req.body.thingkey ||thing.thingkey;
            console.log(thing);
            thing.save(function(err, thing){
                res.status(200).send(thing);
            })
        }
    })
}
    
exports.delete = function(req, res){
    Thing.remove({_id:req.params.thingId}, function(err, thing){
        if(err){
            res.status(500).send({message:"can not remove"})
        }else {
            res.status(200).send({message: 'success remove'});
        }
    });
}