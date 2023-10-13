const Sequelize = require('../db/sequelize');
const { DataTypes } = require('sequelize');

const usuario = Sequelize.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    telefono: {
        type: DataTypes.INTEGER
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userName: {
        type: DataTypes.STRING,
       
    },
    id_direccion: {
        type: DataTypes.INTEGER
    },
    id_tipoUSer: {
        type: DataTypes.INTEGER
    },
    fecha_nac: {
        type: DataTypes.DATE
    },
    isAdmin:{
        type:DataTypes.INTEGER
    }
}, {
    timestamps: false 
});

module.exports = usuario;
