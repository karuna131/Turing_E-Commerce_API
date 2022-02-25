const knex = require('../Database/db');

get_tax = (req,res)=>{
    knex('tax').select('*').then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send({message : err})
        console.log(err);
    })
}





get_By_taxId = (req,res) =>{
    const tax_id = req.params;
    knex('tax').select('*').where(tax_id).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send({message : err})
        console.log(err);
    })
};



module.exports = {get_tax, get_By_taxId};