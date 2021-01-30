/**
 * Estrutura de Usuários
 */
import { Firebase } from '../utils/Firebase';
import { Model } from './Model';

export class User extends Model {

    constructor(id){

        //console.log('User constructor(id)', id);

        super();

        if (id) this.getById(id);

    }
    // getters & setters
    
    get name() {return this._data.name; }
    set name(value) { this._data.name = value; }

    get email() {return this._data.email; }
    set email(value) { this._data.email = value; }

    get photo() {return this._data.photo; }
    set photo(value) { this._data.photo = value; }

    get chatId() {return this._data.chatId; }
    set chatId(value) { this._data.chatId = value; }

    getById(id) {

        return new Promise((s,f)=>{

            User.findByEmail(id).onSnapshot(doc=>{

                this.fromJSON(doc.data());
                s(doc);

            });

        });

    }

    save() {

        return User.findByEmail(this.email).set(this.toJSON());

    }

    static getRef() {

        return Firebase.db().collection('/users');  // Coleção de Usuários

    }

    static getContactsRef(id){ 

        return User.getRef()
            .doc(id)
            .collection('/contacts');  // Retorna Contatos do Usuário.

    }


    static findByEmail(email){

        return User.getRef().doc(email); // retorna Email pesquisado

    }

    addContact(contact){

        //console.log('   >>>addContact() this.email:', this.email);

        return User.getContactsRef(this.email)
            .doc(btoa(contact.email))
            .set(contact.toJSON()); // Usando base64
        
    }

    getContacts(filter = ''){

        return new Promise((s, f)=>{

            User.getContactsRef(this.email).where('name', '>=', filter).onSnapshot(docs=> {

                let contacts  = [];
                
                docs.forEach( doc => {

                    let data = doc.data();

                    data.id = doc.id;

                    contacts.push(data);


                });

                this.trigger('contactschange', docs);

                s(contacts);

            });

        });

    }

}