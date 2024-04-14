import { Sequelize } from 'sequelize';
import { databaseError } from '../errors/DatabaseError';
import dotenv from 'dotenv'
dotenv.config()


export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: "postgres",
    password: "Winner39@",
    database: "postgres",
  })

export async function dbConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established and Model synced successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
       
    }
}
