export interface FetchApiInput<I> {
  url: string,
  method: string,
  headers?: Record<string, string>,
  body?: I
}
export const fetchApi = <I, O>({
  url, 
  method,
  headers,
  body,
} :FetchApiInput<I>): Promise<O> => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method,
      headers: { 
        'Content-type': 'application/json',
        'x-date': new Date().toISOString(),        
        ...headers 
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(json => {
        console.info('Success on fetchApi, json', json, 'url: ', url);
        resolve(json)
      })
      .catch(error => {
        console.error('Error on fetchApi', error, ' url : ', url);
        reject(error);
      });
  });
};
