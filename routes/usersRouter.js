import express from "express"
import { registerUser, loginUser, logoutUser, getUser, updateUserSub} from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { createUserSchema, loginUserSchema, updateSubscriptionSchema } from "../schemas/usersSchemas.js";
import auth from "../middlewares/auth.js"


const usersRouter = express.Router();

usersRouter.post("/register", validateBody(createUserSchema), registerUser);
usersRouter.post("/login", validateBody(loginUserSchema), loginUser);
usersRouter.post("/logout", auth, logoutUser);
usersRouter.get("/current", auth, getUser);
usersRouter.patch("/", auth, validateBody(updateSubscriptionSchema), updateUserSub)

export default usersRouter