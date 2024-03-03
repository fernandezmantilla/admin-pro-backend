const jwt = require('jsonwebtoken');



const jwtGen = ( uid ) =>{

    return new Promise( (resolve, reject )=>{
        const payload = {
            uid
        }
        jwt.sign( payload, process.env.JWT_SECRET, {
           expiresIn: '6h' 
        }, (err, token)=>{
            if(err){
                console.log(err);
                reject (err);
                res.status(500).json
                    ({
                        ok: false,
                        msg: 'Error inseperado.... revisar log'
                    });
        
            } else {
                resolve(token);
            }
        } )
    });


}
module.exports = {
    jwtGen

}