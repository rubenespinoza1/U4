const bcrypt = require('bcrypt');
const User = require('../models/User');
const { schemaRegister, schemaLogin } = require('../helpers/joi/schemaValidate');
const jwt = require('jsonwebtoken');


async function register(req, res) {
    // Validamos que los datos cumplen con la estructura del schemaRegister
    const { error } = schemaRegister.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Validamos que el email no se encuentra en nuestra base de datos
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json({ error: 'Email ya registrado' })
    }

    // Encriptamos la contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: password,
    })

    User.create(newUser).then(() => {
        res.status(201).send('Registro exitoso');
    }).catch(error => {
        res.status(400).send({ error });
    })

}

async function login(req, res) {
    // Validamos los datos
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Buscamos el usuario en la base de datos
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    if (!user.isVerified) return res.status(400).json({ error: 'Revisa tu correo electrónico para verificar tu cuenta' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Contraseña incorrecta' });

    // Se crea el token
    const token = jwt.sign({
        id: user._id
    },
		process.env.TOKEN_SECRET,
		{ expiresIn: 60 * 60 * 24 * 30}
		); // Expira en 30 días
    
    res.json({ user: user, token })
}

module.exports = {
    register,
    login
};