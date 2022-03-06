import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contactNumber: { type: Number, required: true },
    email: { type: String, required: true },
    image: { type: String },
    password: { type: String, required: true },
});

const UserDetails =  mongoose.model('UserModel', userSchema);

export default UserDetails;