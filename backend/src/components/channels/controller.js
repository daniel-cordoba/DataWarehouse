const sequelize = require('../../conexion');

class Channels{
    getChannels(req, res){
        const getChannels = 'SELECT ID, contact_id, channel, user, preference FROM channels;';
        sequelize.query(getChannels)
        .then(resp=>{
            console.log(resp[0]);
            res.status(200).json(resp[0]);
        }).catch(err=>{
            console.error(err);
            res.status(400).json('Error en la sintaxis de la petición');
        });
    }

    addChannel(req, res){
        const {contact_id, channel, user, preference} = req.body;
        const addChannel = 'INSERT INTO channels (contact_id, channel, user, preference) VALUES (?, ?, ?, ?);';
        sequelize.query(addChannel, 
            {
                replacements: [contact_id, channel, user, preference],
                type: sequelize.QueryTypes.INSERT
            }).then(resp=>{
                console.log(resp);
                res.status(200).json('Canal de contacto agregado exitosamente');
            }).catch(err=>{
                console.log(err);
                res.status(400).json('Error en la sintaxis de la petición');
            });
    }

    editChannel(req, res){
        const {contact_id, channel, user, preference} = req.body;
        const editChannel = 'UPDATE channels SET user="'+user+'", preference="'+preference+'" WHERE contact_id="'+contact_id+'" AND channel="'+channel+'";';
        sequelize.query(editChannel,{type: sequelize.QueryTypes.UPDATE})
            .then(resp=>{
                console.log(resp);
                res.status(200).json('Canal de contacto editado con éxito');
            }).catch(err=>{
                console.log(err);
                res.status(400).json('Error en la sintaxis de la petición');
            });
    }

    delChannel(req, res){
        const ID = req.params.ID;
        if(isNaN(ID)){
            res.status(400).json('Error en la sintaxis de la petición');
        }else{
            sequelize.query('DELETE FROM channels WHERE ID = '+ID+';')
            .then(resp=>{
                console.log(resp);
                if(resp[0].affectedRows === 0){
                    res.status(404).json('El recurso no fue encontrado'); 
                }else{
                    res.status(200).json('Canal de contacto eliminado con éxito');
                }            
            }).catch(err=>{
                console.error(err);
                res.status(400).json('Error en la sintaxis de la petición');
            });
        }
    }
}

module.exports = Channels;