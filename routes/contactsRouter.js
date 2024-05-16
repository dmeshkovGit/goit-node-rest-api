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
import idValidation from "../middlevares/idValidation.js";
import { createContactSchema, updateContactSchema, updateStatusContactSchema } from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", idValidation, getOneContact);

contactsRouter.delete("/:id", idValidation, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", idValidation, validateBody(updateContactSchema), updateContact);

contactsRouter.patch("/:id/favorite", idValidation,validateBody(updateStatusContactSchema), updateStatusContact)

export default contactsRouter;
