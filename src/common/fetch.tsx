const responseBody = res => res.json();
const handleErrors = err => {
  console.log('fetch error = ', err);
  return err;
};

export const pokeFetch = {
    get: (url) =>        
        fetch(url)
        .then(responseBody)
        .catch(handleErrors)
};