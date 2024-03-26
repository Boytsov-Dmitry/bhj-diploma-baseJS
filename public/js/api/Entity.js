class Entity {
  static url = '';

  static list(data, callback){
    createRequest({
      url: this.url,
      data,
      method: 'GET',
      callback,
    });
  };

  static create(data, callback) {
    createRequest({
      url: this.url,
      data,
      method: 'PUT',
      callback,
    });
  };


  static remove(data, callback ) {
    createRequest({
      url: this.url,
      data,
      method: 'DELETE',
      callback,
    });
  };
};