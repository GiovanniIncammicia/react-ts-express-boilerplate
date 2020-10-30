import { auth } from '../config/firebase';

async function request(url: string, params?: any, method = 'GET') {
  const token = await auth.currentUser?.getIdToken();
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(params)
  };

  const res = await fetch('api/' + url, options);
  const json = await res.json();

  if (res.status !== 200) return new Error(json.message);

  return json;
}

export const get = (url: string) => request(url);
export const post = (url: string, params: any) => request(url, params, 'POST');
export const put = (url: string, params: any) => request(url, params, 'PUT');
export const del = (url: string) => request(url, undefined, 'DELETE');

