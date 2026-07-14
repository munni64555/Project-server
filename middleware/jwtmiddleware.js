import jwt, { decode } from "jsonwebtoken";

function verifyToken(){
    const verifyToken = (req, res, next) =>{
        try{
            const token = req.cookies.token;
            if(!token){
                return res.status(402).json({
                    message: "Token missing"
                })
            }
            const decode = jwt.verify(token, "muskan");
            req.user = decode;
            next();
        }
        catch (err){
                    return res.status(401).json({
                        message:"Invalid Token"
         })

        }
    }

}
export default verifyToken