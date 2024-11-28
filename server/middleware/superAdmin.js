const superAdmin =(req,res,next) => {
   try {
     if(req.user){
         if(req.user?.role="SUPER_ADMIN"){
             return next()
         }
         else{
             return res.status(403).json({msg:"you are not allowed to access"})
         }
     }
   } catch (error) {
        res.status(403).json({msg : error.message})
   }
}

module.exports = {superAdmin};