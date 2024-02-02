class User {
  urlUser = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', user); 
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    localStorage.getItem('user');
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest({
      url: this.urlAccount + '/current',
      method: 'GET',
      callback: (err, response) => {
        if(response.success && response.user) {
          this.setCurrent(response.user);
        } else {
          this.unsetCurrent(this.current())
        };
        callback(err, response);
      },
    });
  };

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.urlAccount + '/login',
      data,
      method: 'POST',
      callback: (err, response) => {
        if(response.success && response.user) {
          this.setCurrent(response.user);
        } else {
          callback(err, response);
        };
      },
    });
  };

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({
      url: this.urlAccount + '/register',
      data,
      method: 'POST',
      callback: (err, response) => {
        if(response.success && response.user) {
          this.setCurrent(response.user);
        } else {
          callback(err, response);
        };
      },
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: this.urlAccount + '/logout',
      method: 'POST',
      callback: (err, response) => {
        if(response.success) {
          this.unsetCurrent(this.current())
        }
        callback(err, response);
      },
    });
  };
};
