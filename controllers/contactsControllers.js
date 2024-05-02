import HttpError from "../helpers/HttpError.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
    try {
       const contacts = await contactsService.listContacts();
    res.status(200).json(contacts)  
    } catch (error) {
        next(error)
    }
};

export const getOneContact = async (req, res, next) => {
     try {
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);
    
    if (contact === null) {
        next(HttpError(404))
    }

    res.status(200).json(contact)
    } catch (error) {
        next(error)
    }
    
};

export const deleteContact = async (req, res, next) => {
     try {
    const { id } = req.params;
    const deletedContact = await contactsService.removeContact(id);
    if (deletedContact === null) {
    next(HttpError(404))
    }
    res.status(200).json(deletedContact); 
     } catch (error) {
        next(error)
    }
   
};

export const createContact = async (req, res, next) => {
     try {
    const { name, email, phone } = req.body;
    const newContact = await contactsService.addContact(name, email, phone);
    res.status(201).json(newContact); 
    } catch (error) {
        next(error)
    }
};

export const updateContact = async (req, res, next) => {
     try {
    const params = req.body;
    
    if (Object.keys(params).length === 0) {
        next(HttpError(400, "Body must have at least one field"))
    }
    const { id } = req.params;
    const updatedContact = await contactsService.updateContact(id, params)
    res.status(200).send(updatedContact);  
    } catch (error) {
        next(error)
    }   
};
