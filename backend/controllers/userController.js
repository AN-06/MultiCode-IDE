const userModel = require("../views/models/userModel");
var bcrypt = require('bcryptjs');

exports.signUp = async (req, res) => {
    try{

        let {email,pwd,fullName} = req.body;

        let emailCon = await userModel.findOne({email:email});
        if(emailCon){
            return res.status(400).json({
                success: false,
                msg:"Email already exists"
            });
        }
        //to hash password
        bcrypt.genSalt(12, (err, salt) => {
            bcrypt.hash(pwd, salt, async function (err, hash) {
                // Store hash in your password DB 
                let user = await  userModel.create({
                    email:email,
                    password:hash,
                    fullName:fullName

                });

                return res.status(200).json({
                    success: true,
                    msg: "User created successfully",
                    user:user
                });
            });
        });
        
} 
    catch(error){
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }

};

exports.login = async (req, res) =>{
     try{
         let {email, pwd} = req.body;
         let user = await userModel.findOne({email:email});
         if(!user){
            return res.status(404).json({
                success: false,
                msg: "User not found"
            });
         }
         //to check password
         bcrypt.compare(pwd, user.password, function(err, result) {
            if(result){
                return res.status(200).json({
                    success: true,
                    msg: "User logged in successfully"
                });
            }
            else{
                return res.status(401).json({
                        success: false,
                        msg: "Invalid password"
                });
            }
         });
     }
     catch(error){
        return res.status(500).json({
            success: false,
            msg: error.message
        });
     }
};

