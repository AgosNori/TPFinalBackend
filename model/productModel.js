const Sequelize = require("../db/sequelize");
const DataTypes = require("sequelize");
const producto = Sequelize.define("productos", {
    id_productos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_producto: {
        type: DataTypes.STRING,
    },
    desc_producto: {
        type: DataTypes.STRING,
    },
    precio_producto: {
        type: DataTypes.INTEGER
    },
    id_categoria: {
        type: DataTypes.STRING
    },
    imagen:{
        type:DataTypes.STRING
    },
    rating:{
        type:DataTypes.INTEGER
    }
}, {
    timestamps: false
});
module.exports = producto;