export abstract class CustomeError extends Error{
    statusCode:any;
   
    constructor(public message : string, statusCode : number){
        super(message,);
        this.statusCode
        
    }
    abstract serialize(): {message: string,}
}