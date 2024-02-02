class Account extends Entity {
  urlAccount = '/account';

  static get(id = '', callback){
    createRequest({
      url: this.urlAccount + `/${id}`,
      data,
      method: 'GET',
      callback,
    });
  };
};