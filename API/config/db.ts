
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('contact', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost',
});

export default sequelize;
