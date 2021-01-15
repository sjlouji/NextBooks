module.exports = {
    isActive: (req, res, next) =>{
        console.log(req.user.isActive)
        if(req.user.isActive){
            next()
        }else{
            res.status(401).json({'error':'Unauthorized'})
        }
    }
}