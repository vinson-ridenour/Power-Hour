module.exports = function(sequelize, DataTypes) {
  var Projects = sequelize.define("Projects", {
    // Sets up Projects table columns with data types
    project_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    project_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    project_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
      }
  });

  // Include other associations as other models are built out

  Projects.associate = function(models) {
    // Associating Projects with Clients
    // When a Project is deleted, deletes all of their corresponding Projects
    Projects.belongsTo(models.Clients, {
      foreignKey: 'client_id',
    });
  };
  return Projects;
};