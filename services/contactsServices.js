import * as fs from "node:fs/promises"
import path from "node:path"
import { nanoid } from 'nanoid'


const contactsPath = path.resolve("db", "contacts.json");

async function readContacts() {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(data);
};

async function writeContacts(data) {
    return fs.writeFile(contactsPath, JSON.stringify(data, undefined, 2));
};

async function listContacts() {
    const contacts = await readContacts();
    return contacts;
}


async function getContactById(contactId) {
    const contacts = await readContacts(); 
    const contact = contacts.find((contact) => contact.id === contactId);
    if (typeof(contact) === "undefined") {
        return null
    }
    return contact
}


async function removeContact(contactId) {
    const contacts = await readContacts(); 
    const contactIndex = contacts.findIndex((contact) => contact.id === contactId);

    if (contactIndex === -1) {
        return null
    };
    const removedContact = contacts[contactIndex];

    contacts.splice(contactIndex, 1)
    
    await writeContacts(contacts);

    return removedContact;
}


async function addContact(name, email, phone) {

    const contacts = await readContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    
    contacts.push(newContact);
    
    await writeContacts(contacts);

    return newContact;
};

async function updateContact(id, params) {
    const contacts = await readContacts();

    const contactIndex = contacts.findIndex((contact) => contact.id === id);

    if (contactIndex === -1) {
        return null
    };

    const contactToUpdate = contacts[contactIndex];

    const updatedContact = { ...contactToUpdate, ...params };

    contacts.splice(contactIndex, 1, updatedContact)
    
    await writeContacts(contacts);

    return (updatedContact)

}



export default {listContacts, getContactById, removeContact, addContact, updateContact}