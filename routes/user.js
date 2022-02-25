const express = require('express');
const route= express.Router();
const middle = require('../Middle/verification')
const {get_departments, get_department_By_Id} = require('../Controller/departments');
const {get_categories, get_categories_By_Id, getCategories_ByProduct_Id, getCategories_of_Department}= require('../Controller/categories');
const {get_attribute, getAttribute_By_Id, getValues_from_attribute, getAttribute_by_ProductId} = require('../Controller/attributes');
const {get_products,  getProducts_by_search,  getProducts_by_Id,  products_of_categories, getDetails_of_Products, get_locations_of_product, post_reviews, get_review} = require('../Controller/products');
const {customer_Registration, customer_Login, get_customers, update_customers, update_customers_address, update_customers_creditcard} = require('../Controller/customers');
const {uniqueID, addProduct_in_cart, getShoppingCart_data,  Update_shoppingCart, delete_shoppingCart,  totalAmount,  shoppingCart_Delete} = require('../Controller/shoppingcart');
const {get_tax, get_By_taxId} = require('../Controller/tax')
const {get_shippingRegions, shippingRegions_by_Id} = require('../Controller/shipping');
const { post_orders, get_orders,  get_OrdersShortDetails, get_orderInfo } = require('../Controller/orders');

//department
route.get('/departments', get_departments);
route.get('/departments/:department_id', get_department_By_Id)


//category
route.get('/categories', get_categories)
route.get('/categories/:id', get_categories_By_Id)
route.get('/categories/inProduct/:product_id', getCategories_ByProduct_Id)
route.get('/categories/inDepartment/:department_id', getCategories_of_Department)


//attribute
route.get('/attributes', get_attribute);
route.get('/attributes/:attribute_id', getAttribute_By_Id)
route.get('/attributes/values/:attribute_id', getValues_from_attribute)
route.get('/attributes/inProduct/:product_id', getAttribute_by_ProductId)


//Products
route.get('/products', get_products);
route.get('/products/search', getProducts_by_search)
route.get('/products/:product_id', getProducts_by_Id);
route.get('/products/inCategory/:category_id', products_of_categories);
route.get('/products/:product_id/details', getDetails_of_Products);
route.get('/products/:product_id/locations', get_locations_of_product);
route.post('/products/review', middle, post_reviews)
route.get('/products/:product_id/review', get_review)


//customer
route.post('/customers', customer_Registration);
route.post('/customers/login',  customer_Login);
route.get('/customers/:customer_id', middle, get_customers);
route.put('/customers/:customer_id',middle, update_customers)
route.put('/customers/address/:customer_id', middle,  update_customers_address)
route.put('/customers/creditcard/:customer_id', middle,  update_customers_creditcard)


route.post("/orders",middle, post_orders);
route.get('/orders/inCustomer', get_orders);
route.get('/orders/shortDetails/:order_id', get_OrdersShortDetails);
route.get('/orders/:order_id', get_orderInfo)


//shoppingcart
route.get('/shoppingcart/generateUniqueId', uniqueID) 
route.post('/shoppingcart/add', addProduct_in_cart);
route.get('/shoppingcart/:cart_id', getShoppingCart_data)
route.put('/shoppingcart/update/:item_id',  Update_shoppingCart)
route.delete('/shoppingcart/empty/:cart_id', delete_shoppingCart)
route.get('/shoppingcart/totalAmount/:cart_id', totalAmount)
route.delete('/shoppingcart/removeProduct/:item_id', shoppingCart_Delete)


//tax
route.get('/tax', get_tax);
route.get('/tax/:tax_id', get_By_taxId);

//shipping
route.get('/shipping/regions', get_shippingRegions);
route.get('/shipping/regions/:shipping_region_id', shippingRegions_by_Id)

module.exports = route;