const Sequelize = require("../db/sequelize");
const DataTypes = require("sequelize");
const detallePedido = Sequelize.define("detalle_pedido",{
    id_detalle:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    id_productos:{
        type:DataTypes.INTEGER,
    },
    id_pedido:{
        type:DataTypes.INTEGER,
    },
},{
    timestamps:false
});
module.exports=detallePedido;