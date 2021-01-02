module.exports = {
    isActive: (req, res, next) =>{
        if(req.user.isActive){
            next()
        }else{
            res.status(401).json({'error':'Unauthorized'})
        }
    }
}