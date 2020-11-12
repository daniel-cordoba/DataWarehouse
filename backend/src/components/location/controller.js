const sequelize = require('../../conexion');
class Locations{
    getRegion = (req, res) => {
        const getRegion = 'SELECT ID, name FROM regions;';
        return sequelize.query(getRegion)
        .then(resp => {
            console.log(resp[0]);
            res.status(200).json(resp[0]);
        }).catch(err=>{
            console.error(err);
            res.status(400).json('Error en la sintaxis de la petición');
        });
    }

    getCountry = (req, res) => {
        const getCountry = 'SELECT ID, region_id, name FROM countries;';
        return sequelize.query(getCountry)
        .then(resp => {
            console.log(resp[0]);
            res.status(200).json(resp[0]);
        }).catch(err=>{
            console.error(err);
            res.status(400).json('Error en la sintaxis de la petición');
        });
    }

    getCity = (req, res) => {
        const getCity = 'SELECT ID, country_id, name FROM cities;';
        return sequelize.query(getCity)
        .then(resp => {
            console.log(resp[0]);
            res.status(200).json(resp[0]);
        }).catch(err=>{
            console.error(err);
            res.status(400).json('Error en la sintaxis de la petición');
        });
    }

    addRegion = (req, res) => {
        const name = req.body.name;
        const addRegion = 'INSERT INTO `regions` (`name`) VALUES ("'+name+'");';
        return sequelize.query(addRegion, {type: sequelize.QueryTypes.INSERT}).then(resp => {
            console.log(resp);
            res.status(200).json('Región agregada con éxito');
        }).catch(err=>{
            console.error(err);
            res.status(400).json('Error en la sintaxis de la petición');
        });
    }

    addCountry = (req, res) => {
        const {region_id, name} = req.body;
        const addCountry = 'INSERT INTO `countries` (`region_id`, `name`) VALUES (?, ?);';
        return sequelize.query(addCountry, 
            {
                replacements: [region_id, name],
                type: sequelize.QueryTypes.INSERT
            }).then(resp => {
                console.log(resp);
                res.status(200).json('País agregado con éxito');
            }).catch(err=>{
                console.error(err);
                res.status(400).json('Error en la sintaxis de la petición');
            });
    }

    addCity = (req, res) => {
        const {country_id, name} = req.body;
        const addCity = 'INSERT INTO `cities` (`country_id`, `name`) VALUES (?, ?);';
        return sequelize.query(addCity, 
            {
                replacements: [country_id, name],
                type: sequelize.QueryTypes.INSERT
            }).then(resp => {
                console.log(resp);
                res.status(200).json('Ciudad agregada con éxito');
            }).catch(err=>{
                console.error(err);
                res.status(400).json('Error en la sintaxis de la petición');
            });
    }

    putRegion = (req, res) => {
        const {ID, name} = req.body;
        const putRegion = 'UPDATE regions SET name = "'+name+'" WHERE ID = '+ID+';';
        return sequelize.query(putRegion, {type: sequelize.QueryTypes.UPDATE})
        .then(resp => {
                console.log(resp);
                res.status(200).json('Región editada con éxito');
            }).catch(err=>{
                console.error(err);
                res.status(400).json('Error en la sintaxis de la petición');
            });
    }

    putCountry = (req, res) => {
        const {ID, name} = req.body;
        const putCountry = 'UPDATE countries SET name = "'+name+'" WHERE ID = '+ID+';';
        return sequelize.query(putCountry, {type: sequelize.QueryTypes.UPDATE})
        .then(resp => {
                console.log(resp);
                res.status(200).json('País editado con éxito');
            }).catch(err=>{
                console.error(err);
                res.status(400).json('Error en la sintaxis de la petición');
            });
    }

    putCity = (req, res) => {
        const {ID, name} = req.body;
        const putCity = 'UPDATE cities SET name = "'+name+'" WHERE ID = '+ID+';';
        return sequelize.query(putCity, {type: sequelize.QueryTypes.UPDATE})
        .then(resp => {
                console.log(resp);
                res.status(200).json('Ciudad editada con éxito');
            }).catch(err=>{
                console.error(err);
                res.status(400).json('Error en la sintaxis de la petición');
            });
    }

    delRegion = (req, res) => {
        const ID = req.params.ID;
        if(isNaN(ID)){
            res.status(400).json('Error en la sintaxis de la petición');
        }else{
            sequelize.query('DELETE FROM regions WHERE ID = '+ID+';')
            .then(resp=>{
                console.log(resp);
                if(resp[0].affectedRows === 0){
                    res.status(404).json('El recurso no fue encontrado'); 
                }else{
                    res.status(200).json('Región eliminada con éxito');
                }            
            }).catch(err=>{
                console.error(err);
                res.status(400).json('Error en la sintaxis de la petición');
            });
        }
    }

    delCountry = (req, res) => {
        const ID = req.params.ID;
        if(isNaN(ID)){
            res.status(400).json('Error en la sintaxis de la petición');
        }else{
            sequelize.query('DELETE FROM countries WHERE ID = '+ID+';')
            .then(resp=>{
                console.log(resp);
                if(resp[0].affectedRows === 0){
                    res.status(404).json('El recurso no fue encontrado'); 
                }else{
                    res.status(200).json('País eliminado con éxito');
                }            
            }).catch(err=>{
                console.error(err);
                res.status(400).json('Error en la sintaxis de la petición');
            });
        }
    }

    delCity = (req, res) => {
        const ID = req.params.ID;
        if(isNaN(ID)){
            res.status(400).json('Error en la sintaxis de la petición');
        }else{
            sequelize.query('DELETE FROM cities WHERE ID = '+ID+';')
            .then(resp=>{
                console.log(resp);
                if(resp[0].affectedRows === 0){
                    res.status(404).json('El recurso no fue encontrado'); 
                }else{
                    res.status(200).json('Ciudad eliminada con éxito');
                }            
            }).catch(err=>{
                console.error(err);
                res.status(400).json('Error en la sintaxis de la petición');
            });
        }
    }
}

module.exports = Locations;
