const Sequelize = require("../db/sequelize");
const DataTypes = require("sequelize");
const direc = Sequelize.define("direccion", {
    id_direccion: {
        type: DataTypes.INTEGER,
        primarykey: true,
        autoincrement: true,
    },
    calle: {
        type: DataTypes.STRING,
    },
    altura: {
        type: DataTypes.INTEGER,
    },
    barrio: {
        type: DataTypes.STRING,
    },
}, {
    timestaps: false
});
module.exports = direc