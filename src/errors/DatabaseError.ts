import { CustomeError } from "../utils/CustomError"

export class databaseError extends CustomeError{
    statusCode = 500
    constructor(public message :string){
        super(message)
        Object.setPrototypeOf(this, databaseError.prototype)
    }
    serialize(): { message: string } {
        return {message: this.message}
    }
}