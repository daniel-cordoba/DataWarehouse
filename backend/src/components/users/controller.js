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
                res.status(200).json('Login realizado con éxito, su token es: ' + token);
            }else{
                res.status(400).json('Usuario o contraseña incorrectos')
            }
        })
}

module.exports = {
    signIn,
    logIn
}