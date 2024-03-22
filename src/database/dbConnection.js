import Sequelize from "sequelize";
// import { Users } from "../models/user.js"


export const sequelize = new Sequelize("postgres://kliuvert:58S8KOgMkecN5y7XOAx2XQqRK2FVDnff@dpg-cnf2tof79t8c73ce6r90-a.oregon-postgres.render.com/shopdb_ptrw?ssl=true",{})

export async function dbConnection() {
    try {
        await sequelize.authenticate();
        // Users.sync()
        console.log('Connection has been established and Model synced successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
