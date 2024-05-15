import HttpError from "../helpers/HttpError.js";
import Contact from "../models/contact.js"
import pagination from "../helpers/pagination.js"



export const getAllContacts = async (req, res, next) => {
    try {
        let contacts = await Contact.find({ owner: req.user.id });
        
        const { page, limit, favorite } = req.query;
        
        if (typeof (favorite) !== "undefined") {
            contacts = contacts.filter((contact) => {
                return contact.favorite.toString() === favorite
            });
        };

        if (typeof (page && limit) !== "undefined") {
 
        contacts = pagination(contacts, page, limit);
        };
       
    res.status(200).json(contacts)  
    } catch (error) {
        next(error)
    }
};

export const getOneContact = async (req, res, next) => {
     try {
    const { id } = req.params;
    const contact = await Contact.findOne({_id: id, owner: req.user.id});
    
    if (contact === null) {
        next(HttpError(400))
         };


    res.status(200).json(contact)
    } catch (error) {
        next(error)
    }
    
};

export const deleteContact = async (req, res, next) => {
     try {
         const { id } = req.params;
        
         const deletedContact = await Contact.findOneAndDelete({_id: id, owner: req.user.id});
    
         if (deletedContact === null) {
          next(HttpError(400))
         };

         res.status(200).json(deletedContact); 
         
     } catch (error) {
        next(error)
    }
   
};

export const createContact = async (req, res, next) => {
     try {
         const { name, email, phone } = req.body;
         const emailInLowerCase = email.toLowerCase();

    const newContact = {
        name,
        email: emailInLowerCase,
        phone,
        owner: req.user.id,
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
    
    const updatedContact = await Contact.findOneAndUpdate({_id: id, owner: req.user.id}, params, { new: true });
         
    if (updatedContact === null) {
    next(HttpError(400))
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
    
        const updatedContact = await Contact.findOneAndUpdate({ _id: id, owner: req.user.id }, params, { new: true });
        if (updatedContact === null) {
            next(HttpError(400))
        }
        res.status(200).json(updatedContact);
    } catch (error) {
        next(error)
    }
};
