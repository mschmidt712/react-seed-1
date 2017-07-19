import {Md5} from 'ts-md5/dist/md5';
import axios from 'axios';

interface ContactInterface {
  id?: number;
  firstName: string;
  middleName?: string;
  email?: string;
  lastName?: string;
  phone?: string;
  image?: string;
}
class ContactsAPI {
  constructor () {
    this.getContacts = this.getContacts.bind(this);
    this.setContacts = this.setContacts.bind(this);
    this.getAvatar = this.getAvatar.bind(this);
  }

  private contacts: ContactInterface[] = [];

  public getContacts() {
    return Promise.resolve(this.contacts);
  }

  public setContacts(contacts: ContactInterface[]): Promise<ContactInterface[]> {
    return new Promise ((resolve, reject) => {
      try {
        this.contacts = contacts;
        resolve (this.contacts);
      } catch (err) {
        reject(err);
      }
    });
  }

  public getAvatar(email: string) {
    const gravatarUrl = 'https://www.gravatar.com/';
    const emailHash = Md5.hashStr(email);
    const url = `${gravatarUrl}${emailHash}.json`;

    return axios.get(url);
  }
}

export default new ContactsAPI();