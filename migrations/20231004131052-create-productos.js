'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('productos', {
      id_productos: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nom_producto: {
        type: Sequelize.STRING,
      },
      desc_producto: {
        type: Sequelize.STRING,
      },
      precio_producto: {
        type: Sequelize.DECIMAL,
      },
      id_categoria: {
        type: Sequelize.INTEGER,
      },
      imagen: {
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('productos');
  },
};
