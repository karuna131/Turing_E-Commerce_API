const knex = require("../Database/db");



get_categories = (req, res) => {
  let orderList = []
  let order_q = req.query.order;
  // console.log(req.query)
  let page_q = req.query.page;
  let limit_q = req.query.limit;
  let description = req.query.description;
  if (order_q){
    let order = order_q.split(',')
    // console.log(order)
    orderList.push({'column' : order[0], 'limit' : order[1]})
  }
  // console.log(order)
  if (page_q && limit_q){
    page_q = parseInt(page_q);
    limit_q = parseInt(limit_q);
    page_q = page_q*limit_q-limit_q;
  }
  else{
    page_q = 0;
    limit_q = 7;
  }
  knex.select('*').from('category').orderBy(orderList).limit(limit_q).offset(page_q)
    .then((data) => {
      for(var i of data){
        if(description!= undefined){
          // console.log(i.description)
          i.description = i.description.slice(0, parseInt(description))
        }
      }
      res.send({
        'count' :  7,                   
        'rows' : data
      });
    })
    .catch((err) => {
      res.send({ message: err });
      console.log(err);
    });
};






get_categories_By_Id = (req, res) => {
  const category_id = req.params;
  knex("category")
    .select("*")
    .where(category_id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({ message: err });
      console.log(err);
    });
};






getCategories_ByProduct_Id =(req,res)=>{
  knex("category")
    .join("product_category", "category.category_id", "product_category.category_id")
    .select("category.category_id", "category.department_id", "category.name")
    .where("product_category.product_id", req.params.product_id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({ message: err });
      console.log(err);
    });
};






getCategories_of_Department = (req,res)=>{
    knex("category")
    .join("department", "category.department_id", "department.department_id")
    .select("category.category_id", "category.name", "category.description", "category.department_id")
    .where("department.department_id", req.params.department_id)
    .then((data)=>{
        res.send(data);
    })
    .catch((err) => {
        res.send({ message: err });
        console.log(err);
    })
}




module.exports = {get_categories,  get_categories_By_Id,  getCategories_ByProduct_Id,  getCategories_of_Department};
