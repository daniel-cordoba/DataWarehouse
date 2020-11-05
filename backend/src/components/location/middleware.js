const sequelize = require('../../conexion');
const jwt = require('jsonwebtoken');

class MiddlewareLocation{
    profile(req, res, next) {
        const payload = jwt.verify(req.headers.authorization.split(' ')[1], process.env.S);
        if(payload.profile === "Administrador"){            
            return next();
        }else{
            console.error('No posee los permisos de administrador');
            res.status(403).json('La petición requeire del rol administrador');
        }
    }        
}

module.exports = MiddlewareLocation;