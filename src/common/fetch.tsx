const API_ROOT = 'https://pokeapi.co/api/v2/';
const responseBody = res => res.json();
const handleErrors = err => {
  console.log('fetch error = ', err);
  return err;
};

export const requests = {
    get: url =>        
        fetch(`${API_ROOT}${url}`)
        .then(responseBody)
        .catch(handleErrors)
};

export const TestReq = {
    getTypes: () =>
      requests.get(`type`)
      .then(res => {
        return res
    })
  };