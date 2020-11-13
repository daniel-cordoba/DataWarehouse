const jwt = require('jsonwebtoken');

class MiddlewareCompanies{
    profile(req, res, next) {
        try {
            const payload = jwt.verify(req.headers.authorization.split(' ')[1], process.env.S);
            console.log(payload);
            return next();
        } catch (error) {
            console.error(error);
            res.status(403).json('Esta petición requiere de login');
        }
    }   
    
    exist(req, res, next) {
        const ID = req.body.ID;
        const consulta = 'SELECT ID FROM companies WHERE ID='+ID+';';
        sequelize.query(consulta).then(resp=>{
            if (resp[0][0]) {
                return next();
            }else{
                res.status(404).json('El recurso no fue encontrado');
            }
        }).catch(err=>{
            console.error(err);
        })
    }
}

module.exports = MiddlewareCompanies;