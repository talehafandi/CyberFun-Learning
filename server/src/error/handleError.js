import { ApiError } from "./ApiError.js"

export default (error, _req, res, _next) => {   
    if(!error.prod){
        error.message = 'Something went wrong'
        error.status = 500
    }
    console.log("error: ", error);

    return res.status(400).json({ success: false, message: error.message });
}
