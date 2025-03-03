import User from "../models/user.model.js";

export const login = async(req,res)=>{
    try{
      const{name,password} = req.body;
      const user = await User.create({name:name,password:password});
      res.status(200).json({
         data : user,
         message : "User created successfully"
      });

    }
    catch(error){
        res.status(500).json({message:error.message})
    }

}
