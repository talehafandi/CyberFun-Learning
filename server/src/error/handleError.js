import { ApiError } from "./ApiError.js"

export default (error, _req, res, _next) => {   
    console.log("error: ", error);
    if(!error.prod){
        error.message = 'Something went wrong'
        error.status = 500
    }

    return res.status(400).json({ success: false, message: error.message });
}
