/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  let generalURL = options.url;

  if(options.method === 'GET') {
    generalURL = generalURL + '?mail=' + options.data.mail + '&password=' + options.data.password;
    xhr.open(options.method, generalURL);
    xhr.send();
  } else {
    formData = new FormData();

    for(key in options.data) {
      formData.append(key, options.data[key]);
    };

    try {
      xhr.open(options.method, generalURL);
      xhr.send(formData);
    }
    catch (error) {
      options.callback(error);
    };
  };
};
