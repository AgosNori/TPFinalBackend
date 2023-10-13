const { body, validationResult } = require('express-validator');
const login = [
    body('email').notEmpty().withMessage("Complete con su nombre de usuario")
        .bail(),
    body('contraseña').notEmpty().withMessage("Ingrese su password"),
    (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.render('login', {
                errors: errors.array(),
            })
        }
        next();
    }
    
]

module.exports = login;