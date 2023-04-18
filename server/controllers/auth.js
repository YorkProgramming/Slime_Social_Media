import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/* Register User */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

/* Login User */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });                                 //Using mongoose to find user by email 
        if (!user) return res.status(400).json({ message: "User does not exist" });         //If user does not exist

        const isMatch = await bcrypt.compare(password, user.password);                    //Uses same salt to compare password
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });      //If password does not match

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);                  //Creates token
        delete user.password;                                                             //Deletes password from user object
        res.status(200).json({ user, token });                                        //Sends user and token to client
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};