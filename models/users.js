module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    // Sets up Users table columns with data types
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING, // String = 255 characters
      allowNull: false,
      validate: {
        is: /^[a-zA-Z ' -]*$/i, // only allow letters and space, -, '
        len: [1, 40]
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z ' -]*$/i, // only allow letters and space, -, '
        len: [1, 40]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 50]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 30]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 2]
      }
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [10]
      }
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // checks for email format
        len: [1]
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 20]
      }
    },
    user_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
      }
  });

//code to test
function alwaysTrue(){
  tester = 2
  confirm = "works!"
  if(tester = 2){
return confirm
  };
};
//test over

  // Users.associate = function(models) {
  //   // Associating Users with Clients
  //   // When a User is deleted, this deletes all their corresponding Clients
  //   Users.hasMany(models.Clients, {
  //     onDelete: "cascade"
  //   });
  // };
  return Users;
};