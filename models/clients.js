module.exports = function(sequelize, DataTypes) {
  var Clients = sequelize.define("Clients", {
    // Sets up Users table columns with data types
    client_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true  
    },
    client_name: {
      type: DataTypes.STRING, // String = 255 characters
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    project_name: {
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

// Include other associations as other models are built out

  // Users.associate = function(models) {
  //   // Associating Users with Clients
  //   // When a User is deleted, this deletes all of their corresponding Clients
  //   Users.hasMany(models.Clients, {
  //     onDelete: "cascade"
  //   });
  // };
  return Clients;
};