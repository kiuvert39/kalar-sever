import { CustomeError } from "../utils/CustomError"

export class AuthErrors extends CustomeError{
    
    constructor(public message :string, public statusCode: number){
        super(message, statusCode)
        Object.setPrototypeOf(this, AuthErrors.prototype)
    }
    serialize(): { message: string } {
        return {message: this.message,}
    }
}