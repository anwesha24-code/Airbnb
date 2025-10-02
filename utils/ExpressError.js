class ExpressError extends Error{
    constructor(statusCode, message){
        super();
        this.statusCode=statusCode;
        this.message=message;
    }
}
module.exports=ExpressError;
//created for custom error to set status as well as message