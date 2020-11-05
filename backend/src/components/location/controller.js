const sequelize = require('../../conexion');

const addRegion = (req, res) => {
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

const addCountry = (req, res) => {
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

const addCity = (req, res) => {
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

module.exports = {
    addRegion,
    addCountry,
    addCity
}