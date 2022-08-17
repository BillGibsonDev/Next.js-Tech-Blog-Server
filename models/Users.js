
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        allowNull: false,
        unique: true,
    },
    email: {
        type: String,
        allowNull: false,
        unique: true,
    },
    password: {
        type: String,
        allowNull: false,
    },
    role: {
        type: String,
    },
    joinDate: {
        type: String,
    },
})

export const UserModel = mongoose.model("User", UserSchema);