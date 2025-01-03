const jwt = require('jsonwebtoken');

exports.required = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.KEY_JWT);
        req.users = decode;
        next();
    } catch (error) {
        return res.status(401).send({ mensagem: 'Falha na autenticação' });
    }

}

exports.optional = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.KEY_JWT);
        req.users = decode;
        next();
    } catch (error) {
        next();
    }

}