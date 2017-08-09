module.exports = function(sequelize, DataTypes) {
  var Clients = sequelize.define("Clients", {
    // Sets up Clients table columns with data types
    client_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true  
    },
    client_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    client_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
      }
  });

  Clients.associate = function(models) {
    // Associating Clients with Projects
    Clients.hasMany(models.Projects, {
      foreignKey: 'project_id'
    });
    // Associating Clients with Users
    Clients.belongsTo(models.Users, {
      foreignKey: 'user_id'
    });
  };
  return Clients;
};