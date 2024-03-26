export abstract class CustomeError extends Error{
   abstract statusCode: number;
    constructor(public message : string){
        super(message);
        
    }
    abstract serialize(): {message: string}
}