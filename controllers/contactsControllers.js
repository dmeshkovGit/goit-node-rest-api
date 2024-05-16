import HttpError from "../helpers/HttpError.js";
import Contact from "../models/contact.js"

export const getAllContacts = async (req, res, next) => {
    try {
    const contacts = await Contact.find();

    res.status(200).json(contacts)  
    } catch (error) {
        next(error)
    }
};

export const getOneContact = async (req, res, next) => {
     try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    
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
    const deletedContact = await Contact.findByIdAndDelete(id);
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
    const newContact = {
        name,
        email,
        phone
    };
    const result = await Contact.create(newContact);

    res.status(201).json(result); 
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
    
    const updatedContact = await Contact.findByIdAndUpdate(id, params, { new: true });
         
    if (updatedContact === null) {
    next(HttpError(404))
    }
    res.status(200).json(updatedContact);  
    } catch (error) {
        next(error)
    }   
};

export const updateStatusContact = async (req, res, next) => {
   try {
    const params = req.body;
    const { id } = req.params;
    
    const updatedContact = await Contact.findByIdAndUpdate(id, params, { new: true });
    if (updatedContact === null) {
    next(HttpError(404))
    }
    res.status(200).json(updatedContact);  
    } catch (error) {
        next(error)
    }   
}
