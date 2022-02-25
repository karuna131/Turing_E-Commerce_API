const knex = require('../Database/db');
const generateUniqueId = require('generate-unique-id');
const { LONG } = require('mysql/lib/protocol/constants/types');

//generateUniqueId
const uniqueID = (req, res) =>{
    const id = generateUniqueId({
            length: 15,
            useLetters: true
    });
    res.send({'cart_id' : id})
}
    


 
// post 
const addProduct_in_cart = (req, res)=>{

    const products = {
        cart_id : req.body.cart_id,
        product_id : req.body.product_id,
        attributes : req.body.attributes,
        quantity : 1,
        added_on : new Date()
    }
    knex('shopping_cart').insert(products)
    .then((id)=>{
        // console.log(d);
        knex('shopping_cart')
        .join('product', 'product.product_id', 'shopping_cart.product_id')
        .select('shopping_cart.item_id',  'product.name',  'shopping_cart.attributes', 'shopping_cart.product_id', 'product.price', 
                'shopping_cart.quantity', 'product.image')
        .where("shopping_cart.item_id",id)
        .then(data =>{
            for(var i of data){
                // console.log(data)
                const subtotal = data[0].quantity * data[0].price;
                i['subtotal'] = subtotal;
            }
            res.send(data);
        })
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    })
}




// get
const getShoppingCart_data = (req, res) =>{
    knex('shopping_cart')
        .join('product', 'product.product_id', 'shopping_cart.product_id')
        .select('shopping_cart.item_id',  'product.name',  'shopping_cart.attributes', 'shopping_cart.product_id', 'product.price', 
                'shopping_cart.quantity', 'product.image')
        .where('shopping_cart.cart_id',  req.params.cart_id)
        .then((data)=>{
            for(var i of data){
                const subtotal = data[0].quantity * data[0].price;
                i['subtotal'] = subtotal;
            }
            res.send(data);
        })
        .catch((err)=>{
            console.log(err);
            res.send(err);
        })
};



//put
const Update_shoppingCart = (req, res) =>{
    const quantity = req.body;

    knex('shopping_cart').update(quantity).where('shopping_cart.item_id', req.params.item_id)
    .then(id =>{
        console.log(id)
        if(!id){
            res.send("Id Doesn't Exists");
        }
        knex('shopping_cart')
        .join('product', 'product.product_id', 'shopping_cart.product_id')
        .select('shopping_cart.item_id',  'product.name',  'shopping_cart.attributes', 'shopping_cart.product_id', 'product.price', 
                'shopping_cart.quantity', 'product.image')
        .where("shopping_cart.item_id", req.params.item_id)
        .then(data =>{
            for(var i of data){
                const subtotal = data[0].quantity * data[0].price;
                i['subtotal'] = subtotal;
            }
            res.send(data);
        })
    })
    .catch((err)=>{
        res.send(err);
    })
}




// delete
const delete_shoppingCart = (req, res) =>{

    knex('shopping_cart').where("cart_id", req.params.cart_id).del()
    .then((id) =>{
        if(!id){
            res.send({message : "CART ID DOSEN'T EXISTS"})
        }

        knex.select('*').from('shopping_cart').where("shopping_cart.item_id", id)
        .then((data)=>{
            res.send({success : 'Row Data Deleted Successfully',
            'Empty Data' : data})
        })
        
    })
    .catch((err) =>{
        res.send(err);
        console.log(err)
    })
}




// total Amount
const totalAmount = (req, res)=>{
    knex('shopping_cart')
        .join('product', 'product.product_id', 'shopping_cart.product_id')
        .select('product.price', 'shopping_cart.quantity')
        .where('shopping_cart.cart_id',  req.params.cart_id)
        .then((data)=>{
            const dic ={}
            for(var i of data){
                const total_amount = data[0].quantity * data[0].price;
                i[total_amount] = total_amount;
                dic['total_amount'] = i[total_amount]
            }
            res.send(dic)
        })
        .catch((err)=>{
            res.send(err);
            console.log(err);
        })
}






// delete
const shoppingCart_Delete = (req, res) =>{

    knex('shopping_cart').where("item_id", req.params.item_id).del()
    .then((id) =>{
        if(!id){
            res.send({message : "itam3 ID DOSEN'T EXISTS"})
        }
        knex.select('*').from('shopping_cart').where("shopping_cart.item_id", id)
        .then((data)=>{
            res.send({success : 'Row Data Deleted Successfully',
            'Data' : 'No data'})
        })  
    })
    .catch((err) =>{
        res.send(err);
        console.log(err)
    })
}






module.exports = {
    uniqueID,   
    addProduct_in_cart,  
    getShoppingCart_data,   
    Update_shoppingCart,  
    delete_shoppingCart,  
    totalAmount,   
    shoppingCart_Delete
} ;