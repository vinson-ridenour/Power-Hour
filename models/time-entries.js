module.exports = function(sequelize, DataTypes) {
  var TimeEntries = sequelize.define("TimeEntries", {
    // Sets up Time Entries table columns with data types
    time_entry_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   foreignKey: true
    // },
    // client_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // //   foreignKey: true
    // },
    // project_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // //   foreignKey: true
    // },
    start_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        len: [3, 4]
      }
    },
    end_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        len: [3, 4]
      }
    },
    total_hours: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT, // String = 255 characters
      allowNull: true
    },
    time_entry_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    // underscored: true,
}, {
    validate: {
    bothTimesOrNone() {
      if ((this.start_time === null) !== (this.end_time === null)) {
        throw new Error('Requires either both start time and end time or neither');
      }
    }
  }
  });

  TimeEntries.associate = function(models) {
    // Associating Users with Clients
    // When a User is deleted, this deletes all their corresponding Clients
    TimeEntries.belongsTo(models.Users, {
      onDelete: "cascade"
    });
    TimeEntries.belongsTo(models.Projects, {
      onDelete: "cascade"
    });
    TimeEntries.belongsTo(models.Clients, {
      onDelete: "cascade"
    });
  };
  return TimeEntries;
};