import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userCollection = 'Users'

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true},
    surname:{type: String, required: true},
    address:{type: String, required: true},
    age:{type: Number, required: true},
    phone:{type: String, required: true},
    pictureName:{type: String, required: true}

})

UserSchema.methods.encryptPassword = (password:any) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const Users = mongoose.model(userCollection, UserSchema)

