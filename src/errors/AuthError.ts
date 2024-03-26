import { CustomeError } from "../utils/CustomError"

export class AuthErrors extends CustomeError{
    statusCode = 400
    constructor(public message :string){
        super(message)
        Object.setPrototypeOf(this, AuthErrors.prototype)
    }
    serialize(): { message: string } {
        return {message: this.message}
    }
}