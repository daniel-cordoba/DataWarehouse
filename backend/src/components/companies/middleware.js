const sequelize = require('../../conexion');
const jwt = require('jsonwebtoken');

class MiddlewareCompanies{
    profile(req, res, next) {
        try {
            const payload = jwt.verify(req.headers.authorization.split(' ')[1], process.env.S);
            console.log(payload);
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

module.exports = MiddlewareCompanies;