class Entity {
  entityUrl = '';

  static list(data, callback){
    createRequest({
      url: this.entityUrl,
      data,
      method: 'GET',
      callback,
    });
  };

  static create(data, callback) {
    createRequest({
      url: this.entityUrl,
      data,
      method: 'PUT',
      callback,
    });
  };


  static remove(data, callback ) {
    createRequest({
      url: this.entityUrl,
      data,
      method: 'DELETE',
      callback,
    });
  };
};