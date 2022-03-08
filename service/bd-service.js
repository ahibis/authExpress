const {Sequelize} = require('sequelize');
const {datebase,dialect,host,logging,password,storage,name} = process.env;
let sequelize;
if(dialect=="sqlite"){
    sequelize=new Sequelize({
        dialect,
        storage,
        logging
    });
}else{
    sequelize=new Sequelize(datebase, name, password, {
        host,
        dialect,
        logging
    });
}
module.exports = sequelize;