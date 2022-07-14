const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
  
    // disable logging; default: console.log
  logging: false,
  

  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }

});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.delivery = require("../models/delivery.model")(sequelize, Sequelize);
db.user = require("../models/user.model")(sequelize, Sequelize);
db.role = require("../models/role.model")(sequelize, Sequelize);
db.seller = require("../models/seller.model")(sequelize, Sequelize);
db.player = require("../models/player.model")(sequelize, Sequelize);
db.club = require("../models/club.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.seller.belongsTo(db.user);
//db.driver.belongsTo(db.driverRegistration);

db.ROLES = ["Admin", "Seller", "Manager", "Super"];

// db.sequelize.query('CREATE TRIGGER addSeller AFTER INSERT ON users' +
//   ' FOR EACH ROW' +
//   ' BEGIN' +
//   '   insert into sellers (userId, firstName, surname, email, createdAt, updatedAt) ' +
//   '   values ' +
//   '   (new.id, new.name, new.surname, new.email, now(), now());' +
//   ' END;'); 

// db.sequelize.query(""+
//   "CREATE TRIGGER updateDriverStatus "+
//   "AFTER UPDATE ON drivers FOR EACH ROW "+
//   "BEGIN "+
// 	"  IF new.termsAndConditionsStatus != old.termsAndConditionsStatus THEN "+
// 	"	  insert into `driver-registrations` "+
// 	"		  (userId, registrationStep, registrationStepStatus, processedDate, createdAt, updatedAt) "+
// 	"	  values "+
// 	"		  (new.userId, 'Terms And Conditions', new.termsAndConditionsStatus, new.termsAndConditionsDate, now() ,now()); "+
//   "  END IF; "+
//   "  IF new.criminalCheckStatus != old.criminalCheckStatus THEN "+
// 	"	  insert into `driver-registrations` "+
// 	"		  (userId, registrationStep, registrationStepStatus, processedDate, createdAt, updatedAt) "+
// 	"	  values "+
// 	"		  (new.userId, 'Criminal Check', new.criminalCheckStatus, new.criminalCheckDate, now() ,now()); "+
//   "  END IF; "+
//   "END;");

// //add roles
// db.sequelize.query("INSERT INTO `roles` (`id`,`name`,`createdAt`,`updatedAt`) VALUES (1,'Admin', now(), now());");
// db.sequelize.query("INSERT INTO `roles` (`id`,`name`,`createdAt`,`updatedAt`) VALUES (2,'Seller', now(), now());");
// db.sequelize.query("INSERT INTO `roles` (`id`,`name`,`createdAt`,`updatedAt`) VALUES (3,'Manager', now(), now());");
// db.sequelize.query("INSERT INTO `roles` (`id`,`name`,`createdAt`,`updatedAt`) VALUES (4,'Super', now(), now());");

module.exports = db; 