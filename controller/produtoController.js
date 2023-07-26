const Produto = require('../model/produtoModel');

class produtoController {
    //CREATE
    static async produtoCreate(req, res) {
        let nome = req.body.nome;
        let descricao = req.body.descricao;
        let preco = req.body.preco;
        let link = req.body.link;

        const produto = {
            nome: nome,
            descricao: descricao,
            preco: preco,
            link: link
        };
        await Produto.create(produto);
        res.json(produto);
    };

    //LISTAR
    static async produtoListar(req, res) {
        const id_produto = req.params.id;
        if (id_produto) {
            const produto = await Produto.findOne({ where: { id_produto: id_produto } });
            res.json(produto);
        } else {
            const produto = await Produto.findAll({ raw: true });
            res.json(produto);
        }
    }

    //UPDATE
    static async produtoUpdate(req, res) {
        const id_produto = req.params.id

        let nome = req.body.nome;
        let descricao = req.body.descricao;
        let preco = req.body.preco;
        let link = req.body.link;

        const produto = {
            nome: nome,
            descricao: descricao,
            preco: preco,
            link: link
        };

        await Produto.update(produto, { where: { id_produto: id_produto } });
        res.json({ message: 'Produto atualizado com sucesso!' });
    };

    //DELETE
    static async produtoDelete(req, res) {
        const id_produto = req.params.id;
        await Produto.destroy({ where: { id_produto: id_produto } });

        res.json({ message: 'Produto excluído com sucesso!' });
    }
}; //final

module.exports = produtoController;