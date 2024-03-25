import bcrypt from 'bcrypt'

const saltRounds: number = 12

export async function hashedPw(password:string): Promise<string>{
    try{
        return new Promise( (resolve, reject) =>{
            const hashed = bcrypt.hash( password, saltRounds)
            if(!hashed){
                return reject(hashed)
            }
            resolve(hashed)
        })
    }
    catch(error)
    {
        throw new Error('Error hashing password')
    }
    
}

export async function comparePassWord(password: string, hashedPassword : string): Promise<boolean> {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        throw new Error('Error comparing passwords')
    }
}