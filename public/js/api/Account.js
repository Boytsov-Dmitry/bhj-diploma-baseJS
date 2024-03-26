class Account extends Entity {
  static url = '/account';

  static get(id = '', callback){
    createRequest({
      url: this.url + `/${id}`,
      method: 'GET',
      callback,
    });
  };
};