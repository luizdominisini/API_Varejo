const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './varejo.sqlite'
});

try {
    sequelize.authenticate();
} catch (erro) {
    console.log('ERRO AO AUTENTICAR DB');
};

module.exports = sequelize;