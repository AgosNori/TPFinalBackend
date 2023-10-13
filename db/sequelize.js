const Sequelize = require("sequelize");
const sequelize = new Sequelize("ecommercefinal", "root", "Capitan2019#", {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate()
    .then(() => {
        console.log("La conexion ha sido exitosa");
    })
    .catch((error) => {
        console.log("Ha ocurrido un error " + error)
    })

module.exports = sequelize;