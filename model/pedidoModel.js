const Sequelize = require("../db/sequelize");
const DataTypes = require("sequelize");
const pedido = Sequelize.define("pedidos", {
    id_pedido: {
        type: DataTypes.INTEGER,
        primarykey: true,
        autoincrement: true,
    },
    nombre: {
        type: DataTypes.STRING
    },
    fecha: {
        type: DataTypes.DATE
    },
    id: {
        type: DataTypes.INTEGER
    },
}, {
    timestap: false,
});
module.exports = pedido;