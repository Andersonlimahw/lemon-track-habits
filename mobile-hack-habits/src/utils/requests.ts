export interface FetchApiInput<T> {
  url: string,
  method: string,
  headers: Record<string, string>,
  body: T
}

export const fetchApi = <T>({
  url, 
  method,
  headers,
  body,
} :FetchApiInput<T>): Promise<any> => {
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
      .then(json => resolve(json))
      .catch(error => reject(error));
  });
};
