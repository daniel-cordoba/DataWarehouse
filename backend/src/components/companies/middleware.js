const jwt = require('jsonwebtoken');

class MiddlewareCompanies{
    profile(req, res, next) {
        try {
            const payload = jwt.verify(req.headers.authorization.split(' ')[1], process.env.S);
            console.log(payload);
            if(payload.profile === "Administrador" || payload.profile === "Contactos"){
                return next();
            }else{
                res.status(403).json('Esta petición requiere de login');
            }
        } catch (error) {
            console.error(error);
            res.status(403).json('Esta petición requiere de login');
        }
    }  
}

module.exports = MiddlewareCompanies;