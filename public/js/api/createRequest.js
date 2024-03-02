/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  let formData;
  let generalURL = options.url;
  // console.log(generalURL)


  if(options.method === 'GET') {
    if (options.data) {
      generalURL = generalURL + '?mail=' + options["data"]["email"] + '&password=' + options['data']['password'];
    
      // console.log(generalURL)
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
    options.callback(null, xhr.response);
  });
};

createRequest({
  url: '/user/current',
  method: 'GET',
  data: {
    email: 'demo@demo.com',
    password: 'demo'
  },
  callback: (error, response) => {
    console.log(error, response);
  }
});