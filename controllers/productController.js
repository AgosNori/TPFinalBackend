/*---------------- IMPORTACIONES NECESARIAS ----------------*/
const bcrypt = require("bcrypt");
const producto = require("../model/productModel");
const usuario = require("../model/userModel");

/*------------------- RENDER PAGINA INICIAL ------------------*/
const renderIndex = (req, res) => {
    res.render("index")
};
/*------------------ RENDER LOGIN --------------------*/
const renderLogin = (req, res) => {
    res.render("login", { errors: [] })
};
/*------------------ RENDER REGISTER ---------------- */
const renderRegister = (req, res) => {
    res.render("register", { errors: [] })
};
/*------------------ RENDER FORM PARA UN NUEVO PRODUCTO -----------------*/
const renderNewProduct = (req, res) => {
    res.render("nuevoProducto", { errors: [] })
};
/*----------------- RENDER PRODUCTOS -----------------------*/
const renderProductos = (req, res) => {
    res.render("productos", { errors: [] })
};
/*----------------------- RENDER PERFIL -------------------*/
const renderPerfil = (req, res) => {
    res.render("perfil")
};

/*-------------------------- CONTROLADORES  USUARIOS -----------------------------*/
/* ---------------- LOGIN -----------------------*/
const loginSesion = async (req, res) => {
    const { email, contraseña } = req.body;
    try {
        const user = await usuario.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send("Usuario no encontrado :(");
        }
        const passwordMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (passwordMatch) {
            console.log("Contraseña correcta :)");
            /*req.session.usuario = user;*/
            res.render("Perfil", { usuario: user });
        } else {
            console.log("Contraseña incorrecta :(");
            res.status(401).send("Contraseña Incorrecta :(");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al autenticar el usuario")
    }
};
/*----------------- CREAR USUARIO ----------------------*/
const createUser = async (req, res) => {
    const { nombre, email, contraseña, username, fecha_nac, telefono } = req.body;

    try {
        const saltsRounds = 10;
        const hashedPassword = await bcrypt.hash(contraseña, saltsRounds);

        // Asegúrate de que las propiedades del objeto coincidan con el modelo de Sequelize
        const newUser = await usuario.create({
            nombre,
            email,
            contraseña: hashedPassword,
            username, // Asegúrate de que sea 'username' en lugar de 'userName'
            fecha_nac,
            telefono
        });

        console.log("Usuario creado con éxito :)");
        res.status(200).json(newUser);
    } catch (e) {
        console.error(e);
        res.status(500).send("Error al crear el usuario :(");
    }
};


/* ---------------- OBTENER USUARIOS -----------------------*/
const getUsers = async (req, res) => {
    try {
        const users = await usuario.findAll();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al obtener los usuarios");
    }
};

/*------------------ ACTUALIZAR USUARIOS ----------------------*/
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, contraseña, userName, fecha_nac, telefono } = req.body;
    try {
        const user = await usuario.findByPk(id);
        if (!user) {
            return res.status(404).sened("Usuario no encontrado :(");
        }
        await user.update({
            nombre, email, contraseña, userName, fecha_nac, telefono
        });
        res.status(200).send("Usuario actualizado con Exito :)");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al actualizar el usuario :(");
    }
};

/* ----------------- OBTENER UN USUARIO POR ID -------------------*/
const getUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = await usuario.findByPk(id);
        res.status(200).json(userId);
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: "ususario No encontrado" })
    }
};

/*----------------- ELIMINAR UN USUARIO POR ID -------------------*/
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await usuario.findByPk(id);
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }
        await user.destroy();
        res.status(200).send("Usuario eliminado con Exito");
    } catch (e) {
        console.log(e);
        res.status(500).send("Error al eliminar usuario ")
    }
};

/* controllers de los productos */
/*
const addProducts = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        console.log(req.body);
        const newProduct = await producto.create({
            name,
            description,
            price,
        });
        console.log("Producto creado con exito :)");
        const products = await renderProductos.findAll();
        res.render("productos", { products });

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Error al crear el producto"});
    }
};*/

/*---------------- CONTROLADORES PRODUCTOS ------------------------*/
/*--------------------- AGREGAR PRODUCTOS ----------------------------*/
const addProducts = async (req, res) => {
    try {
        const { nom_producto, desc_producto, precio_producto, imagen, rating ,id_categoria} = req.body;
        console.log(req.body);

        // Crear un nuevo producto
        const newProduct = await producto.create({
            nom_producto,
            desc_producto,
            precio_producto,
            imagen,
            rating,
            id_categoria
        });

        console.log("Producto creado con éxito :)");

        // Obtener la lista de productos actualizada después de crear el nuevo producto
        const products = await producto.findAll();

        // Renderizar la vista "productos" y pasar la lista de productos
        res.render("productos", { products });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Error al crear el producto" });
    }
};

/*----------------- OBTENER PRODUCTOS ----------------*/
const getProducts = async (req, res) => {
    try {
        const products = await producto.findAll();
        res.json(products);
        //res.render("productos", { products });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Error al obtener los productos" });
    }
};

/*------------------------ ACTUALIZAR PRODUCTOS ----------------*/
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom_producto, desc_producto, precio_producto, imagen, rating ,id_categoria} = req.body;
        const product = await producto.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" })
        }
        product.nom_producto = nom_producto;
        product.desc_producto = desc_producto;
        product.precio_producto = precio_producto;
        product.imagen = imagen;
        product.rating = rating;
        product.id_categoria = id_categoria;
        await product.save();
        res.status(200).send("Actualizado con exito")
        //res.status(200).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error al actualizar el producto" })
    }
};

/*------------------- ELIMINAR PROODUCTOS ----------------*/
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await producto.findByPk(id);
        if (!product) {
            return res.status(400).json({ error: "Producto no encontrado" });
        }
        await product.destroy({
            where: { id_productos: id }
        });
        res.status(200).json({ message: "Producto eliminado" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error al eliminar el producto" })
    }
};

/*--------------- OBTENER PRODUCTO POR ID -----------------*/
const getProductoId = async (req, res) => {
    try {
        const { id } = req.params;

        const productId = await producto.findByPk(id);
        res.status(200).json(productId);
    } catch (err) {
        console.error(err);
        res.status(404).json({ err: "Producto no encontrado" })
    }
};
/*------------------- EXPORTACIONES ---------------------*/
module.exports = { addProducts, getProducts, updateProduct, deleteProduct, renderIndex, renderLogin, renderNewProduct, renderRegister, renderProductos, renderPerfil, loginSesion, createUser, getUsers, updateUser, getUserId, deleteUser, getProductoId }