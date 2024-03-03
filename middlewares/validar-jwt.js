const jwt = require('jsonwebtoken');

const validarJwt = (req = request, res = response, next) => {
    // Leer el token.....
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'El token es obligatorio'
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid
        next();
    } catch (error) {
        console.log(error);

        res.status(401).json
            ({
                ok: false,
                msg: 'El token es invalido'
            });
    }
}


module.exports = {
    validarJwt
}