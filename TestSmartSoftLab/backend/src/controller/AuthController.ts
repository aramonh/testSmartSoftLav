import {getRepository, Like} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import bytcryp from "bcrypt-nodejs";
import { exit } from "process";


const jwt = require("jsonwebtoken");
//CONFIG KEY
const config = require("./../config/config");
const  llave  = config.llave; 
export class AuthController {

    private userRepository = getRepository(User);

  

    async login(request: Request, response: Response, next: NextFunction) {

        var  user = {
             username : request.body.username,
             password: request.body.password,
         }
 
         var userDB = await this.userRepository.find({where:{username: Like(user.username)}});
         if(!userDB[0]){
             return {message:"Error no existe usuario"}
         }else{
            if (bytcryp.compareSync(user.password, userDB[0].password)) {
				//LOGIN
				const payload={
			//		_id: userDB._id
				}
			//	const token = createToken(payload);

				const response ={
			
				//	token:token
                }
                console.log("LOGIN OK");
                return userDB[0];
			
			} else {
				//ERROR
                return {message:"Password Erronea"}
			}
         }
        
     }

    async save(request: Request, response: Response, next: NextFunction) {

       var  user = {
            username : request.body.username,
            password: bytcryp.hashSync(request.body.password),
            firstName : request.body.firstName,

        }

        var exist = await this.userRepository.find({where:{username: Like(user.username)}});
        if(exist){
            return {message:"Error ya existe"}
        }else{
            
            console.log("Res reg", exist)
            const payload={
              //  _id: result.ops[0]._id
            }
           // const token = createToken(payload);
            return this.userRepository.save(request.body);
        }
       
    }

    async logout(request: Request, response: Response, next: NextFunction) {
        const token = request.body.token;

		jwt.destroy(token)
		request.session.destroy();
		console.log("Destroy Token");
    }

     createToken(payload) {
        var token = jwt.sign({ payload }, llave, {
            expiresIn: 1440,
        });
        return token;
    }

}