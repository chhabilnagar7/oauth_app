import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// f0r signup
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send({ message: "User created" });
  } catch (error) {
    res.status(500).send(error);
  }
};

// for login
export const login = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    const user = await User.findOne({email});
    if(!user || !(await bcrypt.compare(password,user.password))){
        return res.status(400).send({success:false , message: 'Invalid email or passwoerd'});

    }
    const token = jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
    res.status(200).send({success:true,token});
    
  } catch (error) {
    res.status(500).send(error);
  }
};
