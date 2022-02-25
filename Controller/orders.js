const knex = require('../Database/db');

const post_orders = (req, res)=>{
    knex('shopping_cart')
    .join('product', 'product.product_id', 'shopping_cart.product_id')
    .select('*').where('cart_id', req.body.cart_id)
    .then(data => {
        const order_data = {
            total_amount : data[0].quantity * data[0].price,
            created_on : new Date(),
            customer_id : res.userToken.customer_id,
            shipping_id : req.body.shipping_id,
            tax_id : req.body.tax_id 
        }
        knex("orders").insert(order_data)
            .then(Data => {
                knex("shopping_cart").where("cart_id", req.body.cart_id).del()
                    .then(() => {
                        res.send({"order Id": Data[0]})
                    })
                    .catch(() => {
                        res.send({"message": "Data Is Not Deleted"});
                })
            })
    })
    .catch((err) => {
        res.send({"message": "Cart Id Is Not Vailed"});
        console.log(err);
    })
}




const get_orderInfo = (req, res) =>{
    knex('orders')
    .where('orders.order_id', req.params.order_id)
    .then(() =>{
        knex('shopping_cart')
            .join('product', 'product.product_id', 'shopping_cart.product_id')
            .select('*')
            .then((data) =>{
                for(var i of data){
                    const unit_cost = data[0].quantity * data[0].price;
                    const subtotal = data[0].quantity * data[0].price;
                        i['unit_cost'] = unit_cost 
                        i['subtotal'] = subtotal
                    }
                    res.send({
                        'product_id' : data[0].product_id,
                        'attributes' : data[0].attributes,
                        'product_name' : data[0].name,
                        'quantity' : data[0].quantity,
                        'unit_cost' : i['unit_cost'],
                        'subtotal' : i['subtotal']
                    })
            })
        .catch((err) =>{
            console.log(err);
            res.send(err);
        })
    })
}





const get_orders = (req, res) =>{
    knex('orders')
    .join('customer', 'customer.customer_id', 'orders.customer_id')
    .select('orders.order_id', 'orders.total_amount', 'orders.created_on', 'orders.shipped_on', 'orders.status', 'customer.name')
    .then((data) =>{
        res.send(data);
    })
    .catch(err =>{
        console.log(err);
        res.send(err);
    })
}




const get_OrdersShortDetails = (req, res) =>{
    knex('orders')
    .join('customer', 'customer.customer_id', 'orders.customer_id')
    .select('orders.order_id', 'orders.total_amount', 'orders.created_on', 'orders.shipped_on', 'orders.status', 'customer.name')
    .where('orders.order_id', req.params.order_id)
    .then((data) =>{
        res.send(data);
    })
    .catch(err =>{
        console.log(err);
        res.send(err);
    })
}



module.exports = {post_orders,  get_orders,   get_OrdersShortDetails,  get_orderInfo};