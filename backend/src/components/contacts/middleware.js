const sequelize = require('../../conexion');
const jwt = require('jsonwebtoken');

class MiddlewareContacts{
    emailRight(req, res, next) {
        const email = req.body.email;        
        if (/..@../.test(email)) {
            const consulta = 'SELECT email FROM contacts WHERE email = "'+email+'";';
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

    }

    emailRight2(req, res, next) {
        const email = req.body.email;        
        if (/..@../.test(email)) {
           next();
        }else{
            res.status(400).json('Error de sintaxis en el campo email');
        } 
    }

    exist(req, res, next) {
        const ID = req.body.ID;
        const consulta = 'SELECT ID FROM contacts WHERE ID='+ID+';';
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

module.exports = MiddlewareContacts;