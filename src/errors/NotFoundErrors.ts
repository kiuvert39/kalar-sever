import { CustomeError } from "../utils/CustomError"

export class NotFoundError extends CustomeError{
    
    constructor(public message :string,  public statusCode: number){
        super(message, statusCode)
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
    serialize(): { message: string } {
        return {message: this.message}
    }
}