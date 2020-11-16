const sequelize = require('../../conexion');
const jwt = require('jsonwebtoken');

class MiddlewareLocation{
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
/*     profile(req, res, next) {
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
    }    */   
    repeatRegion(req, res, next) {
        const name = req.body.name;
        const repeat = 'SELECT name FROM regions WHERE name = "'+name+'";';
        sequelize.query(repeat).then(resp=>{
            if(resp[0].length>0){
                res.status(409).json('Esta región ya está registrada');
            }else{
                next();
            }
        }).catch(err=>{
            console.error(err);
            res.status(400).json('Error en la sintaxis de la petición');
        });
    }

    repeatCountry(req, res, next) {
        const name = req.body.name;
        const repeat = 'SELECT name FROM countries WHERE name = "'+name+'";';
        sequelize.query(repeat).then(resp=>{
            if(resp[0].length>0){
                res.status(409).json('Este país ya está registrado');
            }else{
                next();
            }
        }).catch(err=>{
            console.error(err);
            res.status(400).json('Error en la sintaxis de la petición');
        });
    }

    repeatCity(req, res, next) {
        const name = req.body.name;
        const repeat = 'SELECT name FROM cities WHERE name = "'+name+'";';
        sequelize.query(repeat).then(resp=>{
            if(resp[0].length>0){
                res.status(409).json('Esta ciudad ya está registrada');
            }else{
                next();
            }
        }).catch(err=>{
            console.error(err);
            res.status(400).json('Error en la sintaxis de la petición');
        });
    }

    existRegion(req, res, next) {
        const ID = req.body.ID;
        const consulta = 'SELECT ID FROM regions WHERE ID='+ID+';';
        sequelize.query(consulta).then(resp=>{
            if (resp[0][0]) {
                return next();
            }else{
                res.status(404).json('El recurso no fue encontrado');
            }
        }).catch(err=>{
            console.error(err);
        });
    }

    existCountry(req, res, next) {
        const ID = req.body.ID;
        const consulta = 'SELECT ID FROM countries WHERE ID='+ID+';';
        sequelize.query(consulta).then(resp=>{
            if (resp[0][0]) {
                return next();
            }else{
                res.status(404).json('El recurso no fue encontrado');
            }
        }).catch(err=>{
            console.error(err);
        });
    }

    existCity(req, res, next) {
        const ID = req.body.ID;
        const consulta = 'SELECT ID FROM cities WHERE ID='+ID+';';
        sequelize.query(consulta).then(resp=>{
            if (resp[0][0]) {
                return next();
            }else{
                res.status(404).json('El recurso no fue encontrado');
            }
        }).catch(err=>{
            console.error(err);
        });
    }
}

module.exports = MiddlewareLocation;