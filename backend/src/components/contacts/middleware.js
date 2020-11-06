const sequelize = require('../../conexion');

class MiddlewareContacts{
    dataRight(req, res, next) {
        const email = req.body.email;
        const profile = req.body.profile;
        const consulta = 'SELECT email FROM users WHERE email = "'+email+'";';
        if (profile == 'Administrador' || profile == 'Contactos') {
            if (/..@../.test(email)) {
                sequelize.query(consulta, {type: sequelize.QueryTypes.SELECT})
                .then(resp=>{
                    if (resp.length>0) {
                        console.log('existe');
                        res.status(409).json('Este email ya está en uso');
                    }else{
                        next();
                    }   
                }).catch(err=>console.error(err));
            }else{
                res.status(400).json('Error de sintaxis en el campo email');
            } 
        }else{
            res.status(400).json('Error de sintaxis en el campo perfil');
        }
    }
        
}

module.exports = MiddlewareContacts;