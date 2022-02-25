const knex = require('../Database/db');

get_departments = (req,res)=>{
    knex('department').select('*').then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send({message : err})
        console.log(err);
    })
}



get_department_By_Id = (req,res) =>{
    const department_id = req.params;
    knex('department').select('*').where(department_id).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send({message : err})
        console.log(err);
    })
};


module.exports = {get_departments, get_department_By_Id};