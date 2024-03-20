/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  let formData;
  let generalURL = options.url;



  if(options.method === 'GET') {
    if (options.data) {
      // generalURL = generalURL + '?mail=' + options["data"]["email"] + '&password=' + options['data']['password'];
      for (key in options.data) {
        generalURL = generalURL+ '?' + key + '=' + options.data[key] + '&';
      };
      generalURL = generalURL.slice(0, -1);
    };
  } else {
    formData = new FormData();

    for(key in options.data) {
      formData.append(key, options.data[key]);
    };
  };

  try {
    xhr.open(options.method, String(generalURL));
    xhr.send(formData);
  }
  catch (error) {
    options.callback(error);
  };

  xhr.addEventListener('load', () => { 
    // console.log(xhr.response)    
    options.callback(null, xhr.response);
  });
};
