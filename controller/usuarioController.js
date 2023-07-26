const Usuario = require('../model/usuarioModel');
const jwt = require('jsonwebtoken');
require('dotenv/config');

class usuarioController {
    //CREATE
    static async usuarioCreate(req, res) {
        let nome = req.body.nome;
        let email = req.body.email;
        let senha = req.body.senha;

        const usuario = {
            nome: nome,
            email: email,
            senha: senha
        };

        await Usuario.create(usuario);
        res.json({ message: 'Usuário Cadastrado com sucesso!' });
    };

    //READ - LISTAR
    static async usuarioListar(req, res) {
        const id_usuario = req.params.id;

        if (id_usuario) {
            const usuario = await Usuario.findOne({ where: { id_usuario: id_usuario } });
            res.json(usuario);
        } else {
            const usuario = await Usuario.findAll({ raw: true });
            res.json(usuario);
        };
    };

    //UPDATE
    static async usuarioUpdate(req, res) {
        const id_usuario = req.params.id;

        let nome = req.body.nome;
        let email = req.body.email;
        let senha = req.body.senha;

        const usuario = {
            nome: nome,
            email: email,
            senha: senha
        };

        await Usuario.update(usuario, { where: { id_usuario: id_usuario } });
        res.json({ message: 'Usuário atualizado com sucesso!' });
    };

    //DELETE
    static async usuarioDelete(req, res) {
        const id_usuario = req.params.id;
        await Usuario.destroy({ where: { id_usuario: id_usuario } });
        res.json({ message: 'Usuário excluído com sucesso!' });
    };

    //VERIFICAR LOGIN
    static async usuarioVerificaLogin(req, res) {
        let email = req.body.email;
        let senha = req.body.senha;

        const dados = {
            emai: email,
            senha: senha
        };

        const usuario = await Usuario.findOne({ where: { email: email, senha: senha } }).then((usuario) => {
            if (usuario != undefined) {
                const id = usuario.id_usuario;
                const token = jwt.sign({ id }, process.env.SECRET, {
                    expiresIn: 300
                });
                return res.json({ auth: true, token: token });
            } else {
                res.status(402).json({ message: "Erro ao logar no sistema" });
            };
        });

    };

    //VERIFICAR TOKEN
    static async verificaJWT(req, res, next) {
        const token = req.headers['x-acess-token'];
        if (!token) return res.status(401).json({ auth: false, message: 'Nenhum token criado.' });
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) return res.status(500).json({ auth: false, message: 'Falha na autenticação com o token.' });

            //SALVA NO REQUEST PARA USO POSTERIOR
            req.userId = decoded.id;
            next();
        });
    };


}; //final

module.exports = usuarioController;