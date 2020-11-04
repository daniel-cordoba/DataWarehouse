const sequelize = require('../../conexion');

function dataRight(req, res, next) {
    const email = req.body.email;
    const consulta = 'SELECT email FROM users WHERE email = "'+email+'";';
sequelize.query(consulta, {type: sequelize.QueryTypes.SELECT})
.then(resp=>{
    if (resp.length>0) {
        console.log('existe');
        res.status(409).json('Este email ya está en uso');
    }else{
        console.log('todo bien');
        next();
    }
   
}).catch(err=>console.error(err));
}

module.exports = dataRight;