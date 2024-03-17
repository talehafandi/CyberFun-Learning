import config from "../config.js";

export default (error, _req, res, _next) => {   
    console.log("error: ", error);
    if(!error.prod && config.env == 'prod'){
        error.message = 'Something went wrong'
        error.status = 500
    }

    return res.status(400).json({ success: false, message: error.message });
}
