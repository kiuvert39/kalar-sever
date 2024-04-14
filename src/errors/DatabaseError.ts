import { CustomeError } from "../utils/CustomError"

export class databaseError extends CustomeError{

    constructor(public message :string,  public statusCode: number){
        super(message, statusCode)
        Object.setPrototypeOf(this, databaseError.prototype)
    }
    serialize(): { message: string } {
        return {message: this.message}
    }
}