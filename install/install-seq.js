const Sequelize = require('sequelize');
const config = require('../config').get('databaseConfig');



// const seq = new Sequelize(config.database, config.login, config.password);

const seq = new Sequelize(config.database);


const User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

sequelize.sync()
  .then(() => User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  }))
  .then(jane => {
    console.log(jane.get({
      plain: true
    }));
  });
