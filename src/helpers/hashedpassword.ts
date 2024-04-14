import bcrypt from 'bcryptjs'


export async function hashedPw(password:string){
    try{
         const hashed = bcrypt.hash( password, 12)
         return hashed
    }
    catch(error)
    {
        throw new Error('Error hashing password');
    }
    
}

export async function comparePassWord(password: string, hashedPassword : string): Promise<boolean> {
    try {
        const match = bcrypt.compare(password, hashedPassword,)
        return match;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return false; 
    }
}