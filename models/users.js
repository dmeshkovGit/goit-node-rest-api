import mongoose from "mongoose"

const userSchema = mongoose.Schema({
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
  avatarURL: {
    type: String,
  },
  token: {
    type: String,
    default: null,
  },
}
)

export default mongoose.model("Users", userSchema)