module.exports = function(sequelize, DataTypes) {
  var TimeEntries = sequelize.define("TimeEntries", {
    // Sets up Time Entries table columns with data types
    time_entry_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    project_name: {
      type: DataTypes.STRING,
      allowNull: false,
      foreignKey: true,
      validate: {
        len: [1, 100]
      }
    },
    date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
      validate: {
        isDate: true
      }
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    total_hours: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    pay_rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    total_pay: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    time_entry_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
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

    TimeEntries.belongsTo(models.Users, {
      foreignKey: 'uuid'
    });
    TimeEntries.belongsTo(models.Clients, {
      foreignKey: 'client_id'
    });
    TimeEntries.belongsTo(models.Projects, {
      foreignKey: 'project_id',
      foreignKey: 'project_name'
    });
  };
  return TimeEntries;
};