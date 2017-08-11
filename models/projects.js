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
        len: [1, 100]
      }
    },
    client_id: {
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

  Projects.associate = function(models) {
    // Associating Projects with Clients
    Projects.belongsTo(models.Clients, {
      foreignKey: 'client_id',
    });
  };
  return Projects;
};