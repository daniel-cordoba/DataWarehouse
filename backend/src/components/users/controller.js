const sequelize = require('../../conexion');
const jwt = require('jsonwebtoken');

const signIn = (req, res) => {
    const {name, last_name, email, profile, password} = req.body;
    const addUser = 'INSERT INTO `users` (`name`, `last_name`, `email`, `profile`, `password`) VALUES (?, ?, ?, ?, ?);';
      return sequelize.query(addUser, 
        {
            replacements: [name, last_name, email, profile, password],
            type: sequelize.QueryTypes.INSERT  
        }).then(resp => {
            console.log(resp);
            res.status(200).json('Usuario creado con éxito');
        }).catch(err=>{
            console.error(err);
            res.status(400).json('Error en la sintaxis de la petición');
        });
}

const logIn = (req, res) => {
    const {email, password} = req.body;
    const login = 'SELECT email, password, profile FROM users WHERE email = ? AND password = ?;';
    sequelize.query(login, 
        {
            replacements: [email, password],
            type: sequelize.QueryTypes.SELECT
        }).then(resp=>{
            if (resp.length>0) {
                const payload = {
                    user: resp[0].email,
                    profile: resp[0].profile
                };
                const token = jwt.sign(payload, process.env.S);
                const ingreso = [token, resp[0].profile];
                res.status(200).json(ingreso);
            }else{
                res.status(400).json('Usuario o contraseña incorrectos')
            }
        })
}

const getUsers = (req, res) => {
    const getUsers = 'SELECT ID, name, last_name, email, profile, password FROM users;';
    sequelize.query(getUsers, 
        {
            type: sequelize.QueryTypes.SELECT
        }).then(resp=>{
            console.log(resp);
            res.status(200).json(resp);
        }).catch(err=>{
            console.error(err);
            res.status(400).json('Error en la sintaxis de la petición');
        });
}

const putUser = (req, res) => {
    const {ID, name, last_name, email, profile, password} = req.body;
    const putUser = `UPDATE users SET name = "${name}", last_name = "${last_name}", email = "${email}", profile = "${profile}", password = "${password}" WHERE ID = ${ID};`;
    return sequelize.query(putUser, {type: sequelize.QueryTypes.UPDATE})
    .then(resp => {
            console.log(resp);
            res.status(200).json('Usuario editado con éxito');
        }).catch(err=>{
            console.error(err);
            res.status(400).json('Error en la sintaxis de la petición');
        });
}

const delUser = (req, res) => {
    const ID = req.params.ID;
    if(isNaN(ID)){
        res.status(400).json('Error en la sintaxis de la petición');
    }else{
        sequelize.query('DELETE FROM users WHERE ID = '+ID+';')
        .then(resp=>{
            console.log(resp);
            if(resp[0].affectedRows === 0){
                res.status(404).json('El usuario no fue encontrado'); 
            }else{
                res.status(200).json('Usuario eliminada con éxito');
            }            
        }).catch(err=>{
            console.error(err);
            res.status(400).json('Error en la sintaxis de la petición');
        });
    }
}

module.exports = {
    signIn,
    logIn,
    getUsers,
    putUser,
    delUser
}