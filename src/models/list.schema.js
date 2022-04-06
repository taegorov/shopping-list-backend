'use strict';


module.exports = (sequelize, DataTypes) => {

  return sequelize.define('Lists', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
      // defaultValue: 'Misc',
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aisle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    }
  })
}
