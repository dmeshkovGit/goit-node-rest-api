import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import validateQuery from "../helpers/validateQuery.js";
import idValidation from "../middlewares/idValidation.js";
import { createContactSchema, updateContactSchema, updateStatusContactSchema, contactsReqBodySchema } from "../schemas/contactsSchemas.js";
import auth from "../middlewares/auth.js"



const contactsRouter = express.Router();

contactsRouter.get("/", validateQuery(contactsReqBodySchema), auth, getAllContacts);

contactsRouter.get("/:id", idValidation, auth, getOneContact);

contactsRouter.delete("/:id", idValidation, auth, deleteContact);

contactsRouter.post("/", auth, validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", idValidation, auth, validateBody(updateContactSchema), updateContact);

contactsRouter.patch("/:id/favorite", idValidation, auth, validateBody(updateStatusContactSchema), updateStatusContact);

export default contactsRouter;
