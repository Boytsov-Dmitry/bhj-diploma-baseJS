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

    for (key in options.data) {
      formData.append(key, options.data[key]);
    };

    xhr.open(options.method, generalURL);
    xhr.send(formData);
  };
};

createRequest({
  url: 'user',
  data: {
    mail: 'ivan@poselor.ru',
    password: 'odinodin'
  },
  method: 'POST',
  callback: (err,response) => {
    console.log(err,response)
  }
})