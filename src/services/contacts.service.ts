import {Md5} from 'ts-md5/dist/md5';
import axios from 'axios';

export function getAvatar(email: string): Promise<string> {
  const gravatarUrl: string = 'https://www.gravatar.com/';
  const emailHash: string = Md5.hashStr(email).toString();
  const url: string = `${gravatarUrl}${emailHash}.json`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        resolve(res.data.entry[0].thumbnailUrl);
      })
      .catch(e => {
        reject(e);
      });
  });
}