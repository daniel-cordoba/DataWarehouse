const sequelize = require('../../conexion');

const signIn = (req, res) => {
    const {name, last_name, email, profile, password} = req.body;
    
    const addUser = 'INSERT INTO `users` (`name`, `last_name`, `email`, `profile`, `password`) VALUES (?, ?, ?, ?, ?);';
      return sequelize.query(addUser, 
        {
            replacements: [name, last_name, email, profile, password],
            type: sequelize.QueryTypes.INSERT  
        }).then(resp => {
            console.log(resp);
            res.status(200).json(resp);
        });
}

const logIn = async(req, res) => {
    const user = req.body.user;
    const pass = req.body.password;

}

module.exports = {
    signIn,
    logIn
}