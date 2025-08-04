const userModel = require("../views/models/userModel");
const projectModel=require("../views/models/projectModel");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const secret="secret";


function getStartupCode(language) {
      const lang = language.toLowerCase();

      if (lang === "python") {
          return `print("Hello World")`;
        }
        else if (lang === "java") {
          return `public class Main {
          public static void main(String[] args) {
          System.out.println("Hello World");
          }
          }`;
        } 
        else if (lang === "javascript") {
          return `console.log("Hello World");`;
        }
        else if (lang === "cpp") {
          return `#include <iostream>
          using namespace std;
          int main() {
          cout << "Hello World" << endl;
          return 0;
          }`;
        } 
        else if (lang === "c") {
          return `#include <stdio.h>
          int main() {
          printf("Hello World\\n");
          return 0;
          }`;
        }
        else if (lang === "go") {
          return `package main
          import "fmt"
          func main() {
          fmt.Println("Hello World")
          }`;
        } 
        else if (lang === "bash") {
          return 'echo "Hello World"';
        } else {
          return "Unsupported language";
        }
    }


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

                let token=jwt.sign({userId: user._id}, secret)

                return res.status(200).json({
                    success: true,
                    msg: "User logged in successfully",
                    token
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

exports.createProj= async(req, res)=>{
  try{
        let {name, projLanguage, token}= req.body;
        let decoded=jwt.verify(token, secret);
        let user= await userModel.findOne({_id: decoded.userId});
        if(!user){
            return res.status(404).json({
                success: false,
                msg: "User not found"
            });
        };
     
    
        let project = await projectModel.create({
            name: name,
            projLanguage: projLanguage,
            createdBy: user._id,
            code : getStartupCode(projLanguage)
        });

        return res.status(200).json({
            success: true,
            msg: "Project created successfully",
            projectId: project._id 
        });


  } catch(error){
    return res.status(500).json({
        success: false,
        msg: error.message
    })
  }
}