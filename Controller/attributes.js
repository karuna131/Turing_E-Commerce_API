const knex = require('../Database/db');

get_attribute = (req,res)=>{
    knex('attribute').select('*').then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send({message : err})
        console.log(err);
    })
}



getAttribute_By_Id = (req,res) =>{
    const attribute_id = req.params;
    knex('attribute').select('*').where(attribute_id).then((data)=>{                   
        res.send(data)                          
        res.send({message : err})
        console.log(err);
    })
};




getValues_from_attribute = (req,res)=> {
    knex('attribute')
    .join("attribute_value", 'attribute.attribute_id', 'attribute_value.attribute_id')
    .select("attribute_value.attribute_value_id", "attribute_value.value")
    .where('attribute.attribute_id', req.params.attribute_id)
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.send(err);
    })
}






getAttribute_by_ProductId = (req,res)=> {
    knex('attribute')
    .join("attribute_value", 'attribute.attribute_id', 'attribute_value.attribute_id')
    .join("product_attribute", "product_attribute.attribute_value_id", "attribute_value.attribute_value_id")
    .select("attribute.name", "attribute_value.attribute_value_id",  "attribute_value.value")
    .where('product_id', req.params.product_id)
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.send(err);
        console.log(err);
    })
}




module.exports = {get_attribute, getAttribute_By_Id,  getValues_from_attribute, getAttribute_by_ProductId};