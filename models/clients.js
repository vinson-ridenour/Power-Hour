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
    client_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
      }
  });

  Clients.associate = function(models) {
    // Associating Clients with Projects
    Clients.hasMany(models.Projects, {
      foreignKey: 'project_id',
    });
  };
  return Clients;
};