import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  name: {
    type: String,
    requireed: [true, 'Name is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
}
)

export default mongoose.model("Users", userSchema)