const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('genre',{
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        }
    })
};

// [ ] Genero con las siguientes propiedades:
// ID
// Nombre