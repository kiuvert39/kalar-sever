import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config()



if (!process.env.DB_STRING) {
    throw new Error('DB_STRING is not defined in the environment variables.');
  }

export const sequelize = new Sequelize(process.env.DB_STRING)


export async function dbConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established and Model synced successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
       
    }
}
