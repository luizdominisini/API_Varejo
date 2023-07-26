const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');
const produtoController = require('../controller/produtoController');

router.get('/', (req, res) => {
    return res.json({ message: 'Bem-vindo ao nosso sistema de varejo' })
});

//POST - CADASTRAR
router.post('/usuarios/Cadastrar', usuarioController.usuarioCreate);

//GET - LISTAR
router.get('/usuarios/:id?', usuarioController.verificaJWT, usuarioController.usuarioListar);

//PUT - UPDATE
router.put('/usuarios/:id', usuarioController.usuarioUpdate);

//DELETE
router.delete('/usuarios/:id', usuarioController.usuarioDelete);

//LOGIN JWT
router.post('/login', usuarioController.usuarioVerificaLogin);

///////////////////////REQUISIÇÕES PRODUTO
//CREATE
router.post('/add_produtos', produtoController.produtoCreate);

//LISTAR
router.get('/produtos/:id?', produtoController.produtoListar);


module.exports = router;