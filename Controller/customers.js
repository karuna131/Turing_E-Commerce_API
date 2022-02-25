const knex = require('../Database/db');
const jwt = require('jsonwebtoken');

customer_Registration = (req, res)=> {
    if(!req.body.name || !req.body.email || !req.body.password){
        res.send({success : false,
        message : 'All information Is Required'})
        return ""
    }
    const customers = {
        name :req.body.name,
        email :req.body.email,
        password : req.body.password
    }
    knex('customer').insert(customers)
    .then((count)=>{
        res.send({'count': count,
            'data' : customers})
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    })
}




customer_Login = (req, res) =>{
    if(!req.body.email || !req.body.password){
        res.send({success : false,
            message : 'All information Is Required'})
            return ""
    }
    knex.select('*').from('customer').where('email', '=', req.body.email, 'password', '=', req.body.password)
    .then((data) => {
        const token =  jwt.sign({customer_id : data[0].customer_id}, "KarunaJaiswal")
        res.cookie('user', token)
        res.json({'customers' : data,
        'token' : token,
      })
        console.log({message:data});
      })
      .catch((err) => { console.log({message:err});
      res.send({message:err});
    })
}
    



get_customers = (req, res) =>{
    const customer_id = req.params;
    knex.select('*').from('customer').where(customer_id)
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send(err);
        console.log(err);
    })
}




update_customers = (req, res) =>{
    if(!req.body.name || !req.body.email || !req.body.password || !req.body.day_phone || !req.body.eve_phone || !req.body.mob_phone){
        res.send({
            success : false,
            message : "All Informations Required"
        })
        return ""
    }
    const customer_id = req.params;
    const {name, email, password, day_phone, eve_phone, mob_phone} = req.body;

    knex('customer').update({name, email, password, day_phone, eve_phone, mob_phone}).where(customer_id)
    .then(data=>{
        if (!data){
            res.send({success : 'Id Is Not Exists'});
          }
        knex.select('*').from('customer').where(customer_id)
            .then((Data) =>{
            res.json({success:true, message: Data});
            })
    })
    .catch( err => 
        res.status(500).send(err)); 
}






update_customers_address = (req, res) =>{
    if(!req.body.address_1 || !req.body.address_2 || !req.body.city || !req.body.region || !req.body.postal_code || !req.body.country || !req.body.shipping_region_id){
        res.send({
            success : false,
            message : "All Informations Required"
        })
        return ""
    }
    const customer_id = req.params;
    const {address_1 , address_2, city, region, postal_code , country, shipping_region_id} = req.body;

    knex('customer').update({address_1 , address_2,  city,  region, postal_code , country, shipping_region_id})
    .where(customer_id)
    .then((data)=>{
        if (!data){
            res.send({success : 'Id Is Not Exists'});
          }
        knex.select('*').from('customer').where(customer_id)
        .then((Data) =>{
        res.json({success:true, message: Data});
        })
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    })
}






update_customers_creditcard = (req, res) =>{
    const customer_id = req.params;
    const {credit_card} = req.body;

    knex('customer').update({credit_card})
    .where(customer_id)
    .then((data)=>{
        if (!data){
            res.send({success : 'Id Is Not Exists'});
          }
          res.json({success:true, message: `${data} Data Is Updated`});
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    })
}




module.exports = {
    customer_Registration, 
    customer_Login, 
    get_customers,  
    update_customers, 
    update_customers_address,  
    update_customers_creditcard};