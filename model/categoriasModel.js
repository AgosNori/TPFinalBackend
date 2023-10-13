const Sequelize = require("../db/sequelize");
const DataTypes = require("sequelize");
const categoria = Sequelize.define("categorias", {
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_categoria: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});

module.exports = categoria;