import mongoose from 'mongoose';
import UserDetails from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await UserDetails.findOne({ email });
        if(!existingUser) {
            return res.status(404).json({ message: 'User does not exists' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        delete existingUser.password
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'SecretCode', { expiresIn: "1d" });
        res.setHeader('Authorization', token)
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong'});
    }
}


export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "No records found" });
        }
        const user = await UserDetails.findById(id);
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: 'No user found with that id'});
    }
}


export const createUser = async (req, res) => {
    const { email, password, contactNumber, firstName, lastName, image } = req.body;
    try {
        const existingUser = await UserDetails.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new UserDetails({ firstName, lastName, email, contactNumber, password: hashedPassword, image});
        await newUser.save();
        res.status(200).json({ newUser, token: token });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong'});
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "No records found" });
        }
        const updatedUser = await UserDetails.findByIdAndUpdate(id, { ...user, id }, { new: true });
        res.status(200).json({ message: "Record updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

