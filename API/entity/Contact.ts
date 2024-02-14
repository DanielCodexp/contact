
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Contact extends Model {
  public name!: string;
  public email!: string;
  public phone!: string;
  public subject!: string;
  public message!: string;
}

Contact.init(
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'contact',
  }
);

export default Contact;
