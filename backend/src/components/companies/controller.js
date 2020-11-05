const sequelize = require('../../conexion');

class Companies{
    addCompany(req, res){
        const {name, address, email, phone, city, city_id} = req.body;
        const addCompany = 'INSERT INTO companies (name, address, email, phone, city, city_id) VALUES (?, ?, ?, ?, ?, ?);';
        sequelize.query(addCompany, 
            {
                replacements: [name, address, email, phone, city, city_id],
                type: sequelize.QueryTypes.INSERT
            }).then(resp=>{
                console.log(resp);
                res.status(200).json('Compañia agregada exitosamente');
            }).catch(err=>{
                console.log(err);
                res.status(400).json('Error en la sintaxis de la petición');
            });
    }

    editCompany(req, res){
        const {ID, name, address, email, phone, city, city_id} = req.body;
        const editCompany = 'UPDATE companies SET name="'+name+'", address="'+address+'", email="'+email+'", phone="'+phone+'", city="'+city+'", city_id='+city_id+' WHERE ID='+ID+';';
        sequelize.query(editCompany,{type: sequelize.QueryTypes.UPDATE})
            .then(resp=>{
                console.log(resp);
                res.status(200).json('Compañía editada con éxito');
            }).catch(err=>{
                console.log(err);
                res.status(400).json('Error en la sintaxis de la petición');
            });
    }

    delCompany(req, res){
        const ID = req.params.ID;
        if(isNaN(ID)){
            res.status(400).json('Error en la sintaxis de la petición');
        }else{
            sequelize.query('DELETE FROM companies WHERE ID = '+ID+';')
            .then(resp=>{
                console.log(resp);
                if(resp[0].affectedRows === 0){
                    res.status(404).json('El recurso no fue encontrado'); 
                }else{
                    res.status(200).json('Compañía eliminada con éxito');
                }            
            }).catch(err=>{
                console.error(err);
                res.status(400).json('Error en la sintaxis de la petición');
            });
        }
    }
}

module.exports = Companies;