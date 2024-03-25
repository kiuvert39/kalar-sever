import { CustomeError } from "../utils/CustomError"

export class NotFoundError extends CustomeError{
    statusCode = 404
    constructor(public message :string){
        super(message)
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
    serialize(): { message: string } {
        return {message: this.message}
    }
}