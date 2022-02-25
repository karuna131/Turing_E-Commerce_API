const knex = require("../Database/db");

//1
get_products = (req, res) => {
  let limit_q = req.query.limit;
  let page_q = req.query.page;
  let description = req.query.description;

  if (page_q && limit_q) {
    page_q = parseInt(page_q);
    limit_q = parseInt(limit_q);
    page_q = page_q * limit_q - limit_q;
  } 
  else {
    page_q = 0;
    limit_q = 101;
  }
  knex
    .select(
      "product_id",
      "name",
      "description",
      "price",
      "discounted_price",
      "thumbnail"
    )
    .from("product")
    .limit(limit_q)
    .offset(page_q)
    .then((data) => {
      for(var i of data){
        if(description!= undefined){
          // console.log(i.description)
          i.description = i.description.slice(0, parseInt(description))
        }
      }
      res.send({ count: 101, rows: data });
    })
    .catch((err) => {
      res.send(err);
    });
};





//2
getProducts_by_search = (req, res) => {
  let search = req.query.search;
  let limit_q = req.query.limit;
  let page_q = req.query.page;
  let description = req.query.description;

  if (page_q && limit_q) {
    page_q = parseInt(page_q);
    limit_q = parseInt(limit_q);
    page_q = page_q * limit_q - limit_q;
  } else {
    page_q = 0;
    limit_q = 101;
  }
  knex
    .select(
      "product_id",
      "name",
      "description",
      "price",
      "discounted_price",
      "thumbnail"
    )
    .from("product")
    .whereILike("name", `%${search}%`).limit(limit_q).offset(page_q)
    .then((data) => {
      for(var i of data){
        if(description!= undefined){
          i.description = i.description.slice(0, parseInt(description))
        }
      }
      res.send({ count: data.length, rows: data });
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
};




//3
getProducts_by_Id = (req, res) => {
  const product_id = req.params;
  knex("product")
    .select("*")
    .where(product_id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
};






//4
products_of_categories = (req, res) => {
  let page_q = req.query.page;
  let limit_q = req.query.limit;

  if (page_q && limit_q) {
    page_q = parseInt(page_q);
    limit_q = parseInt(limit_q);
    page_q = page_q * limit_q - limit_q;
  } else {
    page_q = 0;
    limit_q = 101;
  }
  knex("product")
    .join(
      "product_category",
      "product_category.product_id",
      "product.product_id"
    )
    .select(
      "product.product_id",
      "product.name",
      "product.description",
      "product.price",
      "product.discounted_price",
      "product.thumbnail"
    )
    .where("product_category.category_id", req.params.category_id)
    .limit(limit_q)
    .offset(page_q)
    .then((data) => {
      res.send({
        count: data.length,
        rows: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};





//6
getDetails_of_Products = (req, res) => {
  const product_id = req.params;
  // console.log(product_id)
  knex("product")
    .select(
      "product_id",
      "name",
      "description",
      "price",
      "discounted_price",
      "image",
      "image_2"
    )
    .where(product_id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
};





//7
get_locations_of_product = (req, res) => {
  knex("product_category")
    .join("category", "product_category.category_id", "category.category_id")
    .join("department", "category.department_id", "department.department_id")
    .select({
      category_id: "category.category_id",
      category_name: "category.name",
      department_id: "department.department_id",
      department_name: "department.name",
    })
    .where("product_category.product_id", req.params.product_id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};





const post_reviews = (req, res)=> {
  if(!product_id || !review || !rating){
    res.send({success : false,
      message : 'All information Is Required'})
      return ""
  }
  const reviews_data = {
    customer_id : res.userToken.customer_id,
    product_id : req.body.product_id,
    review : req.body.review,
    rating : req.body.rating,
    created_on : new Date()
  }
  knex('review').insert(reviews_data)
  .then(() =>{
      knex.select('*').from('review')
      .then((data)=>{
        res.send(data);
      })
  })
  .catch(err =>{
    console.log(err);
    res.send(err);
  })
}





const get_review = (req, res) =>{
  knex('review')
  .join('customer', 'customer.customer_id', 'review.customer_id')
  .select('customer.name', 'review.review', 'review.rating', 'review.created_on')
  .where('review.product_id', req.params.product_id)
  .then((data)=>{
    res.send(data);
  })
  .catch(err =>{
    console.log(err);
    res.send(err);
  })
}




module.exports = {
  get_products,
  getProducts_by_search,
  getProducts_by_Id,
  products_of_categories,
  getDetails_of_Products,
  get_locations_of_product,
  post_reviews,
  get_review
};
