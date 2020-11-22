const sequelize = require('../../conexion');
const jwt = require('jsonwebtoken');

class MiddlewareUsers{
    dataRight(req, res, next) {
        const email = req.body.email;
        const profile = req.body.profile;
        const consulta = 'SELECT email FROM users WHERE email = "'+email+'";';
        if (profile == 'Administrador' || profile == 'Contactos') {
            if (/..@../.test(email)) {
                sequelize.query(consulta, {type: sequelize.QueryTypes.SELECT})
                .then(resp=>{
                    if (resp.length>0) {
                        res.status(400).json('Este email ya está en uso');
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
    profile(req, res, next) {
        try {
            const payload = jwt.verify(req.headers.authorization.split(' ')[1], process.env.S);
            if(payload.profile === "Administrador"){            
                return next();
            }else{
                console.error('No posee los permisos de administrador');
                res.status(403).json('La petición requiere del perfil Administrador');
            } 
        } catch (error) {
            console.error(error);
            res.status(403).json('Esta petición requiere de login');
        }
    }
}

module.exports = MiddlewareUsers;