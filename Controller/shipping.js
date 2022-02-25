const knex = require('../Database/db');

get_shippingRegions = (req,res)=>{
    knex('shipping_region').select('*').then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send({message : err})
        console.log(err);
    })
}



shippingRegions_by_Id = (req,res)=>{
    const shipping_region_id = req.params;
    knex('shipping').select('*').where(shipping_region_id).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send({message : err})
        console.log(err);
    })
}


module.exports = {get_shippingRegions, shippingRegions_by_Id};