//error handel middle wear 404 routes...
const notFound = (req,res,next) => {
    const error = new Error(`Not Found ${req.originalUrl}`);
    res.status(404);
    next(error);
};

//error handel middle wear...
const errorHandle = (error,req,res,next)=>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🚧 Your route is in another castle 🏰' : error.stack
    })
};

module.exports ={
notFound,
errorHandle,
}