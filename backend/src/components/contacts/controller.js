const sequelize = require('../../conexion');

class Contacts{
    getContact = (req, res) => {
        const getContact = 'SELECT ID, name, last_name, charge, email, company, region, country, interest FROM contacts;';
          return sequelize.query(getContact, {type: sequelize.QueryTypes.SELECT})
            .then(resp => {
                console.log(resp);
                res.status(200).json(resp);
            }).catch(err=>{
                console.error(err);
                res.status(400).json('Error en la sintaxis de la petición');
            });
    }

    addContact = (req, res) => {
        const {name, last_name, charge, email, company, region, country, city, interest} = req.body;
        const addContact = 'INSERT INTO `contacts` (`name`, `last_name`, `charge`, `email`, `company`, `region`, `country`, `city`, `interest`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';
          return sequelize.query(addContact, 
            {
                replacements: [name, last_name, charge, email, company, region, country, city, interest],
                type: sequelize.QueryTypes.INSERT  
            }).then(resp => {
                console.log(resp);
                res.status(200).json('Contacto creado con éxito');
            }).catch(err=>{
                console.error(err);
                res.status(400).json('Error en la sintaxis de la petición');
            });
    }

    editContact = (req, res) => {
        const {ID, name, last_name, charge, email, company, region, country, city, interest} = req.body;
        const addContact = 'UPDATE contacts SET name="'+name+'", last_name="'+last_name+'", charge="'+charge+'", email="'+email+'", company="'+company+'", region="'+region+'", country="'+country+'", city="'+city+'", interest="'+interest+'" WHERE ID='+ID+';';
          return sequelize.query(addContact, {type: sequelize.QueryTypes.INSERT})
            .then(resp => {
                console.log(resp);
                res.status(200).json('Contacto editado con éxito');
            }).catch(err=>{
                console.error(err);
                res.status(400).json('Error en la sintaxis de la petición');
            });
    }

    delContact = (req, res) => {
        const ID = req.params.ID;
        if(isNaN(ID)){
            res.status(400).json('Error en la sintaxis de la petición');
        }else{
            sequelize.query('DELETE FROM contacts WHERE ID = '+ID+';')
            .then(resp=>{
                console.log(resp);
                if(resp[0].affectedRows === 0){
                    res.status(404).json('El recurso no fue encontrado'); 
                }else{
                    res.status(200).json('Contacto eliminado con éxito');
                }            
            }).catch(err=>{
                console.error(err);
                res.status(400).json('Error en la sintaxis de la petición');
            });
        }
    }
}



module.exports = Contacts;