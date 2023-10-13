const Sequelize = require("../db/sequelize");
const DataTypes = require("sequelize");
const tipUser = Sequelize.define("tipo-usuario", {
    id_tipoUSer: {
        type: DataTypes.INTEGER,
        primarykey: true,
        autoincrement: true,
    },
    tipo: {
        type: DataTypes.INTEGER,
    },
}, {
    timestap: false
});
module.exports = tipUser;