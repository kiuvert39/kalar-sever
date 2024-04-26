import { sequelize } from "../database/dbConnection";
import { DataTypes } from "sequelize";

export  const  categorys = sequelize.define("category",{
    categoryId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    categoryName:{
        type:DataTypes.STRING,
        allowNull: false,
    },
},{
    tableName: 'category',
    timestamps: true,
  
}) 



categorys.sync({ alter: true })
.then(() =>{
    console.log('category model sync to database');
}) 
.catch((err: string)=>{
    console.log('error occured syncing category model')
 })