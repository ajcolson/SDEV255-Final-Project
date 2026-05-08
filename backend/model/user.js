import mongoose from "mongoose"
const { Schema, model } = mongoose

const userSchema = new Schema({
  Username: String,
  PasswordHash: String
})

const User = model("User", userSchema)
export default User