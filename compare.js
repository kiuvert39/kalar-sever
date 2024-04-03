import { genSaltSync, hashSync, compareSync } from "bcrypt";

// const salt = genSaltSync(10);
// const hash = hashSync("B4c0//", salt);


const encrypt = '$2a$10$OenK2QZhmF5IZFrUoXKh/.APbis32cXSuMZdfnI.igHgWSrJt6wmy'
const com = compareSync("B4c0/", encrypt); 
console.log(com)